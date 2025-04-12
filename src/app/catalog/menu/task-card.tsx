import { Card, CardBody } from "@heroui/card";
import { useDraggable } from "@dnd-kit/core";

import { Task } from "./page";

interface TaskCardProps {
  task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
      }
    : undefined;

  return (
    <Card
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="cursor-grab select-none"
      style={style}
    >
      <CardBody>{task.title}</CardBody>
    </Card>
  );
}
