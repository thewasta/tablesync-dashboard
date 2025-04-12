"use client";

import { useState } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";

import Column from "./column";

type ColumnId = "TODO" | "IN PROGRESS" | "DONE";
export interface Column {
  id: ColumnId;
  title: string;
}
const COLUMNS: Column[] = [
  {
    id: "TODO",
    title: "TO DO",
  },
  {
    id: "IN PROGRESS",
    title: "IN PROGRESS",
  },
  {
    id: "DONE",
    title: "DONE",
  },
];

export interface Task {
  id: number;
  title: string;
  status: ColumnId;
}
const INITIAL_TASK: Task[] = [
  {
    id: 1,
    title: "Sample",
    status: "TODO",
  },
  {
    id: 2,
    title: "Sample 2",
    status: "TODO",
  },
];

export default function CategoryPage() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASK);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id as number;
    const newStatus = over.id as Task["status"];

    setTasks(() =>
      tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: newStatus,
            }
          : task,
      ),
    );
  }

  return (
    <div className="p-4">
      <div className="flex gap-8">
        <DndContext onDragEnd={handleDragEnd}>
          {COLUMNS.map((col) => (
            <Column
              key={col.id}
              column={col}
              tasks={tasks.filter((task) => task.status === col.id)}
            />
          ))}
        </DndContext>
      </div>
    </div>
  );
}
