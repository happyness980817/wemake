import { Link, useLocation } from "react-router";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/common/components/ui/avatar";
import {
  SidebarMenuButton,
  SidebarMenuItem,
} from "~/common/components/ui/sidebar";

interface MessagesCardProps {
  id: number;
  name: string;
  lastMessage: string;
  avatarURL?: string;
}

export function MessagesCard({
  id,
  name,
  lastMessage,
  avatarURL,
}: MessagesCardProps) {
  const location = useLocation();
  const isActive = location.pathname.includes(id.toString());
  return (
    <SidebarMenuItem>
      <SidebarMenuButton className="h-18" asChild isActive={isActive}>
        <Link to={`/my/messages/${id}`}>
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={avatarURL} />
              <AvatarFallback>{name.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium">{name}</span>
              <span className="text-xs text-muted-foreground">
                {lastMessage}
              </span>
            </div>
          </div>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
