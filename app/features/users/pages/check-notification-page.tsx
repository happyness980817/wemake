import { makeSSRClient } from "~/supa-client";
import type { Route } from "./+types/check-notification-page";
import { getLoggedInUserId } from "../queries";
import { checkNotification } from "../mutations";
import { z } from "zod";

const paramsSchema = z.object({
  notificationId: z.coerce.number(),
});

export const action = async ({ request, params }: Route.ActionArgs) => {
  if (request.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }
  const { data, success } = paramsSchema.safeParse(params);
  const { client } = await makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  if (!success) {
    return {
      error: "Invalid notification ID",
    };
  }
  const notification = await checkNotification(client, {
    userId,
    notificationId: data.notificationId,
  });
  return {
    ok: true,
  };
};
