import { Outlet } from "@remix-run/react";

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Posts</h1>
      <Outlet />
    </div>
  );
}
