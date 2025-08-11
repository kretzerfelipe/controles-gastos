import { Home, DollarSign, ShoppingBagIcon, Settings } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useAuthContext } from "@/app";
import { Button } from "./ui/button";

const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Receitas",
    url: "/income",
    icon: DollarSign,
  },
  {
    title: "Despesas",
    url: "/expense",
    icon: ShoppingBagIcon,
  },
  {
    title: "Configurações",
    url: "/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  const { user } = useAuthContext();

  return (
    <Sidebar>
      <SidebarContent className="h-full justify-between">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="h-7">
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarFooter>
          <Button
            variant={"ghost"}
            className="flex flex-col h-15 justify-start text-start gap-1"
          >
            <span className="flex-container">{user?.name}</span>
            <span className="flex-container text-sm text-muted-foreground">
              {user?.email}
            </span>
          </Button>
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
}
