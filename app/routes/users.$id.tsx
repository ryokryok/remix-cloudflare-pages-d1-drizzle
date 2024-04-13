import { json, LoaderFunctionArgs, MetaFunction } from "@remix-run/cloudflare";
import { Link, useLoaderData } from "@remix-run/react";
import { getUser } from "~/lib/client";

export const loader = async ({ params, context }: LoaderFunctionArgs) => {
  const id = params.id;
  if (!id) {
    throw new Response("Missing ID", { status: 404 });
  }

  try {
    const result = await getUser(context.cloudflare.env.DB, id);
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
        content: "Not Found User by id",
      },
    ];
  }
  return [
    { title: `User ID ${data?.id}` },
    {
      name: "description",
      content: `${data?.name}`,
    },
  ];
};

export default function Index() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-xl font-bold">User ID: {data.id}</h2>
      <p className="text-l">{data.name}</p>
      <hr className="bg-slate-900 border-2" />
      <Link to={"/users"} className="text-sky-700">
        Back to Users List
      </Link>
    </div>
  );
}

export function ErrorBoundary() {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-red-700">something error to get user</p>
      <hr className="bg-slate-900 border-2" />
      <Link to={"/users"} className="text-sky-700">
        Back to Users List
      </Link>
    </div>
  );
}
