import { AppSidebar } from "@/components/full/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { HydrateClient } from "@/trpc/server";

export default async function Home() {
  return (
    <HydrateClient>
      <SidebarProvider>
        <AppSidebar />
        <main>
          <SidebarTrigger />
        </main>
      </SidebarProvider>
    </HydrateClient>
  );
}
