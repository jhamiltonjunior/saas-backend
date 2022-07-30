DROP TABLE IF EXISTS users;

CREATE TABLE users(
  user_id uuid PRIMARY KEY,
  -- user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4 (),
  -- user_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
  -- user_id TEXT PRIMARY KEY NOT NULL,
  
  name VARCHAR(80),
  email VARCHAR(80),
  password VARCHAR(80)
);



DROP TABLE IF EXISTS articles;

CREATE TABLE articles(
  article_id uuid PRIMARY KEY,
  -- article_id uuid DEFAULT uuid_generate_v4 (),
  -- article_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
  title VARCHAR(255),
  body json,
  category VARCHAR(20),
  url VARCHAR(100) UNIQUE,

  createdAt TIMESTAMP,
  updatedAt TIMESTAMP,

  user_id uuid,
  FOREIGN KEY(user_id)
    REFERENCES users(user_id)
      ON DELETE CASCADE
        ON UPDATE CASCADE
);














      -- PERMISSIONS

DROP TABLE IF EXISTS permissions;

CREATE TABLE permissions (
  permissions_id uuid PRIMARY KEY,
  
  name VARCHAR(20) DEFAULT 'reader',
  description VARCHAR (50),

  created_at TIMESTAMP
);


INSERT INTO permissions (
  permissions_id,
  description,
  created_at
)
VALUES (
  uuid_generate_v4(),
  'this user only can make comment in articles',
  NOW()
);


INSERT INTO permissions (
  permissions_id,
  name,
  description,
  created_at
)
VALUES (
  uuid_generate_v4(),
  'writer',
  'this user also can create articles',
  NOW()
);







--        USERS_PERMISSSIONS

DROP TABLE IF EXISTS users_permissions;

CREATE TABLE users_permissions (
  users_permissions_id uuid PRIMARY KEY,

  user_id uuid,
  permissions_id uuid,
  
  FOREIGN KEY(user_id)
    REFERENCES users(user_id)
      ON DELETE CASCADE
        ON UPDATE CASCADE,

  FOREIGN KEY(permissions_id)
    REFERENCES permissions(permissions_id)
      ON DELETE CASCADE
        ON UPDATE CASCADE
);



INSERT INTO users_permissions (
  users_permissions_id,
  user_id,
  permissions_id
)
VALUES (
  uuid_generate_v4(),
  'ebceb0cf-0c02-470e-b50e-32f5e6096756',
  '9e13b046-af01-48e9-8418-d72e2773486f'
);

INSERT INTO users_permissions (
  users_permissions_id,
  user_id,
  permissions_id
)
VALUES (
  uuid_generate_v4(),
  'ebceb0cf-0c02-470e-b50e-32f5e6096756',
  'b41f98d8-154c-4cc3-a24f-1d34bcac00a5'
);












INSERT INTO permissions (
  permissions_id,
  description,
  created_at
)
VALUES (
  uuid_generate_v4(),
  'this user only can make comment in articles',
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

CREATE TABLE articles(
  article_id uuid PRIMARY KEY,
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