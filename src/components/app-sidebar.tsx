"use client";

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import { SidebarBrand } from "./sidebar-brand";
import { SidebarFooterUser } from "./sidebar-footer-user";
import {
  Dumbbell,
  User,
  BarChart3,
  FilePlus,
  Settings2,
  PieChart,
  List,
  Users,
  ClipboardList,
  CheckSquare,
} from "lucide-react";

const data = {
  teams: [
    {
      name: "FitLife",
      logo: Dumbbell,
      plan: "Pro",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: BarChart3,
      isActive: true,
    },
    {
      title: "Workouts",
      url: "/dashboard/workouts",
      icon: Dumbbell,
    },
    {
      title: "Nutrition",
      url: "/dashboard/nutrition",
      icon: PieChart,
    },
    {
      title: "Progress",
      url: "/dashboard/progress",
      icon: ClipboardList,
    },
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: Settings2,
    },
  ],
  adminNav: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: BarChart3,
      isActive: true,
    },
    {
      title: "Manage Members",
      url: "/dashboard/members",
      icon: Users,
    },
    {
      title: "Workout Plans",
      url: "/dashboard/workout-plans",
      icon: FilePlus,
    },
    {
      title: "Nutrition Plans",
      url: "/dashboard/nutrition-plans",
      icon: List,
    },
    {
      title: "Reports",
      url: "/dashboard/reports",
      icon: CheckSquare,
    },
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: Settings2,
    },
  ],
};


export function AppSidebar({ role }: { role: "member" | "admin" }) {
  const navItems = role === "admin" ? data.adminNav : data.navMain;

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarBrand />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navItems} />
      </SidebarContent>
      <SidebarFooter>
        <SidebarFooterUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
