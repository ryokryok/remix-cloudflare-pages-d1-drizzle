import { drizzle } from "drizzle-orm/d1";
import { eq } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-valibot";
import { minLength, Output, parse, string } from "valibot";
import * as schema from "./schema";

const selectUserSchema = createSelectSchema(schema.users);

const insertUserSchema = createInsertSchema(schema.users, {
  name: () => string([minLength(1)]),
});

export const getUserList = async (d1: D1Database) => {
  const db = drizzle(d1, { schema });
  const res = await db.query.users.findMany();
  return res;
};

export const getUser = async (
  d1: D1Database,
  findId: Output<typeof selectUserSchema>["id"]
) => {
  const db = drizzle(d1, { schema });
  const res = await db.query.users.findFirst({
    where: eq(schema.users.id, findId),
  });
  return res;
};

export const createUser = async (
  d1: D1Database,
  params: Output<typeof insertUserSchema>
) => {
  const db = drizzle(d1);
  const validParams = parse(insertUserSchema, params);
  const res = await db.insert(schema.users).values(validParams);
  return res;
};
