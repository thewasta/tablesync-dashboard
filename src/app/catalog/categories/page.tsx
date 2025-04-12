"use client";

import { useMemo, useState } from "react";
import { Avatar, Button } from "@heroui/react";
import { Plus, PlusIcon, Tags } from "lucide-react";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
} from "@dnd-kit/core";
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import { DragStartEvent } from "@dnd-kit/core";
import { createPortal } from "react-dom";

import { Category, SubCategory } from "../_categories/types";

import CategoryCard from "./_component/category-card";
import SubCategoryCard from "./_component/sub-category-card";

const Categories: Category[] = [
  {
    id: "a17dfd46-a90b-4106-b5f3-4e182444e234",
    name: "Categoría 1",
    status: "available",
    image: "https://placehold.co/600x400",
    sub_categories: [
      {
        id: "79474dd1-c008-4b64-aa93-a35bb805be84",
        name: "Sample Sub 1",
      },
      {
        id: "63b36631-887b-4f0d-9a24-77a12f228fb5",
        name: "Sample sub 3",
      },
    ],
  },
  {
    id: "6764d8f8-a7c6-4c8d-9b25-e7e85719ea36",
    name: "Categoría 2",
    status: "available",
    image: "https://placehold.co/600x400",
    sub_categories: [
      {
        id: "00c88f4b-9578-4170-ba96-8a45c8831d60",
        name: "Sample sub 2",
      },
    ],
  },
  {
    id: "fd06d8e3-0f16-407d-b8c2-1e9158f70716",
    name: "Categoría 3",
    status: "available",
    image: "https://placehold.co/600x400",
    sub_categories: [],
  },
  {
    id: "6738fc44-36b8-403e-8727-40aedf1a24b2",
    name: "Categoría 4",
    status: "available",
    image: "https://placehold.co/600x400",
    sub_categories: [],
  },
];
const emptyCategories: Category[] = [];

