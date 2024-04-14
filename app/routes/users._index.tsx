import {
  ActionFunctionArgs,
  json,
  LoaderFunctionArgs,
  MetaFunction,
  redirect,
} from "@remix-run/cloudflare";
import { useLoaderData, Form, useNavigation } from "@remix-run/react";
import { useEffect, useRef } from "react";
import { createUser, getUserList } from "~/lib/client";

export const meta: MetaFunction = () => {
  return [
    { title: "Users" },
    {
      name: "description",
      content: "User List from D1",
    },
  ];
};

export const loader = async ({ context }: LoaderFunctionArgs) => {
  const result = await getUserList(context.cloudflare.env.DB);
  return json(result);
};

export async function action({ request, context }: ActionFunctionArgs) {
  const body = await request.formData();
  const userName = body.get("user-name")?.toString();
  const result = await createUser(context.cloudflare.env.DB, {
    name: userName ?? "",
  });
  if (!result.success) {
    return json(result.error);
  }
  return redirect(`/users`);
}

export default function Index() {
  const data = useLoaderData<typeof loader>();

  const navigation = useNavigation();
  const isAdding = navigation.state === "submitting";
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isAdding) {
      formRef.current?.reset();
      inputRef.current?.focus();
    }
  }, [isAdding]);

  return (
    <div className="flex flex-col gap-4">
      <Form ref={formRef} method={"POST"} className="flex gap-2 items-end">
        <div className="flex flex-col gap-1">
          <label htmlFor="user-name" className="text-lg font-semibold">
            Name
          </label>
          <input
            ref={inputRef}
            type="text"
            name="user-name"
            id="user-name"
            required
            minLength={1}
            maxLength={100}
            className="block w-full rounded-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <button
          type={"submit"}
          className="bg-slate-900 hover:bg-slate-700 text-sm font-semibold text-white rounded-md flex items-center p-2"
        >
          Create User
        </button>
      </Form>
      <hr className="bg-slate-900 border-2" />

      <table className="border-collapse border border-slate-400 ...">
        <thead>
          <tr>
            <th className="w-1/6 border border-slate-300 font-semibold text-left p-4">
              ID
            </th>
            <th className="w-5/6 border border-slate-300 font-semibold text-left p-4">
              Name
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((d) => (
            <tr key={d.id}>
              <td className="border border-slate-300 text-left p-4">{d.id}</td>
              <td className="border border-slate-300 text-left p-4">
                {d.name}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
