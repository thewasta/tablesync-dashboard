"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@heroui/react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
interface TableProductProps {
  data: any;
  columns: any;
}
export function TableProduct({ data, columns }: TableProductProps) {
  const table = useReactTable({
    data: data,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((hGroup) => (
          <TableRow key={hGroup.id}>
            {hGroup.headers.map((header) => (
              <TableCell key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {data &&
          table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}
