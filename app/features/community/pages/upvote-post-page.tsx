import type { Route } from "./+types/upvote-post-page";
import { makeSSRClient } from "~/supa-client";
import { getLoggedInUserId } from "~/features/users/queries";
import { toggleUpvote } from "../mutations";

export const action = async ({ request, params }: Route.ActionArgs) => {
  // 공개 url (`/community/:postId/upvote`) 을 생성하기 때문에 보호해야 한다
  if (request.method !== "POST") {
    throw new Response("Method not allowed", {
      status: 405,
    });
  }
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  await toggleUpvote(client, {
    postId: Number(params.postId),
    userId,
  });
  return {
    ok: true,
  };
};
