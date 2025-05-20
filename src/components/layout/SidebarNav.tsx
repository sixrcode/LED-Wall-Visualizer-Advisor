"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { WandSparkles, ListChecks, PlaySquare, BookOpen, FileDown, Settings2 } from 'lucide-react'; // Settings2 might be an alternative to SlidersHorizontal for Wizard

const navItems = [
  { href: '/recommender', label: 'Recommender', icon: WandSparkles },
  { href: '/wizard', label: 'Setup Wizard', icon: ListChecks },
  { href: '/preview', label: 'Live Preview', icon: PlaySquare },
  { href: '/knowledge', label: 'Knowledge Base', icon: BookOpen },
  { href: '/export', label: 'Export PDF', icon: FileDown },
];

export default function SidebarNav() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname.startsWith(item.href);
        return (
          <SidebarMenuItem key={item.href}>
            <Link href={item.href} passHref legacyBehavior>
              <SidebarMenuButton
                asChild
                isActive={isActive}
                tooltip={{ children: item.label, className: "bg-primary text-primary-foreground" }}
                className={isActive ? 'bg-primary/20 text-primary hover:bg-primary/30 hover:text-primary font-semibold' : 'hover:bg-sidebar-accent/80'}
              >
                <a>
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </a>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
}
