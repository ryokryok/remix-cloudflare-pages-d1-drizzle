import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { Form, useLoaderData } from "@remix-run/react";
import { getAuthenticator } from "~/services/auth.server";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    {
      name: "description",
      content: "Welcome to Remix! Using Vite and Cloudflare!",
    },
  ];
};

export const loader = async ({ context, request }: LoaderFunctionArgs) => {
  const authenticator = getAuthenticator(context);

  const user = await authenticator.isAuthenticated(request);
  return json({ user });
};

export default function Index() {
  const { user } = useLoaderData<typeof loader>();
  if (user) {
    return (
      <div className="mx-auto p-4 sm:p-16">
        <pre className="text-2xl font-extrabold">Hi, {user.name}</pre>
        <div className="mt-4 leading-7">
          <Form action={"/logout"} method={"POST"}>
            <button
              type={"submit"}
              className="bg-red-700 hover:bg-red-500 text-sm font-semibold text-white rounded-md flex items-center p-2.5"
            >
              Logout
            </button>
          </Form>
        </div>
      </div>
    );
  }
  return (
    <div className="mx-auto p-4 sm:p-16">
      <h1 className="text-2xl font-extrabold">Home</h1>
      <div className="mt-4 leading-7">
        <Form action="/auth/google" method="post">
          <button
            type={"submit"}
            className="bg-blue-700 hover:bg-blue-500 text-sm font-semibold text-white rounded-md flex items-center p-2.5"
          >
            Login with Google
          </button>
        </Form>
      </div>
    </div>
  );
}
