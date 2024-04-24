import { ActionFunctionArgs } from "@remix-run/cloudflare";
import { getAuthenticator } from "~/services/auth.server";

export const action = ({ context, request }: ActionFunctionArgs) => {
  const authenticator = getAuthenticator(context);
  return authenticator.authenticate("google", request);
};
