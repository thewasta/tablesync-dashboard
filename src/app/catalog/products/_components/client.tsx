"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Chip, Input, Select, SelectItem } from "@heroui/react";
import { ColumnFiltersState } from "@tanstack/react-table";

import { productRetriever } from "@/actions/product.service";
import ProductTable from "@/components/tables/products/product-table";

export default function ClientSidePage() {
  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => await productRetriever(),
  });

  const [filter, setFilter] = useState<ColumnFiltersState>([]);

  const animals = data
    ? Array.from(
        new Map(
          data.map((product: any) => [product.category.id, product.category]),
        ).values(),
      ).map((category: any) => ({
        key: category.id.toString(),
        label: category.name,
      }))
    : [];

  return (
    <>
      <section className="flex items-center gap-2">
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
          items={animals || []}
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
        >
          {(animal) => (
            <SelectItem key={animal.key} className="capitalize">
              {animal.label}
            </SelectItem>
          )}
        </Select>
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
