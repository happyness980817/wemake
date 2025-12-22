import { Outlet } from "react-router";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
} from "~/common/components/ui/sidebar";
import { MessagesCard } from "../components/messages-card";

export default function MessagesLayout() {
  return (
    <SidebarProvider className="max-h-[calc(100vh-14rem)] overflow-hidden h-full min-h-full">
      <Sidebar className="pt-16" variant="floating">
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              {Array.from({ length: 20 }).map((_, index) => (
                <MessagesCard
                  id={index}
                  key={index}
                  name={`User ${index}`}
                  lastMessage="Hello, how are you?"
                  avatarURL="https://github.com/shadcn.png"
                />
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <div className="w-full h-full">
        <Outlet />
      </div>
    </SidebarProvider>
  );
}
