import { Card, CardHeader } from "@heroui/card";
import { useDroppable } from "@dnd-kit/core";

import { Column as ColumnType, Task } from "./page";
import TaskCard from "./task-card";

type ColumnProps = {
  column: ColumnType;
  tasks: Task[];
};

export default function Column({ column, tasks }: ColumnProps) {
  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  return (
    <Card>
      <CardHeader>{column.title}</CardHeader>
      <div ref={setNodeRef} className="p-4 flex flex-1 flex-col gap-4">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </Card>
  );
}
