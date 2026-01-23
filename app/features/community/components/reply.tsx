import { MessageCircleIcon } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/common/components/ui/avatar";
import { Button } from "~/common/components/ui/button";
import { useEffect, useState } from "react";
import { Form, Link, useOutletContext, useActionData } from "react-router";
import { Textarea } from "~/common/components/ui/textarea";
import { DateTime } from "luxon";
import type { action } from "../pages/post-page";

interface ReplyProps {
  name: string;
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
  topLevelId: number;
}

export function Reply({
  name,
  username,
  avatarURL,
  timestamp,
  content,
  topLevel,
  replies,
  topLevelId,
}: ReplyProps) {
  const actionData = useActionData<typeof action>();
  const [replying, setReplying] = useState(false);
  const toggleReplying = () => setReplying((prev) => !prev);
  const {
    isLoggedIn,
    name: nameOfLoggedInUser,
    avatar,
  } = useOutletContext<{
    isLoggedIn: boolean;
    name: string;
    avatar: string | null;
  }>();
  useEffect(() => {
    if (actionData?.ok) {
      setReplying(false);
    }
  }, [actionData]);
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex items-start gap-5 w-2/3">
        <Avatar className="size-10">
          <AvatarFallback>{name[0].toUpperCase()}</AvatarFallback>
          {avatarURL ? <AvatarImage src={avatarURL} /> : null}
        </Avatar>
        <div className="flex flex-col gap-2 items-start w-full">
          <div className="flex items-center gap-2">
            <Link to={`/users/${username}`} className="hover:underline">
              <h4 className="font-medium">{name}</h4>
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
          {isLoggedIn ? (
            <Button
              variant="ghost"
              className="self-end"
              onClick={toggleReplying}
            >
              <MessageCircleIcon className="w-4 h-4" />
              Reply
            </Button>
          ) : null}
        </div>
      </div>
      {replying && (
        <Form className="flex items-start gap-2 w-3/4" method="post">
          <input type="hidden" name="topLevelId" value={topLevelId} />
          <Avatar className="size-10">
            <AvatarFallback>
              {nameOfLoggedInUser[0].toUpperCase()}
            </AvatarFallback>
            {avatar ? <AvatarImage src={avatar} /> : null}
          </Avatar>
          <div className="flex flex-col gap-5 items-end w-full">
            <Textarea
              name="reply"
              placeholder="Write a reply"
              className="w-full resize-none"
              rows={5}
              defaultValue={`@${username} `}
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
              name={reply.user.name}
              username={reply.user.username}
              avatarURL={reply.user.avatar}
              timestamp={reply.created_at}
              content={reply.reply}
              topLevel={false}
              topLevelId={topLevelId}
            />
          </div>
        ))}
    </div>
  );
}
