import { useSortable } from "@dnd-kit/sortable";
import type { Task } from "@/types/Kanban";
import { CSS } from "@dnd-kit/utilities";

export default function KanbanCard({
    task,
    style,
}: {
    task: Task;
    isDragging?: boolean;
    style?: React.CSSProperties;
}) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging: isActuallyDragging,
    } = useSortable({ id: task.id });

    const dynamicStyle = {
        transform: CSS.Transform.toString(transform),
        transition: transition ?? "transform 200ms ease, opacity 200ms ease",
        opacity: isActuallyDragging ? 0.5 : 1,
        ...style,
    };

    return (
        <div
            ref={setNodeRef}
            style={dynamicStyle}
            {...attributes}
            {...listeners}
            className={`cursor-grab rounded-lg border bg-card p-4 active:cursor-grabbing ${
                isActuallyDragging ? "shadow-lg" : "hover:shadow-md"
            } transition-shadow`}
        >
            <h3 className="font-medium">{task.title}</h3>
        </div>
    );
}
