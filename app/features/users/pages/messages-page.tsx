import type { Route } from "./+types/messages-page";
import { MessageCircleIcon } from "lucide-react";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Messages | Wemake" }];
};

export default function MessagesPage({}: Route.ComponentProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <MessageCircleIcon className="size-14 text-muted-foreground" />
      <h1 className="text-xl text-muted-foreground font-semibold mt-4">
        Click on a message to start a conversation
      </h1>
    </div>
  );
}
