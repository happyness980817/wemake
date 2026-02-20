import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/common/components/ui/card";
import type { Route } from "./+types/message-page";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/common/components/ui/avatar";
import { Form, useOutletContext } from "react-router";
import { Textarea } from "~/common/components/ui/textarea";
import { Button } from "~/common/components/ui/button";
import { SendIcon } from "lucide-react";
import { MessagesBubble } from "../components/messages-bubble";
import { makeSSRClient } from "~/supa-client";
import {
  getLoggedInUserId,
  getMessagesByRoomId,
  getRoomRecipient,
  sendMessageToRoom,
} from "../queries";
import { z } from "zod";
import { useEffect, useRef } from "react";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Message | Wemake" }];
};

const paramsSchema = z.object({
  messageRoomId: z.string().min(1),
});

const formSchema = z.object({
  message: z.string().min(1, "Content must be at least 1 character long"),
});

export const loader = async ({ request, params }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const { data, success } = paramsSchema.safeParse({
    messageRoomId: params.messageRoomId,
  });
  if (!success) {
    throw new Error("Invalid room ID");
  }
  const { messageRoomId } = data;
  const messages = await getMessagesByRoomId(client, {
    messageRoomId,
    userId, // user 가 room 에 속하지 않은 경우에는 해당 message 들을 가져올 수 없어야 한다
  });
  const recipient = await getRoomRecipient(client, {
    messageRoomId,
    userId,
  });
  return { messages, recipient };
};

export const action = async ({ request, params }: Route.ActionArgs) => {
  const { messageRoomId } = params;
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const formData = await request.formData();
  const { data: parsedData, success } = formSchema.safeParse(
    Object.fromEntries(formData),
  );
  if (!success) {
    throw new Error("Invalid message content");
  }
  const { message } = parsedData;
  await sendMessageToRoom(client, {
    messageRoomId: params.messageRoomId,
    message,
    userId,
  });
  return {
    ok: true,
  };
};

export default function MessagePage({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  const { userId } = useOutletContext<{ userId: string }>();
  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => {
    if (actionData?.ok) {
      // TODO: refresh messages
      formRef.current?.reset();
    }
  }, [actionData]);
  return (
    <div className="h-full flex flex-col justify-between">
      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="size-14">
            <AvatarImage src={loaderData.recipient.profile.avatar ?? ""} />
            <AvatarFallback>
              {loaderData.recipient.profile.name[0]}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-0">
            <CardTitle>{loaderData.recipient.profile.name}</CardTitle>
            <CardDescription>2 days ago</CardDescription>
          </div>
        </CardHeader>
      </Card>
      <div className="py-10 overflow-y-scroll space-y-4 flex flex-col justify-start h-full">
        {loaderData.messages.map((message) => (
          <MessagesBubble
            key={message.message_id}
            avatarURL={message.sender.avatar ?? ""}
            avatarFallback={message.sender.name[0]}
            message={message.content}
            isFromMe={message.sender.profile_id === userId}
          />
        ))}
      </div>
      <Card>
        <CardHeader>
          <Form
            ref={formRef}
            method="post"
            className="relative flex justify-end items-center"
          >
            <Textarea
              placeholder="Write a message..."
              className="resize-none"
              rows={2}
              name="message"
              required
            />
            <Button type="submit" size="icon" className="absolute right-2">
              <SendIcon className="w-4 h-4" />
            </Button>
          </Form>
        </CardHeader>
      </Card>
    </div>
  );
}
