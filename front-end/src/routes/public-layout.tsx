import { Outlet } from 'react-router';
import { AppSidebar } from '../components/app-sidebar';
import { SidebarProvider, SidebarTrigger } from '../components/ui/sidebar';

export function PublicLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className='flex-container'>
        <SidebarTrigger />
        <Outlet />
      </div>
    </SidebarProvider>
  )
}