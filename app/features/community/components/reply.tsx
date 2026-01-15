import { MessageCircleIcon } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/common/components/ui/avatar";
import { Button } from "~/common/components/ui/button";
import { useState } from "react";
import { Form, Link } from "react-router";
import { Textarea } from "~/common/components/ui/textarea";
import { DateTime } from "luxon";

interface ReplyProps {
  username: string;
  avatarURL?: string | null;
  timestamp: string;
  content: string;
  topLevel: boolean; // prevents infinite recursion
  replies?: {
    post_reply_id: number;
    reply: string;
    created_at: string;
    user: {
      name: string;
      avatar: string | null;
      username: string;
    };
  }[];
}

export function Reply({
  username,
  avatarURL,
  timestamp,
  content,
  topLevel,
  replies,
}: ReplyProps) {
  const [replying, setReplying] = useState(false);
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex items-start gap-5 w-2/3">
        <Avatar className="size-10">
          <AvatarFallback>{username.charAt(0).toUpperCase()}</AvatarFallback>
          {avatarURL ? <AvatarImage src={avatarURL} /> : null}
        </Avatar>
        <div className="flex flex-col gap-2 items-start w-full">
          <div className="flex items-center gap-2">
            <Link to={`/users/${username}`} className="hover:underline">
              <h4 className="font-medium">{username}</h4>
            </Link>
            <span className="text-xs text-muted-foreground">
              {timestamp
                ? DateTime.fromISO(timestamp).toRelative({
                    locale: "en-US",
                  })
                : null}
            </span>
          </div>
          <p className="text-sm text-muted-foreground">{content}</p>
          <Button
            variant="ghost"
            className="self-end"
            onClick={() => setReplying((prev) => !prev)}
          >
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
            <Textarea
              placeholder="Write a reply"
              className="w-full resize-none"
              rows={5}
            />
            <Button>Reply</Button>
          </div>
        </Form>
      )}
      {topLevel &&
        replies &&
        replies.length > 0 &&
        replies.map((reply) => (
          <div className="pl-10 w-full">
            <Reply
              key={reply.post_reply_id}
              username={reply.user.name}
              avatarURL={reply.user.avatar}
              timestamp={reply.created_at}
              content={reply.reply}
              topLevel={false}
            />
          </div>
        ))}
    </div>
  );
}