export default function CategoriesPage() {
  const [initialCategories, setInitialCategories] =
    useState<Category[]>(Categories);

  const categoryIds = useMemo(
    () => initialCategories.map((c) => c.id),
    [initialCategories],
  );

  const [categoryInMove, setCategoryInMove] = useState<Category | null>(null);
  const [activeSubCategory, setActiveSubCategory] =
    useState<SubCategory | null>(null);

  return (
    <div className="flex flex-col gap-3">
      <section className="flex justify-between flex-col sm:flex-row">
        <h2 className="truncate text-xl font-medium tracking-wide">
          Gestión categorías
        </h2>
        <div className="space-x-4">
          <Button>
            <PlusIcon /> Crear Categoría
          </Button>
          <Button>
            <PlusIcon /> Crear SubCategoría
          </Button>
        </div>
      </section>
      {initialCategories.length > 0 && (
        <DndContext
          onDragEnd={onDragEnd}
          onDragOver={onDragOver}
          onDragStart={onDragStart}
        >
          <div className="flex flex-wrap gap-5 justify-center">
            <SortableContext
              id={"categories"}
              items={categoryIds}
              strategy={horizontalListSortingStrategy}
            >
              {initialCategories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </SortableContext>
            {createPortal(
              <DragOverlay>
                {categoryInMove && <CategoryCard category={categoryInMove} />}
                {activeSubCategory && (
                  <SubCategoryCard subCategory={activeSubCategory} />
                )}
              </DragOverlay>,
              document.body,
            )}
          </div>
        </DndContext>
      )}
      {initialCategories.length === 0 && (
        <section className="bg-primary/10 shadow-medium rounded-md p-4 flex flex-col items-center m-5">
          <div className="flex flex-col w-1/2 gap-5 items-center">
            <Avatar icon={<Tags />} size="lg" />
            <h4 className="font-medium truncate text-xl">No hay categorías</h4>
            <p className="font-thin">
              Comienza creando una nueva categoría para organizar tus productos
            </p>
            <Button>
              <Plus />
              Crear primer categoría
            </Button>
          </div>
        </section>
      )}
    </div>
  );

  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === "Category") {
      setCategoryInMove(event.active.data.current.category);

      return;
    }

    if (event.active.data.current?.type === "SubCategory") {
      setActiveSubCategory(event.active.data.current.subCategory);

      return;
    }
  }

  function onDragEnd(event: DragEndEvent) {
    setCategoryInMove(null);
    setActiveSubCategory(null);
    const { active, over } = event;

    if (!over) return;

    const activeType = active.data.current?.type;
    const overType = over.data.current?.type;

    if (activeType === "Category" && overType === "Category") {
      const activeCategoryId = active.id;
      const overCategoryId = over.id;

      if (activeCategoryId === overCategoryId) return;

      setInitialCategories((cat) => {
        const activeCategoryIndex = cat.findIndex(
          (c) => c.id === activeCategoryId,
        );
        const overCategoryIndex = cat.findIndex((c) => c.id === overCategoryId);

        return arrayMove(cat, activeCategoryIndex, overCategoryIndex);
      });
    }
    if (activeType === "SubCategory" && overType === "Category") {
      const activeSubCategory = active.data.current?.subCategory;
      const overCategory = over.data.current?.category;

      setInitialCategories((cat) => {
        let newCategories = [...cat];

        // Find the original category of the subcategory
        let originalCategoryIndex = -1;
        let originalSubCategoryIndex = -1;

        for (let i = 0; i < newCategories.length; i++) {
          const category = newCategories[i];
          const subIndex = category.sub_categories.findIndex(
            (sub) => sub.id === activeSubCategory.id,
          );

          if (subIndex !== -1) {
            originalCategoryIndex = i;
            originalSubCategoryIndex = subIndex;
            break;
          }
        }

        if (originalCategoryIndex !== -1 && originalSubCategoryIndex !== -1) {
          // Remove the subcategory from its original category
          newCategories[originalCategoryIndex].sub_categories.splice(
            originalSubCategoryIndex,
            1,
          );

          // Add the subcategory to the target category
          const overCategoryIndex = newCategories.findIndex(
            (c) => c.id === overCategory.id,
          );

          newCategories[overCategoryIndex].sub_categories.push(
            activeSubCategory,
          );

          return newCategories;
        }

        return cat;
      });
    }

    if (activeType === "SubCategory" && overType === "SubCategory") {
      const activeSubCategory = active.data.current?.subCategory;
      const overSubCategory = over.data.current?.subCategory;

      setInitialCategories((cat) => {
        let newCategories = [...cat];

        // Find the original category of the active subcategory
        let originalCategoryIndex = -1;
        let originalSubCategoryIndex = -1;

        for (let i = 0; i < newCategories.length; i++) {
          const category = newCategories[i];
          const subIndex = category.sub_categories.findIndex(
            (sub) => sub.id === activeSubCategory.id,
          );

          if (subIndex !== -1) {
            originalCategoryIndex = i;
            originalSubCategoryIndex = subIndex;
            break;
          }
        }

        // Find the target category of the over subcategory
        let targetCategoryIndex = -1;
        let targetSubCategoryIndex = -1;

        for (let i = 0; i < newCategories.length; i++) {
          const category = newCategories[i];
          const subIndex = category.sub_categories.findIndex(
            (sub) => sub.id === overSubCategory.id,
          );

          if (subIndex !== -1) {
            targetCategoryIndex = i;
            targetSubCategoryIndex = subIndex;
            break;
          }
        }

        if (
          originalCategoryIndex !== -1 &&
          originalSubCategoryIndex !== -1 &&
          targetCategoryIndex !== -1 &&
          targetSubCategoryIndex !== -1
        ) {
          // If the subcategories are in the same category, reorder them
          if (originalCategoryIndex === targetCategoryIndex) {
            newCategories[originalCategoryIndex].sub_categories = arrayMove(
              newCategories[originalCategoryIndex].sub_categories,
              originalSubCategoryIndex,
              targetSubCategoryIndex,
            );

            return newCategories;
          }
        }

        return cat;
      });
    }
  }

  function onDragOver(event: DragOverEvent) {
    const { active, over } = event;

    if (!over) return;

    // Dropping a SubCategory over a SubCategory

    // Dropping SubCategory over a Category
  }
}
