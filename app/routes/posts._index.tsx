import {
  ActionFunctionArgs,
  json,
  MetaFunction,
  redirect,
} from "@remix-run/cloudflare";
import { Link, useLoaderData, Form } from "@remix-run/react";
import { createPost, getPostList } from "~/lib/client";

export const meta: MetaFunction = () => {
  return [
    { title: "Posts Links" },
    {
      name: "description",
      content: "Posts list by JSONPlaceholder",
    },
  ];
};

export const loader = async () => {
  const result = await getPostList();
  return json(result);
};

export async function action({ request }: ActionFunctionArgs) {
  const requestBody = await request.formData();
  const post = await createPost({
    title: requestBody.get("title"),
    body: requestBody.get("body"),
    userId: parseInt(requestBody.get("userId")?.toString() ?? ""),
  });
  return redirect(`/posts/${post.id}`);
}

export default function Index() {
  const data = useLoaderData<typeof loader>();

  return (
    <div>
      <Form method={"POST"}>
        <label htmlFor="title">Title</label>
        <input type="text" name="title" id="title" />
        <label htmlFor="body">Body</label>
        <input type="text" name="body" id="body" />
        <label htmlFor="userId">User ID</label>
        <input type="number" name="userId" id="userId" />
        <button type={"submit"}>Create Post</button>
      </Form>
      <hr />
      <ul>
        {data.map((d) => (
          <li key={d.id}>
            <Link to={`/posts/${d.id}`}>{d.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
