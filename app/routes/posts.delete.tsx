import { ActionFunctionArgs, redirect } from "@remix-run/cloudflare";
import { and, eq } from "drizzle-orm";
import { getDBClient } from "~/lib/client.server";
import { posts } from "~/lib/schema";
import { getAuthenticator } from "~/services/auth.server";

export const action = async ({ context, request }: ActionFunctionArgs) => {
  const authenticator = getAuthenticator(context);
  const user = await authenticator.isAuthenticated(request);
  if (user) {
    const db = getDBClient(context.cloudflare.env.DB)
    const formData = await request.formData()
    const postId = (formData.get("post-id")?.toString())
    // validation
    if (postId === undefined || Number.isNaN(parseInt(postId))) {
      return new Response("Post ID is invalid", { status: 500 })
    }
    await db.delete(posts).where(and(
      eq(posts.id, parseInt(postId)),
      eq(posts.userId, user.id),
    ))
  }
  return redirect("/")
};