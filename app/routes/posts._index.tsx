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
    <div className="flex flex-col gap-4">
      <Form method={"POST"} className="flex gap-2 items-end">
        <div className="flex flex-col gap-1">
          <label htmlFor="title" className="text-lg font-semibold">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            className="block w-full rounded-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="body" className="text-lg font-semibold">
            Body
          </label>
          <input
            type="text"
            name="body"
            id="body"
            className="block w-full rounded-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="userId" className="text-lg font-semibold">
            User ID
          </label>
          <input
            type="number"
            name="userId"
            id="userId"
            className="block w-full rounded-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <button
          type={"submit"}
          className="bg-slate-900 hover:bg-slate-700 text-sm font-semibold text-white rounded-md flex items-center p-2"
        >
          Create Post
        </button>
      </Form>
      <hr className="bg-slate-900 border-2" />
      <ul>
        {data.map((d) => (
          <li key={d.id}>
            <Link
              to={`/posts/${d.id}`}
              className="font-semibold text-slate-700"
            >
              {d.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
