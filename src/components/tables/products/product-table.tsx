"use client";

import { Dispatch, SetStateAction, useMemo } from "react";
import { ColumnFiltersState } from "@tanstack/react-table";

import { GenericTable } from "../data-table";

import { getProductColumns } from "./product-columns";

interface ProductTableProps {
  filter: ColumnFiltersState;
  setFilter: Dispatch<SetStateAction<ColumnFiltersState>>;
  products: [];
  isLoading: boolean;
}
export default function ProductTable({
  filter,
  setFilter,
  products,
  isLoading,
}: ProductTableProps) {
  const columns = useMemo(() => getProductColumns(), []);

  return (
    <GenericTable
      columns={columns}
      data={products || []}
      filtering={{
        columnFilter: filter,
        setColumnFilter: setFilter,
      }}
      isLoading={isLoading}
    />
  );
}
