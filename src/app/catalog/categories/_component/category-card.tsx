import { Chip, Image } from "@heroui/react";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useMemo } from "react";

import { Category } from "../../_categories/types";

import SubCategoryCard from "./sub-category-card";

import StarFilledIcon from "@/components/icons/StarFilledIcon";
interface CategoryCardProps {
  category: Category;
}
export default function CategoryCard(props: CategoryCardProps) {
  const { category } = props;

  const subCategoriesIds = useMemo(
    () => category.sub_categories.map((sc) => sc.id),
    [category],
  );

  const {
    setNodeRef,
    listeners,
    attributes,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: category.id,
    data: {
      type: "Category",
      category,
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
        className="p-2 hover:cursor-grab rounded-lg bg-primary/60 shadow-medium col-span-1 opacity-10 border-2 border-primary h-[500px] max-h[525px] w-[300px]"
      />
    );
  }

  return (
    <div
      ref={setNodeRef}
      className="p-2 rounded-lg bg-content1 shadow-medium w-[300px] h-[500px] max-h[525px]"
      style={style}
    >
      <Image
        {...attributes}
        {...listeners}
        alt={category.name}
        className="object-cover cursor-grab"
        height={200}
        src={category.image}
      />
      <div className="flex gap-3 p-2 flex-col">
        <div className="flex justify-between">
          <div>
            <h4>{category.name}</h4>
            <Chip color="success">Activo</Chip>
          </div>
          <StarFilledIcon />
        </div>
        <div className="flex flex-col gap-4 overscroll-x-none">
          <SortableContext
            id={`subcategories-${category.id}`}
            items={subCategoriesIds}
            strategy={verticalListSortingStrategy}
          >
            {category.sub_categories.map((sub) => (
              <SubCategoryCard key={sub.id} subCategory={sub} />
            ))}
          </SortableContext>
        </div>
      </div>
    </div>
  );
}
