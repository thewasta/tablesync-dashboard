"use client";

import React from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { Card } from "@heroui/card";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addToast } from "@heroui/react";

import CategoryTable from "./CategoryTable";
import { SubCategory } from "./types";

import { add, retriever, RetrieverResponse } from "@/actions/category.service";

export default function CategoryPage() {
  const queryClient = useQueryClient();
  const { data: categories, error } = useQuery<RetrieverResponse>({
    queryKey: ["categories"],
    queryFn: async () => await retriever(),
  });

  const mutation = useMutation({
    mutationKey: ["create", "category"],
    mutationFn: add,
    onMutate: async (newSubCategory) => {
      await queryClient.cancelQueries({ queryKey: ["categories"] });

      const optimisticSubCategory = {
        ...newSubCategory.subCategory,
      };
      const prevCategories = queryClient.getQueryData<RetrieverResponse>([
        "categories",
      ]);

      if (prevCategories) {
        const updatedCategories = prevCategories.response.map((category) => {
          if (category.id === newSubCategory.categoryId) {
            return {
              ...category,
              sub_categories: [
                ...(category.sub_categories || []),
                optimisticSubCategory,
              ],
            };
          }

          return category;
        });

        queryClient.setQueryData(["categories"], {
          ...prevCategories,
          response: updatedCategories,
        });
      }

      return { prevCategories };
    },
    onSuccess: (props) => {
      addToast({
        title: "Sample",
        color: "success",
      });
    },
  });
  const handleAddSubCategory = (categoryId: number) => {
    // Lógica para añadir una subcategoría
    const newSubCategory: SubCategory = {
      id: Date.now(), // Usar timestamp como ID único
      name: `Nueva Subcategoría ${Date.now() % 1000}`,
      status: "available",
    };

    mutation.mutate({ subCategory: newSubCategory, categoryId });
  };

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    console.log({ active, over });
  }

  if (!categories || error) {
    return null;
  }

  return (
    <div className="flex flex-col gap-3 container">
      <h2 className="truncate text-xl font-medium tracking-wide">
        Gestión de Categorías
      </h2>
      <p className="text-gray-600">Administra tus categorías y subcategorías</p>
      <DndContext onDragEnd={handleDragEnd}>
        <Card className="w-full self-center">
          <CategoryTable
            categories={categories.response}
            onAddSubCategory={handleAddSubCategory}
          />
        </Card>
      </DndContext>
    </div>
  );
}
