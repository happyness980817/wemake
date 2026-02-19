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
import { Form } from "react-router";
import { Textarea } from "~/common/components/ui/textarea";
import { Button } from "~/common/components/ui/button";
import { SendIcon } from "lucide-react";
import { MessagesBubble } from "../components/messages-bubble";
// import { makeSSRClient } from "~/supa-client";
// import { getLoggedInUserId, getMessagesByRoomId } from "../queries";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Message | Wemake" }];
};

// export const loader = async ({ request, params }: Route.LoaderArgs) => {
//   const { client } = makeSSRClient(request);
//   const userId = await getLoggedInUserId(client);
//   const messages = await getMessagesByRoomId(client, {
//     messageRoomId: params.messageRoomId,
//     userId, // user 가 room 에 속하지 않은 경우에는 해당 message 들을 가져올 수 없어야 한다
//   });
//   return { messages };
// };

export default function MessagePage({}: Route.ComponentProps) {
  return (
    <div className="h-full flex flex-col justify-between">
      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="size-14">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>S</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-0">
            <CardTitle>Shadcn</CardTitle>
            <CardDescription>2 days ago</CardDescription>
          </div>
        </CardHeader>
      </Card>
      <div className="py-10 overflow-y-scroll flex flex-col justify-start h-full">
        {Array.from({ length: 10 }).map((_, index) => (
          <MessagesBubble
            key={index}
            avatarURL="https://github.com/shadcn.png"
            avatarFallback="S"
            message="Lorem ipsum"
            isFromMe={index % 2 === 0}
          />
        ))}
      </div>
      <Card>
        <CardHeader>
          <Form className="relative flex justify-end items-center">
            <Textarea
              placeholder="Write a message..."
              className="resize-none"
              rows={2}
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
