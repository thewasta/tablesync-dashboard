import React from "react";
import { useDraggable } from "@dnd-kit/core";

import StatusBadge from "./StatusBadge";
import { SubCategoryItemProps } from "./types";

const SubCategoryItem: React.FC<SubCategoryItemProps> = ({ subCategory }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: subCategory.id,
  });

  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="p-3 rounded-md shadow-sm flex items-center justify-between cursor-grab select-none"
      style={style}
    >
      <span className="font-medium">{subCategory.name}</span>
      <div className="flex items-center">
        <span className="text-xs mr-2">(Arrastrar para mover)</span>
        <StatusBadge status={subCategory.status || "available"} />
      </div>
    </div>
  );
};

export default SubCategoryItem;
