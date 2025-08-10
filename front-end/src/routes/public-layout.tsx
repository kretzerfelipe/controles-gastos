import { Outlet } from 'react-router';
import { AppSidebar } from '../components/app-sidebat';
import { SidebarProvider, SidebarTrigger } from '../components/ui/sidebar';

export function PublicLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div>
        <SidebarTrigger />
        <Outlet />
      </div>
    </SidebarProvider>
  )
}