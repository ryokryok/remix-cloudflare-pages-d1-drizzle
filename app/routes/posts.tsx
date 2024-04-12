import { Outlet } from "@remix-run/react";

export default function Index() {
  return (
    <div className="mx-auto p-16">
      <h1 className="text-2xl font-extrabold">Posts</h1>
      <div className="mt-4 leading-7">
        <Outlet />
      </div>
    </div>
  );
}
