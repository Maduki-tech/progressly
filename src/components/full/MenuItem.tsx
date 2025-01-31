"use client";
import React from "react";
import { SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import Link from "next/link";
import { HomeIcon } from "lucide-react";
import { usePathname } from "next/navigation";

const items = [
    {
        title: "Dashboard",
        url: "/",
        icon: HomeIcon, // Represents the main dashboard
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
