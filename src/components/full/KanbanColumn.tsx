import {
    SortableContext,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import KanbanCard from "./KanbanCard";
import { useDroppable } from "@dnd-kit/core";
import type { Column, Task } from "@/types/Kanban";

export default function KanbanColumn({
    column,
    tasks,
}: {
    column: Column;
    tasks: Task[];
}) {
    const { setNodeRef } = useDroppable({
        id: column.id,
        data: { type: "column" },
    });

    return (
        <Card
            className={`flex w-72 flex-col ${
                column.title === "To Do"
                    ? "bg-gray-300/50"
                    : column.title === "In Progress"
                      ? "bg-sky-300/50"
                      : "bg-lime-300/50"
            } `}
        >
            <CardHeader>
                <CardTitle className="text-sm font-medium">
                    {column.title} ({tasks.length})
                </CardTitle>
            </CardHeader>
            <CardContent ref={setNodeRef} className="flex-1 space-y-2">
                <SortableContext
                    items={tasks.map((t) => t.id)}
                    strategy={verticalListSortingStrategy}
                >
                    {tasks.map((task) => (
                        <KanbanCard key={task.id} task={task} />
                    ))}
                </SortableContext>
            </CardContent>
        </Card>
    );
}
