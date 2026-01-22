"use client";
import React from "react";
import {
  ChartNetworkIcon,
  CoinsIcon,
  GiftIcon,
  LayoutDashboardIcon,
  LogOutIcon,
  Settings2,
  SettingsIcon,
  TargetIcon,
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
const prefix = "/employee";
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
    { name: "Inventory", url: `${prefix}/inventory`, icon: TargetIcon },
    { name: "POS System", url: `${prefix}/pos`, icon: CoinsIcon }, // Use a standard Users/User Management Icon
    {
      name: "Employee Wallet",
      url: `${prefix}/employee-wallet`,
      icon: GiftIcon,
    },

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
