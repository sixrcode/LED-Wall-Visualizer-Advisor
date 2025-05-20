"use client";

import type { ReactNode } from 'react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import SidebarNav from './SidebarNav';
import { FlameKindling } from 'lucide-react'; // Using a generic "creative" icon
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { usePathname } from 'next/navigation';

interface AppLayoutProps {
  children: ReactNode;
}

const getPageTitle = (pathname: string): string => {
  if (pathname.startsWith('/recommender')) return 'Tool Recommender';
  if (pathname.startsWith('/wizard')) return 'Setup Wizard';
  if (pathname.startsWith('/preview')) return 'Live Preview Sandbox';
  if (pathname.startsWith('/knowledge')) return 'Knowledge Cards';
  if (pathname.startsWith('/export')) return 'Run-of-Show PDF Export';
  return 'LED Wall Visualizer Advisor';
};

export default function AppLayout({ children }: AppLayoutProps) {
  const pathname = usePathname();
  const pageTitle = getPageTitle(pathname);

  return (
    <SidebarProvider defaultOpen>
      <Sidebar collapsible="icon" className="border-r border-sidebar-border shadow-lg">
        <SidebarHeader className="p-4">
          <div className="flex items-center gap-2 group-data-[collapsible=icon]:justify-center">
            <FlameKindling className="h-8 w-8 text-primary" />
            <div className="flex flex-col group-data-[collapsible=icon]:hidden">
              <h1 className="text-lg font-semibold tracking-tight text-sidebar-foreground">
                Visualizer Advisor
              </h1>
              <p className="text-xs text-sidebar-foreground/70">LED Wall Tools</p>
            </div>
          </div>
        </SidebarHeader>
        <Separator className="my-0 bg-sidebar-border" />
        <SidebarContent className="p-2">
          <SidebarNav />
        </SidebarContent>
        <Separator className="my-0 bg-sidebar-border" />
        <SidebarFooter className="p-4 group-data-[collapsible=icon]:p-2">
          <div className="flex items-center gap-3 group-data-[collapsible=icon]:justify-center">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://placehold.co/40x40.png" alt="User Avatar" data-ai-hint="abstract avatar" />
              <AvatarFallback>EV</AvatarFallback>
            </Avatar>
            <div className="flex flex-col group-data-[collapsible=icon]:hidden">
              <span className="text-sm font-medium text-sidebar-foreground">Event Crew</span>
              <span className="text-xs text-sidebar-foreground/70">Nerd Fest Team</span>
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset className="flex flex-col">
        <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background/80 px-6 backdrop-blur-sm">
          <SidebarTrigger className="md:hidden" />
          <h1 className="text-xl font-semibold text-foreground">{pageTitle}</h1>
        </header>
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
