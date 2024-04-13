import {
  array,
  integer,
  minLength,
  number,
  object,
  omit,
  parse,
  string,
} from "valibot";

const PostSchema = object({
  id: number([integer()]),
  title: string(),
  body: string(),
  userId: number([integer()]),
});

const PostListSchema = array(PostSchema);

const PostCreateSchema = omit(PostSchema, ["id"]);

export const getPostList = async () => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts`);
  const json = await response.json();
  const parsed = parse(PostListSchema, json);
  return parsed;
};

export const getPost = async (id: string) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );
  const json = await response.json();
  const parsed = parse(PostSchema, json);
  return parsed;
};

export const createPost = async (params: any) => {
  const parsedParams = parse(PostCreateSchema, params);
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts`, {
    method: "POST",
    body: JSON.stringify(parsedParams),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const json = await response.json();
  const parsed = parse(PostSchema, json);
  return parsed;
};

const UserSchema = object({
  id: number([integer()]),
  name: string([minLength(1)]),
});

const UserListSchema = array(UserSchema);

const UserCreateSchema = omit(UserSchema, ["id"]);

export const getUserList = async (db: D1Database) => {
  const { results } = await db.prepare("SELECT * FROM users").bind().all();
  const parsed = parse(UserListSchema, results);
  return parsed;
};

export const getUser = async (db: D1Database, id: string | number) => {
  const result = await db
    .prepare("SELECT * FROM users WHERE id = ?")
    .bind(id)
    .first();
  const parsed = parse(UserSchema, result);
  return parsed;
};

export const createUser = async (db: D1Database, params: any) => {
  const parsedParams = parse(UserCreateSchema, params);
  const result = await db
    .prepare("INSERT INTO users (name) VALUES (?)")
    .bind(parsedParams.name)
    .run();
  return result;
};
