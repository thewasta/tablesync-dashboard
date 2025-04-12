import { EllipsisVertical, MoveVertical } from "lucide-react";
import { Button } from "@heroui/react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { SubCategory } from "../../_categories/types";

interface SubCategoryCardProps {
  subCategory: SubCategory;
}
export default function SubCategoryCard(props: SubCategoryCardProps) {
  const { subCategory } = props;

  const {
    setNodeRef,
    listeners,
    attributes,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: subCategory.id,
    data: {
      type: "SubCategory",
      subCategory,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        className="w-full h-[60px] rounded-md border-2 border-primary/10"
        style={style}
      />
    );
  }

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className="p-2 flex rounded-md justify-between items-center w-full bg-default/60 hover:cursor-grab"
      style={style}
    >
      <h6>{subCategory.name}</h6>
      <div className="flex items-center">
        <MoveVertical />
        <Button isIconOnly variant="ghost">
          <EllipsisVertical />
        </Button>
      </div>
    </div>
  );
}
