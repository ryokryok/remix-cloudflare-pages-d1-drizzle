import { json, LoaderFunctionArgs, MetaFunction } from "@remix-run/cloudflare";
import { Link, useLoaderData } from "@remix-run/react";
import { getPost } from "~/lib/client";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const id = params.id;
  if (!id) {
    throw new Response("Missing ID", { status: 404 });
  }

  try {
    const result = await getPost(id);
    return json(result);
  } catch (error) {
    throw new Response("Not Found", { status: 404 });
  }
};

export const meta: MetaFunction<typeof loader> = ({ data, error }) => {
  if (error) {
    return [
      { title: "Not Found" },
      {
        name: "description",
        content: "Not Found Post by id",
      },
    ];
  }
  return [
    { title: data?.title },
    {
      name: "description",
      content: data?.body,
    },
  ];
};

export default function Index() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-xl font-bold">{data.title}</h2>
      <p className="text-l">{data.body}</p>
      <hr className="bg-slate-900 border-2" />
      <Link to={"/posts"} className="text-sky-700">
        Back to Post List
      </Link>
    </div>
  );
}

export function ErrorBoundary() {
  return <p className="text-red-700"> something error to fetch post</p>;
}
