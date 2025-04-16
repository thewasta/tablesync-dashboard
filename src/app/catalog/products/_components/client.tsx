"use client";
import { Button, type Selection } from "@heroui/react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Chip, Input, Select, SelectItem } from "@heroui/react";
import { ColumnFiltersState } from "@tanstack/react-table";
import { Plus } from "lucide-react";

import { productRetriever } from "@/actions/product.service";
import ProductTable from "@/components/tables/products/product-table";
import { retriever } from "@/actions/category.service";

export default function ClientSidePage() {
  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => productRetriever(),
  });

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: () => retriever(),
  });

  const [filter, setFilter] = useState<ColumnFiltersState>([]);

  const handleCategoryChange = (selection: Selection) => {
    const keys = Array.from(selection);

    setFilter((prev) => {
      const rest = prev.filter((f) => f.id !== "category");

      if (keys.length === 0) return rest;

      return [
        ...rest,
        {
          id: "category",
          value: keys,
        },
      ];
    });
  };

  if (!categories) {
    return null;
  }

  return (
    <>
      <section className="flex justify-between">
        <div className="flex w-1/2 gap-3 items-center">
          <Input
            className="w-1/3"
            label="Buscar..."
            labelPlacement="outside"
            onChange={(e) =>
              setFilter((prev) =>
                prev
                  .filter((filter) => filter.id !== "title")
                  .concat({
                    id: "title",
                    value: e.target.value,
                  }),
              )
            }
          />
          <Select
            className="max-w-xs selection-multiple"
            classNames={{
              base: "max-w-xs",
              trigger: "min-h-12 py-2",
            }}
            isLoading={isLoading}
            isMultiline={true}
            items={categories.response}
            label="Categoría"
            labelPlacement="outside"
            placeholder="Seleccionar categoría"
            renderValue={(items) => {
              return (
                <div className="flex flex-wrap gap-2">
                  {items.map((item) => (
                    <Chip key={item.key}>{item.textValue}</Chip>
                  ))}
                </div>
              );
            }}
            selectionMode="multiple"
            onSelectionChange={handleCategoryChange}
          >
            {(category) => (
              <SelectItem key={category.id} className="capitalize">
                {category.name}
              </SelectItem>
            )}
          </Select>
        </div>
        <Button color="primary">
          <Plus /> Crear Producto
        </Button>
      </section>
      <ProductTable
        filter={filter}
        isLoading={isLoading}
        products={data}
        setFilter={setFilter}
      />
    </>
  );
}
