"use client";
import React from "react";
import {
  BellIcon,
  BookCopyIcon,
  ChartNoAxesCombined,
  ClipboardCheckIcon,
  LayoutDashboardIcon,
  LogOutIcon,
  MapIcon,
  MegaphoneIcon,
  Settings2,
  SettingsIcon,
  ShapesIcon,
  StoreIcon,
  TagIcon,
  TargetIcon,
  UserPlus2Icon,
  Users2Icon,
  UsersRoundIcon,
  WalletIcon,
} from "lucide-react";
import { Princess_Sofia } from "next/font/google";
import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
const prefix = "/business";
// sample data
const data = {
  navMain: [
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        { title: "Account", url: `${prefix}/account` },
        { title: "Terms & Conditions", url: `${prefix}/tnc` },
      ],
    },
  ],
  projects: [
    // 1. Dashboard
    { name: "Dashboard", url: `${prefix}`, icon: LayoutDashboardIcon },

    // 2. Category
    { name: "Google Maps", url: `${prefix}/maps`, icon: MapIcon },

    // 3. User Management (New addition/mapping)
    { name: "Store Fronts", url: `${prefix}/stores`, icon: StoreIcon }, // Use a standard Users/User Management Icon
    {
      name: "Categories",
      url: `${prefix}/category`,
      icon: ShapesIcon,
    }, // Use a standard Users/User Management Icon

    // 4. Business Accounts -> Companies
    {
      name: "Promo Management",
      url: `${prefix}/promo`,
      icon: MegaphoneIcon,
    },
    {
      name: "Inventory Management",
      url: `${prefix}/inventory`,
      icon: ClipboardCheckIcon,
    },
    {
      name: "Employee Management",
      url: `${prefix}/employee`,
      icon: UsersRoundIcon,
    },
    // {
    //   name: "Purchasing System",
    //   url: `${prefix}/purchasing`,
    //   icon: TagIcon,
    // },
    {
      name: "Wallet System",
      url: `${prefix}/wallet`,
      icon: WalletIcon,
    },
    {
      name: "Statistics Dashboard",
      url: `${prefix}/stats`,
      icon: ChartNoAxesCombined,
    },
    {
      name: "Followers",
      url: `${prefix}/followers`,
      icon: UserPlus2Icon,
    },
    { name: "Notification", url: `${prefix}/notification`, icon: BellIcon },
    { name: "Settings", url: `${prefix}/settings`, icon: SettingsIcon },
    { name: "Log Out", url: `/logout`, icon: LogOutIcon },
  ],
};
const princess = Princess_Sofia({
  variable: "--font-princess",
  subsets: ["latin", "latin-ext"],
  weight: ["400"],
});
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // placeholder during SSR → avoids flicker/mismatch
    return (
      <Sidebar variant="sidebar" className="py-6" collapsible="icon" {...props}>
        <SidebarHeader>
          <div className="h-20 w-full border rounded-lg"></div>
        </SidebarHeader>
        <SidebarContent>
          <NavProjects projects={data.projects} />
          <NavMain items={data.navMain} />
        </SidebarContent>
        <SidebarFooter>
          <div className="py-2 h-16 border px-2 rounded-full relative bg-zinc-200" />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    );
  }

  return (
    <Sidebar
      variant="sidebar"
      className="bg-sidebar"
      collapsible="icon"
      {...props}
    >
      <SidebarHeader>
        <div className="h-20 w-full flex justify-center items-center">
          <h1 className={`font-bold text-3xl ${princess.className}`}>
            Sweet Treats
          </h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavProjects projects={data.projects} />
        {/* <NavMain items={data.navMain} /> */}
      </SidebarContent>
      <SidebarFooter></SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
