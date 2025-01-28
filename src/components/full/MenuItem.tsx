"use client";
import React from "react";
import { SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import Link from "next/link";
import {
    BarChartIcon,
    CalendarIcon,
    ClipboardIcon,
    ClockIcon,
    FileTextIcon,
    HomeIcon,
    ProjectorIcon,
    UsersIcon,
} from "lucide-react";
import { usePathname } from "next/navigation";

const items = [
    {
        title: "Dashboard",
        url: "/",
        icon: HomeIcon, // Represents the main dashboard
    },
    {
        title: "Projects",
        url: "/projects",
        icon: ProjectorIcon, // Represents all projects
    },
    {
        title: "Tasks",
        url: "/tasks",
        icon: ClipboardIcon, // Represents individual tasks
    },
    {
        title: "Calendar",
        url: "/calendar",
        icon: CalendarIcon, // For scheduling and deadlines
    },
    {
        title: "Time Tracker",
        url: "/time-tracker",
        icon: ClockIcon, // For tracking time spent on tasks
    },
    {
        title: "Clients",
        url: "/clients",
        icon: UsersIcon, // For managing client information
    },
    {
        title: "Invoices",
        url: "/invoices",
        icon: FileTextIcon, // For generating and managing invoices
    },
    {
        title: "Reports",
        url: "/reports",
        icon: BarChartIcon, // For project/task analytics
    },
];
export default function MenuItem() {
    const pathname = usePathname();
    return (
        <>
            {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                        asChild
                        className={pathname === item.url ? "bg-accent" : ""}
                    >
                        <Link href={item.url}>
                            <item.icon />
                            <span>{item.title}</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            ))}
        </>
    );
}
