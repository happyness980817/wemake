import { makeSSRClient } from "~/supa-client";
import type { Route } from "./+types/send-message-page";
import { getLoggedInUserId, getUserProfile } from "../queries";
import { sendMessage } from "../mutations";
import { z } from "zod";
import { redirect } from "react-router";

const formSchema = z.object({
  content: z.string().min(1),
});

export const action = async ({ request, params }: Route.ActionArgs) => {
  if (request.method !== "POST") {
    return Response.json({ error: "Method Not Allowed" }, { status: 405 });
  }
  const formData = await request.formData();
  const { data, success } = formSchema.safeParse(Object.fromEntries(formData));
  if (!success) {
    return Response.json({ error: "Invalid form data" }, { status: 400 });
  }
  const { client } = makeSSRClient(request);
  const fromUserId = await getLoggedInUserId(client); // 메시지를 전송하는 현재 로그인된 유저
  const { profile_id: toUserId } = await getUserProfile(client, {
    username: params.username,
  }); // 메시지를 받는 상대방 유저
  if (fromUserId === toUserId) {
    throw Error("You cannot send a message to yourself.");
  }
  const messageRoomId = await sendMessage(client, {
    fromUserId,
    toUserId,
    content: data.content,
  });
  return redirect(`/my/messages/${messageRoomId}`);
};
