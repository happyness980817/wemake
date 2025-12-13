import { MessageCircleIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "~/common/components/ui/avatar";
import { Button } from "~/common/components/ui/button";
import { useState } from "react";
import { Form } from "react-router";
import { Textarea } from "~/common/components/ui/textarea";

interface ReplyProps {
  username: string;
  avatarURL?: string;
  timestamp: string;
  content: string;
  topLevel: boolean; // prevents infinite recursion
}

export function Reply({ username, avatarURL, timestamp, content, topLevel }: ReplyProps) {
  const [replying, setReplying] = useState(false);
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-start gap-5 w-3/5">
        <Avatar className="size-10">
          <AvatarFallback>{username.charAt(0).toUpperCase()}</AvatarFallback>
          <AvatarImage src={avatarURL} />
        </Avatar>
        <div className="flex flex-col gap-2 items-start">
          <div className="flex items-center gap-2">
            <h4 className="font-medium">{username}</h4>
            <span className="text-xs text-muted-foreground">{timestamp}</span>
          </div>
          <p className="text-sm text-muted-foreground">{content}</p>
          <Button variant="ghost" className="self-end" onClick={() => setReplying((prev) => !prev)}>
            <MessageCircleIcon className="w-4 h-4" />
            Reply
          </Button>
        </div>
      </div>
      {replying && (
        <Form className="flex items-start gap-2 w-3/4">
          <Avatar className="size-10">
            <AvatarFallback>N</AvatarFallback>
            <AvatarImage src="https://github.com/apple.png" />
          </Avatar>
          <div className="flex flex-col gap-5 items-end w-full">
            <Textarea placeholder="Write a reply" className="w-full resize-none" rows={5} />
            <Button>Reply</Button>
          </div>
        </Form>
      )}
      {topLevel && (
        <div className="pl-10 w-full">
          <Reply
            username="John Apple Doe"
            avatarURL="https://github.com/apple.png"
            timestamp="12 hours ago"
            content="Hello, I'm looking for a productivity tool that can help me manage my time and tasks. I've tried a few different tools, but none of them have worked for me. I'm looking for a tool that can help me manage my time and tasks."
            topLevel={false}
          />
        </div>
      )}
    </div>
  );
}
