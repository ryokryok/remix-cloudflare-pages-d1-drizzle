import { array, integer, number, object, omit, parse, string } from "valibot";

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
