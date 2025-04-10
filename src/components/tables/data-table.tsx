import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Spinner,
  Pagination,
  Button,
} from "@heroui/react";
import { Dispatch, ReactNode, SetStateAction } from "react";
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnFiltersState,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import {
  ArrowDownNarrowWide,
  ArrowDownUp,
  ArrowUpNarrowWide,
} from "lucide-react";

interface DataTableProps<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];
  isLoading?: boolean;
  emptyContent?: ReactNode;
  ariaLabel?: string;
  filtering?: {
    columnFilter: ColumnFiltersState;
    setColumnFilter: Dispatch<SetStateAction<ColumnFiltersState>>;
  };
  pagination?: {
    size: number;
  };
}

export function GenericTable<TData>({
  columns,
  data,
  isLoading = false,
  emptyContent = "No rows to display.",
  ariaLabel = "Table",
  filtering,
  pagination,
}: DataTableProps<TData>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: filtering?.setColumnFilter,
    initialState: {
      pagination: {
        pageSize: pagination?.size || 15,
      },
    },
    state: {
      columnFilters: filtering?.columnFilter,
    },
  });

  return (
    <Table
      aria-label={ariaLabel}
      bottomContent={
        <div className="flex w-full justify-center">
          <Pagination
            isCompact
            showControls
            showShadow
            page={table.getState().pagination.pageIndex + 1}
            total={table.getPageCount()}
            onChange={(page) => table.setPageIndex(page - 1)}
          />
        </div>
      }
    >
      <TableHeader>
        {table.getHeaderGroups()[0].headers.map((header) => (
          <TableColumn
            key={header.id}
            aria-label={header.id}
            className="max-w-[100px]"
          >
            <div className="flex items-center">
              {header.column.getCanSort() && (
                <Button
                  isIconOnly
                  className="border-0 h-5"
                  variant="ghost"
                  onPress={header.column.getToggleSortingHandler()}
                >
                  <ArrowDownUp />
                </Button>
              )}
              {
                {
                  asc: <ArrowUpNarrowWide />,
                  desc: <ArrowDownNarrowWide />,
                }[header.column.getIsSorted() as string]
              }
              {header.isPlaceholder
                ? null
                : flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
            </div>
          </TableColumn>
        ))}
      </TableHeader>
      <TableBody
        emptyContent={emptyContent}
        isLoading={isLoading}
        items={data}
        loadingContent={<Spinner label="Loading..." />}
      >
        {table.getRowModel().rows.map((row) => (
          <TableRow key={row.id} aria-label={row.id}>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id} aria-label={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
