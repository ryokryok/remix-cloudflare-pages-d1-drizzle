import type { MetaFunction } from "@remix-run/cloudflare";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    {
      name: "description",
      content: "Welcome to Remix! Using Vite and Cloudflare!",
    },
  ];
};

export default function Index() {
  return (
    <div className="mx-auto p-16">
      <h1 className="text-2xl font-extrabold">Home</h1>
      <div className="mt-4 leading-7 flex flex-col">
        <Link to={"/users"} className="font-semibold text-sky-700">
          User Page
        </Link>
      </div>
    </div>
  );
}
