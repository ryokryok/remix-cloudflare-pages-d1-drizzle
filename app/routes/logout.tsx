import { ActionFunctionArgs } from "@remix-run/cloudflare";
import { getAuthenticator } from "~/services/auth.server";

export const action = async ({ context, request }: ActionFunctionArgs) => {
  const authenticator = getAuthenticator(context);
  await authenticator.logout(request, { redirectTo: "/" });
};
