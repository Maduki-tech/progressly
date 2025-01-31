"use client";
import {
    DndContext,
    type DragEndEvent,
    DragOverlay,
    type DragStartEvent,
    MouseSensor,
    TouchSensor,
    useSensor,
    useSensors,
    closestCorners,
    defaultDropAnimation,
    type DragOverEvent,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import KanbanColumn from "./KanbanColumn";
import KanbanCard from "./KanbanCard";
import type { Column, Task } from "@/types/Kanban";
import { Input } from "../ui/input";
const DEFAULT_COLUMNS: Column[] = [
    {
        id: "todo",
        title: "To Do",
        tasks: [
            { id: "1", title: "Design homepage", columnId: "todo" },
            { id: "2", title: "Create API docs", columnId: "todo" },
        ],
    },
    {
        id: "inProgress",
        title: "In Progress",
        tasks: [{ id: "3", title: "Implement auth", columnId: "inProgress" }],
    },
    {
        id: "done",
        title: "Done",
        tasks: [{ id: "4", title: "Setup CI/CD", columnId: "done" }],
    },
];
export function KanbanBoard() {
    // Data objects

    const [columns, setColumns] = useState<Column[]>(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("kanban-state");
            return saved ? JSON.parse(saved) : DEFAULT_COLUMNS;
        }
        return DEFAULT_COLUMNS;
    });
    const [isAddingTask, setIsAddingTask] = useState(false);
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [activeTask, setActiveTask] = useState<Task | null>(null);
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        localStorage.setItem("kanban-state", JSON.stringify(columns));
    }, [columns]);

    const sensors = useSensors(
        useSensor(MouseSensor, {
            activationConstraint: {
                distance: 5,
            },
        }),
        useSensor(TouchSensor, {
            activationConstraint: {
                delay: 250,
                tolerance: 5,
            },
        }),
    );

    useEffect(() => {
        setHasMounted(true);
    }, []);

    /**
    Find the Drag element by its id in the DragStartEvent
    if there is any task which matches then put it in the setActiveTask
    **/
    function handleDragStart(event: DragStartEvent) {
        const task = columns
            .flatMap((col) => col.tasks)
            .find((task) => task.id === event.active.id);
        if (task) setActiveTask(task);
    }

    function handleDragOver(event: DragOverEvent) {
        const { active, over } = event;
        if (!over) return;

        // Look into columns and get active column
        const activeColumn = columns.find((col) =>
            col.tasks.some((task) => task.id === active.id),
        );
        // look in over object and find out the column
        const overColumn = columns.find(
            (col) =>
                col.tasks.some((task) => task.id === over.id) ||
                col.id === over.id,
        );

        if (!activeColumn || !overColumn) return;

        if (activeColumn.id !== overColumn.id) {
            setColumns((prev) => {
                const activeTasks = activeColumn.tasks;
                const overTasks = overColumn.tasks;
                const activeIndex = activeTasks.findIndex(
                    (t) => t.id === active.id,
                );
                const overIndex =
                    over.id === overColumn.id
                        ? overTasks.length
                        : overTasks.findIndex((t) => t.id === over.id);

                const newActiveTasks = [...activeTasks];
                const [removed] = newActiveTasks.splice(activeIndex, 1);
                if (removed === undefined) {
                    return prev;
                }
                removed.columnId = overColumn.id;

                const newOverTasks = [...overTasks];
                newOverTasks.splice(overIndex, 0, removed);

                return prev.map((col) => {
                    if (col.id === activeColumn.id)
                        return { ...col, tasks: newActiveTasks };
                    if (col.id === overColumn.id)
                        return { ...col, tasks: newOverTasks };
                    return col;
                });
            });
        }
    }

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;
        if (!over) return;

        const activeColumn = columns.find((col) =>
            col.tasks.some((task) => task.id === active.id),
        );
        const overColumn = columns.find((col) =>
            col.tasks.some((task) => task.id === over.id),
        );

        if (!activeColumn || !overColumn || activeColumn.id !== overColumn.id)
            return;

        const oldIndex = activeColumn.tasks.findIndex(
            (t) => t.id === active.id,
        );
        const newIndex = overColumn.tasks.findIndex((t) => t.id === over.id);

        setColumns((prev) =>
            prev.map((col) => {
                if (col.id === activeColumn.id) {
                    return {
                        ...col,
                        tasks: arrayMove(col.tasks, oldIndex, newIndex),
                    };
                }
                return col;
            }),
        );
    }

    const handleAddTask = () => {
        if (!newTaskTitle.trim()) return;

        const newTask: Task = {
            id: Date.now().toString(),
            title: newTaskTitle,
            columnId: "todo",
        };

        setColumns((prev) =>
            prev.map((col) =>
                col.id === "todo"
                    ? { ...col, tasks: [newTask, ...col.tasks] }
                    : col,
            ),
        );

        setNewTaskTitle("");
        setIsAddingTask(false);
    };

    return (
        <div className="p-4">
            <div className="mb-4 flex items-center justify-between">
                <h1 className="text-2xl font-bold">Project Board</h1>
                <div className="flex gap-2">
                    {isAddingTask ? (
                        <>
                            <Input
                                autoFocus
                                value={newTaskTitle}
                                onChange={(e) =>
                                    setNewTaskTitle(e.target.value)
                                }
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") handleAddTask();
                                }}
                                placeholder="Enter task Title"
                                className="w-48"
                            />
                            <Button onClick={handleAddTask}>Add</Button>
                            <Button
                                variant={"outline"}
                                onClick={() => setIsAddingTask(false)}
                            >
                                Cancel
                            </Button>
                        </>
                    ) : (
                        <Button onClick={() => setIsAddingTask(true)}>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Task
                        </Button>
                    )}
                </div>
            </div>

            <DndContext
                sensors={sensors}
                collisionDetection={closestCorners}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDragEnd={handleDragEnd}
            >
                <div className="flex gap-4 overflow-x-auto pb-4">
                    {columns.map((column) => (
                        <KanbanColumn
                            key={column.id}
                            column={column}
                            tasks={column.tasks}
                        />
                    ))}
                </div>

                {hasMounted &&
                    createPortal(
                        <DragOverlay
                            adjustScale={false}
                            dropAnimation={defaultDropAnimation}
                        >
                            {activeTask && (
                                <KanbanCard
                                    task={activeTask}
                                    isDragging
                                    style={{
                                        cursor: "grabbing",
                                        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                                        transform: "rotate(3deg)",
                                    }}
                                />
                            )}
                        </DragOverlay>,
                        document.body,
                    )}
            </DndContext>
        </div>
    );
}
