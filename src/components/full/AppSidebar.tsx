"use client";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarTrigger,
} from "../ui/sidebar";
import Link from "next/link";
import MenuItem from "./MenuItem";
import { SettingsIcon } from "lucide-react";
import { ThemeToggle } from "../ui/themeToggle";
import Settings from "@/app/_components/settings";

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon">
            <SidebarHeader />
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <MenuItem />
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <ThemeToggle />
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            {/* <Link href={"#"}> */}
                            {/*     <span>Settings</span> */}
                            {/* </Link> */}
                            <div>
                                <SettingsIcon />
                                <Settings />
                            </div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
            <SidebarTrigger
                className={`absolute -right-4 top-1/2 -translate-y-1/2 transform opacity-0 transition-opacity group-hover:opacity-100`}
            />
        </Sidebar>
    );
}
