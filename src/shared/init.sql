-- DROP TABLE IF EXISTS users_permissions;
-- DROP TABLE IF EXISTS permissions;
-- DROP TABLE IF EXISTS tasks;
-- DROP TABLE IF EXISTS workspaces;
-- DROP TABLE IF EXISTS boards;
-- DROP TABLE IF EXISTS users;


-- quando for usar isso em produção, adicionar campos como obrigátios
-- como email VARCHAR(80) UNIQUE, name VARCHAR(80) NOT NULL, etc.



 INSERT INTO boards
 VALUES (
 	uuid_generate_v4(),
	 'board',
	 'url-oparms',
	 NOW(),
	 'ee2a1e16-5853-457f-8920-e04702f0c16b'
 )


CREATE TABLE users(
  user_id uuid PRIMARY KEY,
  -- user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4 (),
  -- user_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
  -- user_id TEXT PRIMARY KEY NOT NULL,
  
  name VARCHAR(80),
  image_file VARCHAR(255),
  identifier VARCHAR(255),
  email VARCHAR(80),
  password VARCHAR(80),

  user_payment_id VARCHAR(20)
);


CREATE TABLE workspaces(
  workspace_id uuid PRIMARY KEY,
  -- board_id uuid DEFAULT uuid_generate_v4 (),
  -- board_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
  title VARCHAR(255),
  url VARCHAR(100),
  tag VARCHAR(100),
  description VARCHAR(255),
  workspaces_type VARCHAR(200),

  createdAt TIMESTAMP,
  updatedAt TIMESTAMP,
  deletedAt TIMESTAMP,

  user_id uuid,
  FOREIGN KEY(user_id)
    REFERENCES users(user_id)
      ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE boards(
  board_id uuid PRIMARY KEY,
  -- board_id uuid DEFAULT uuid_generate_v4 (),
  -- board_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
  title VARCHAR(255),
  url VARCHAR(100) UNIQUE,

  createdAt TIMESTAMP,
  updatedAt TIMESTAMP,
  deletedAt TIMESTAMP,
  user_id uuid,
  workspace_id uuid,
  FOREIGN KEY(user_id)
    REFERENCES users(user_id)
      ON DELETE CASCADE
        ON UPDATE CASCADE,

  FOREIGN KEY(workspace_id)
    REFERENCES workspaces(workspace_id)
      ON DELETE CASCADE
        ON UPDATE CASCADE
);

tasks se relaciona com lists e lists se relaciona com boards

CREATE TABLE lists (
  list_id uuid PRIMARY KEY,
  
  title VARCHAR(255),
  body json,
  category VARCHAR(20),
  url VARCHAR(100) UNIQUE,

  createdAt TIMESTAMP,
  updatedAt TIMESTAMP,
  deletedAt TIMESTAMP,

  user_id uuid,
  list_id uuid,
  FOREIGN KEY(user_id)
    REFERENCES users(user_id)
      ON DELETE CASCADE
        ON UPDATE CASCADE

  FOREIGN KEY(board_id)
    REFERENCES boards(board_id)
      ON DELETE CASCADE
        ON UPDATE CASCADE
)


CREATE TABLE tasks(
  task_id uuid PRIMARY KEY,
  -- tasks_id uuid DEFAULT uuid_generate_v4 (),
  -- tasks_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
  title VARCHAR(255),
  body json,
  category VARCHAR(20),
  url VARCHAR(100) UNIQUE,

  createdAt TIMESTAMP,
  updatedAt TIMESTAMP,
  deletedAt TIMESTAMP,

  user_id uuid,
  list_id uuid,
  FOREIGN KEY(user_id)
    REFERENCES users(user_id)
      ON DELETE CASCADE
        ON UPDATE CASCADE

  FOREIGN KEY(list_id)
    REFERENCES lists(list_id)
      ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE members_workspaces (
  member_workspace_id uuid PRIMARY KEY,

  created_at TIMESTAMP,
  removed_at TIMESTAMP,

  user_id uuid,
  workspace_id uuid,
  FOREIGN KEY(user_id)
    REFERENCES users(user_id)
      ON DELETE CASCADE
        ON UPDATE CASCADE,

  FOREIGN KEY(workspace_id)
    REFERENCES workspaces(workspace_id)
      ON DELETE CASCADE
        ON UPDATE CASCADE
)

CREATE TABLE members_boards (
  member_board_id uuid PRIMARY KEY,

  created_at TIMESTAMP,
  removed_at TIMESTAMP,

  user_id uuid,
  board_id uuid,
  FOREIGN KEY(user_id)
    REFERENCES users(user_id)
      ON DELETE CASCADE
        ON UPDATE CASCADE,

  FOREIGN KEY(board_id)
    REFERENCES boards(board_id)
      ON DELETE CASCADE
        ON UPDATE CASCADE
)

CREATE TABLE members_tasks (
  member_board_id uuid PRIMARY KEY,

  created_at TIMESTAMP,
  removed_at TIMESTAMP,

  user_id uuid,
  task_id uuid,
  FOREIGN KEY(user_id)
    REFERENCES users(user_id)
      ON DELETE CASCADE
        ON UPDATE CASCADE,

  FOREIGN KEY(task_id)
    REFERENCES tasks(task_id)
      ON DELETE CASCADE
        ON UPDATE CASCADE
)

CREATE TABLE permissions (
  permission_id uuid PRIMARY KEY,
  
  name VARCHAR(20) DEFAULT 'reader',
  description VARCHAR (50),

  created_at TIMESTAMP
);


CREATE TABLE members_workspaces_permissions (
  member_workspace_permission_id uuid PRIMARY KEY,

  member_workspace_id uuid,
  permission_id uuid,
  
  FOREIGN KEY(member_workspace_id)
    REFERENCES members_workspaces(member_workspace_id)
      ON DELETE CASCADE
        ON UPDATE CASCADE,

  FOREIGN KEY(permission_id)
    REFERENCES permissions(permission_id)
      ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE members_boards_permissions (
  member_board_permission_id uuid PRIMARY KEY,

  member_board_id uuid,
  permission_id uuid,
  
  FOREIGN KEY(member_board_id)
    REFERENCES members_boards(member_board_id)
      ON DELETE CASCADE
        ON UPDATE CASCADE,

  FOREIGN KEY(permission_id)
    REFERENCES permissions(permission_id)
      ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE members_tasks_permissions (
  member_task_permission_id uuid PRIMARY KEY,

  member_task_id uuid,
  permission_id uuid,
  
  FOREIGN KEY(member_task_id)
    REFERENCES members_tasks(member_task_id)
      ON DELETE CASCADE
        ON UPDATE CASCADE,

  FOREIGN KEY(permission_id)
    REFERENCES permissions(permission_id)
      ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE users_permissions (
  users_permission_id uuid PRIMARY KEY,

  user_id uuid,
  permission_id uuid,
  
  FOREIGN KEY(user_id)
    REFERENCES users(user_id)
      ON DELETE CASCADE
        ON UPDATE CASCADE,

  FOREIGN KEY(permission_id)
    REFERENCES permissions(permission_id)
      ON DELETE CASCADE
        ON UPDATE CASCADE
);






drop table if exists Tasks                        ;
 drop table if exists _prisma_migrations           ;
--  drop table if exists User                         ;
 drop table if exists members_boards_permissions   ;
 drop table if exists members_boards               ;
 drop table if exists members_workspaces_permission;
 drop table if exists members_workspaces           ;
 drop table if exists users_permissions            ;
 drop table if exists tasks                        ;
 drop table if exists boards                       ;
 drop table if exists workspaces ;
 drop table if exists permissions                  ;
 drop table if exists users                        ;




      -- user and tasks

user_id uuid PRIMARY KEY,
  -- user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4 (),
  -- user_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
  -- user_id TEXT PRIMARY KEY NOT NULL,
  
  name VARCHAR(80),
  email VARCHAR(80),
  password VARCHAR(80),

  user_payment_id VARCHAR(20)



INSERT INTO users (
  user_id,
    name,
  password,
  user_payment_id
)
VALUES (
  uuid_generate_v4(),
  'Jose',
  'Joseddddddddd',
  'Joseddddddddd'
);








INSERT INTO tasks (
  task_id,
  title,
  body,
  category,
  url,
  createdAt,
  user_id
)
VALUES (
  uuid_generate_v4(),
  'this is broken?',
  '{"p":"this user only can make comment in tasks"}',
  'games',
  'games-is-broken-broo',
  NOW(),
  '7a827365-0b6a-4024-9dcd-dac62c6c4ca2'
);

















        -- PERMISSIONS


INSERT INTO permissions (
  permission_id,
  description,
  created_at
)
VALUES (
  uuid_generate_v4(),
  'this user only can make comment in tasks',
  NOW()
);


INSERT INTO permissions (
  permission_id,
  name,
  description,
  created_at
)
VALUES (
  uuid_generate_v4(),
  'writer',
  'this user also can create tasks',
  NOW()
);







--        USERS_PERMISSSIONS






INSERT INTO users_permissions (
  users_permissions_id,
  user_id,
  permission_id
)
VALUES (
  uuid_generate_v4(),
  'ee2a1e16-5853-457f-8920-e04702f0c16b',
  '13cfee1c-af9e-4f3a-8e10-afce2ac13ce3'
);

INSERT INTO users_permissions (
  users_permissions_id,
  user_id,
  permission_id
)
VALUES (
  uuid_generate_v4(),
  '840e2fec-efcb-409d-a130-fcb6d16f93ba',
  '5d44430e-0790-4fcd-95b5-dcf18422634d'
);












INSERT INTO permissions (
  permission_id,
  description,
  created_at
)
VALUES (
  uuid_generate_v4(),
  'this user only can make comment in tasks',
  NOW()
);











--        PRODUCTION









CREATE TABLE users(
  user_id uuid PRIMARY KEY,
  -- id INT GENERATED ALWAYS AS IDENTITY NOT NULL,
  
  name VARCHAR(80) NOT NULL,
  email VARCHAR(80) NOT NULL,
  password VARCHAR(80) NOT NULL,
	
  createdAt TIMESTAMP NOT NULL,
  updatedAt TIMESTAMP NOT NULL,
  
  -- PRIMARY KEY (id)
);

CREATE TABLE tasks(
  tasks_id uuid PRIMARY KEY,
  -- id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title VARCHAR(255) NOT NULL,
  body TEXT NOT NULL,
  category VARCHAR(20) NOT NULL,
  url VARCHAR(100) UNIQUE NOT NULL,
  createdAt TIMESTAMP DEFAULT NOW() NOT NULL,
  updatedAt TIMESTAMP DEFAULT NOW(),
  user_id uuid,
  FOREIGN KEY(user_id)
    REFERENCES users(id)
      ON DELETE CASCADE
        ON UPDATE CASCADE
);


DROP TABLE IF EXISTS user_permissions;

CREATE TABLE user_permissions (
  permission_id uuid PRIMARY KEY,
  
  permission_name VARCHAR(15),

  user_id uuid,
  FOREIGN KEY(user_id)
    REFERENCES users(user_id)
      ON DELETE CASCADE
        ON UPDATE CASCADE
)