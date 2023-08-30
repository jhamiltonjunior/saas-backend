CREATE TABLE IF NOT EXISTS "public"."Users"(
  user_id uuid PRIMARY KEY NOT NULL,
  -- user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4 (),
  -- user_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
  -- user_id TEXT PRIMARY KEY NOT NULL,
  
  name VARCHAR(80) NOT NULL,
  image_file VARCHAR(255),
  identifier VARCHAR(255),
  email VARCHAR(80) UNIQUE NOT NULL,
  password VARCHAR(80) NOT NULL,

  user_is_active BOOLEAN NOT NULL,

  user_payment_id VARCHAR(20)
);


CREATE TABLE IF NOT EXISTS "public"."Workspaces"(
  workspace_id uuid PRIMARY KEY NOT NULL,
  -- board_id uuid DEFAULT uuid_generate_v4 (),
  -- board_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
  title VARCHAR(255) NOT NULL,
  url VARCHAR(100) NOT NULL,
  tag VARCHAR(100),
  description VARCHAR(255),
  workspaces_type VARCHAR(200),

  createdAt TIMESTAMP  NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP,
  deletedAt TIMESTAMP,

  workspace_is_active BOOLEAN  NOT NULL,

  user_id uuid NOT NULL,
  FOREIGN KEY(user_id)
    REFERENCES "Users"(user_id)
      ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS "public"."Boards"(
  board_id uuid PRIMARY KEY NOT NULL,
  -- board_id uuid DEFAULT uuid_generate_v4 (),
  -- board_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
  title VARCHAR(255),
  url VARCHAR(100) UNIQUE,

  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP,
  deletedAt TIMESTAMP,

  board_is_active BOOLEAN  NOT NULL,

  user_id uuid NOT NULL,
  workspace_id uuid NOT NULL,
  FOREIGN KEY(user_id)
    REFERENCES "Users"(user_id)
      ON DELETE CASCADE
        ON UPDATE CASCADE,

  FOREIGN KEY(workspace_id)
    REFERENCES "Workspaces"(workspace_id)
      ON DELETE CASCADE
        ON UPDATE CASCADE
);


CREATE TABLE IF NOT EXISTS "public"."Lists" (
  list_id uuid PRIMARY KEY,
  
  title VARCHAR(200),

  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP,
  deletedAt TIMESTAMP,

  list_is_active BOOLEAN,

  user_id uuid NOT NULL,
  board_id uuid NOT NULL,
  FOREIGN KEY(user_id)
    REFERENCES "Users"(user_id)
      ON DELETE CASCADE
        ON UPDATE CASCADE,

  FOREIGN KEY(board_id)
    REFERENCES "Boards"(board_id)
      ON DELETE CASCADE
        ON UPDATE CASCADE
);


CREATE TABLE IF NOT EXISTS "public"."Tasks"(
  task_id uuid PRIMARY KEY NOT NULL,
  -- tasks_id uuid DEFAULT uuid_generate_v4 (),
  -- tasks_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
  title VARCHAR(255)  NOT NULL,
  body json,
  category VARCHAR(20),
  url VARCHAR(100)  NOT NULL UNIQUE,

  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP,
  deletedAt TIMESTAMP,

  task_is_active BOOLEAN NOT NULL,

  user_id uuid NOT NULL,
  list_id uuid NOT NULL,
  FOREIGN KEY(user_id)
    REFERENCES "Users"(user_id)
      ON DELETE CASCADE
        ON UPDATE CASCADE,

  FOREIGN KEY(list_id)
    REFERENCES "Lists"(list_id)
      ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS "public"."Members_workspaces" (
  member_workspace_id uuid PRIMARY KEY  NOT NULL,

  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  removed_at TIMESTAMP,

  user_id uuid NOT NULL,
  workspace_id uuid NOT NULL,
  FOREIGN KEY(user_id)
    REFERENCES "Users"(user_id)
      ON DELETE CASCADE
        ON UPDATE CASCADE,

  FOREIGN KEY(workspace_id)
    REFERENCES "Workspaces"(workspace_id)
      ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS "public"."Members_boards" (
  member_board_id uuid PRIMARY KEY  NOT NULL,

  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  removed_at TIMESTAMP,

  user_id uuid NOT NULL,
  board_id uuid NOT NULL,
  FOREIGN KEY(user_id)
    REFERENCES "Users"(user_id)
      ON DELETE CASCADE
        ON UPDATE CASCADE,

  FOREIGN KEY(board_id)
    REFERENCES "Boards"(board_id)
      ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS "public"."Members_tasks" (
  member_task_id uuid PRIMARY KEY  NOT NULL,

  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  removed_at TIMESTAMP,

  user_id uuid NOT NULL,
  task_id uuid NOT NULL,
  FOREIGN KEY(user_id)
    REFERENCES "Users"(user_id)
      ON DELETE CASCADE
        ON UPDATE CASCADE,

  FOREIGN KEY(task_id)
    REFERENCES "Tasks"(task_id)
      ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS "public"."Permissions" (
  permission_id uuid PRIMARY KEY NOT NULL,
  
  name VARCHAR(20) DEFAULT 'reader',
  description VARCHAR (50),

  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  removed_at TIMESTAMP,

  permission_is_active BOOLEAN
);


CREATE TABLE IF NOT EXISTS "public"."Members_workspaces_permissions" (
  member_workspace_permission_id uuid PRIMARY KEY NOT NULL,

  member_workspace_id uuid NOT NULL,
  permission_id uuid NOT NULL,
  
  FOREIGN KEY(member_workspace_id)
    REFERENCES "Members_workspaces"(member_workspace_id)
      ON DELETE CASCADE
        ON UPDATE CASCADE,

  FOREIGN KEY(permission_id)
    REFERENCES "Permissions"(permission_id)
      ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS "public"."Members_boards_permissions" (
  member_board_permission_id uuid PRIMARY KEY,

  member_board_id uuid NOT NULL,
  permission_id uuid NOT NULL,
  
  FOREIGN KEY(member_board_id)
    REFERENCES "Members_boards"(member_board_id)
      ON DELETE CASCADE
        ON UPDATE CASCADE,

  FOREIGN KEY(permission_id)
    REFERENCES "Permissions"(permission_id)
      ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS "public"."Members_tasks_permissions" (
  member_task_permission_id uuid PRIMARY KEY NOT NULL,

  member_task_id uuid NOT NULL,
  permission_id uuid NOT NULL,
  
  FOREIGN KEY(member_task_id)
    REFERENCES "Members_tasks"(member_task_id)
      ON DELETE CASCADE
        ON UPDATE CASCADE,

  FOREIGN KEY(permission_id)
    REFERENCES "Permissions"(permission_id)
      ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS "public"."Users_permissions" (
  users_permission_id uuid PRIMARY KEY NOT NULL,

  user_id uuid NOT NULL,
  permission_id uuid NOT NULL,
  
  FOREIGN KEY(user_id)
    REFERENCES "Users"(user_id)
      ON DELETE CASCADE
        ON UPDATE CASCADE,

  FOREIGN KEY(permission_id)
    REFERENCES "Permissions"(permission_id)
      ON DELETE CASCADE
        ON UPDATE CASCADE
);






-- drop table if exists Tasks                        ;
--  drop table if exists _prisma_migrations           ;
-- --  drop table if exists User                         ;
--  drop table if exists members_boards_permissions   ;
--  drop table if exists "Members_boards"               ;
--  drop table if exists members_workspaces_permission;
--  drop table if exists "Members_workspaces"           ;
--  drop table if exists users_permissions            ;
--  drop table if exists "Tasks"                        ;
--  drop table if exists "Boards"                       ;
--  drop table if exists "Workspaces" ;
--  drop table if exists permissions                  ;
--  drop table if exists users                        ;
