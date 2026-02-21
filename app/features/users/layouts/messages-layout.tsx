import { Outlet, useOutletContext } from "react-router";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
} from "~/common/components/ui/sidebar";
import { MessagesCard } from "../components/messages-card";
import type { Route } from "./+types/messages-layout";
import { makeSSRClient } from "~/supa-client";
import { getLoggedInUserId, getMessages } from "../queries";

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const messages = await getMessages(client, { userId });
  return { messages };
};

export default function MessagesLayout({ loaderData }: Route.ComponentProps) {
  const { userId, avatar, name } = useOutletContext<{
    userId: string;
    avatar: string;
    name: string;
  }>();
  return (
    <SidebarProvider className="max-h-[calc(100vh-14rem)] h-[calc(100vh-14rem)] overflow-hidden min-h-full">
      <Sidebar className="pt-16" variant="floating">
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              {loaderData.messages.map((message) => (
                <MessagesCard
                  key={message.message_room_id}
                  id={message.message_room_id}
                  name={message.name}
                  lastMessage={message.last_message}
                  avatarURL={message.avatar}
                />
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <div className="w-full h-full">
        <Outlet context={{ userId, avatar, name }} />
      </div>
    </SidebarProvider>
  );
}
