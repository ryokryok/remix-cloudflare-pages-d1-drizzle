DROP TABLE IF EXISTS users;

CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT NOT NULL);

INSERT INTO
  users (id, name)
VALUES
  (1, 'Admin'),
  (2, 'Tom');