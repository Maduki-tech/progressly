import { KanbanBoard } from "@/components/full/KanbanBoard";
import { HydrateClient } from "@/trpc/server";

export default async function Home() {
    return (
        <HydrateClient>
            <h1>Dashboard</h1>
            <p>Welcome to the Dashboard</p>
            <KanbanBoard />
        </HydrateClient>
    );
}
