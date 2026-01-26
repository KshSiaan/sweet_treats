"use client";
import React from "react";
import {
  BookCopyIcon,
  CoinsIcon,
  FileCogIcon,
  GiftIcon,
  LayoutDashboardIcon,
  LogOutIcon,
  Settings2,
  SettingsIcon,
  ShapesIcon,
  TargetIcon,
  Users2Icon,
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
const prefix = "/admin";
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
    { name: "Dashboard", url: `${prefix}`, icon: LayoutDashboardIcon },
    { name: "Category", url: `${prefix}/category`, icon: ShapesIcon },
    { name: "User Management", url: `${prefix}/users`, icon: Users2Icon }, // Use a standard Users/User Management Icon
    {
      name: "Reward Management",
      url: `${prefix}/reward`,
      icon: GiftIcon,
    },
    {
      name: "Business Accounts",
      url: `${prefix}/companies`,
      icon: TargetIcon,
    },
    // {
    //   name: "Subscription",
    //   url: `${prefix}/subscription`,
    //   icon: CoinsIcon,
    // },
    {
      name: "Wallet System",
      url: `${prefix}/wallet`,
      icon: CoinsIcon,
    },
    {
      name: "Content Moderation",
      url: `${prefix}/reports`,
      icon: BookCopyIcon,
    },
    { name: "Settings", url: `${prefix}/settings`, icon: SettingsIcon },
    {
      name: "Legal Pages ",
      url: `${prefix}/settings/legal`,
      icon: FileCogIcon,
    },
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
