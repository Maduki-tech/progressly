import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "next-themes";
import { type Metadata } from "next";

import { TRPCReactProvider } from "@/trpc/react";
import { AppSidebar } from "@/components/full/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export const metadata: Metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} h-full bg-white`}
      suppressHydrationWarning
    >
      <body className="h-full">
        <ThemeProvider attribute={"class"} defaultTheme={"system"} enableSystem>
          <SidebarProvider className="flex">
            <AppSidebar />
            <TRPCReactProvider>
              <div className="flex-1 overflow-y-auto p-4">{children}</div>
            </TRPCReactProvider>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
