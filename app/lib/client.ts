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
