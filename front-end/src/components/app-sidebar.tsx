import {
  Home,
  DollarSign,
  ShoppingBagIcon,
  LayoutGrid,
  Landmark,
} from "lucide-react";

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
import { useNavigate } from "react-router";

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
    title: "Categorias",
    url: "/categories",
    icon: LayoutGrid,
  },
  {
    title: "Contas",
    url: "/accounts",
    icon: Landmark,
  },
];

export function AppSidebar() {
  const { user, setUser } = useAuthContext();
  const navigate = useNavigate();

  return (
    <Sidebar>
      <SidebarContent className="h-full justify-between">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="h-7">
                    <a onClick={() => navigate(item.url)}>
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
          <Button
            variant={"secondary"}
            onClick={() => {
              setUser(undefined);
              localStorage.removeItem("access_token");
            }}
          >
            Sair
          </Button>
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
}
