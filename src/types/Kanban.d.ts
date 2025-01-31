export type Task = {
    id: string;
    title: string;
    columnId: ColumnType;
};

export type Column = {
    id: ColumnType;
    title: string;
    tasks: Task[];
};

export type ColumnType = "todo" | "inProgress" | "done";
