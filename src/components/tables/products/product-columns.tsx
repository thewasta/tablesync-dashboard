import { Button, ButtonGroup, Image } from "@heroui/react";
import { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash } from "lucide-react";

import { StatusCell } from "@/app/catalog/products/_components/status-cell";

export const getProductColumns = (): ColumnDef<any>[] => [
  {
    id: "images",
    accessorKey: "images",
    header: "Imagen",
    cell: ({ row }) => {
      return <Image src={(row.getValue("images") as string[])[0]} width={45} />;
    },
  },
  {
    id: "title",
    accessorKey: "title",
    header: "Nombre",
    cell: ({ getValue }) => (
      <span className="block max-w-[150px] sm:max-w-[200px] md:max-w-[250px] whitespace-nowrap overflow-hidden text-ellipsis">
        {getValue() as string}
      </span>
    ),
  },
  {
    id: "description",
    accessorKey: "description",
    header: "Descripción",
    cell: ({ getValue }) => (
      <span className="block max-w-[300px] whitespace-nowrap overflow-hidden text-ellipsis">
        {getValue() as string}
      </span>
    ),
  },
  {
    id: "price",
    accessorKey: "price",
    header: () => (
      <button className="flex items-center gap-1">
        <span>Precio</span>
      </button>
    ),
  },
  {
    id: "status",
    header: "Estado",
    cell: StatusCell,
  },
  {
    id: "category",
    accessorKey: "category.name",
    header: "Categoría",
    cell: ({ getValue }) => (
      <span className="capitalize">{getValue() as string}</span>
    ),
    filterFn: (row, id, filterValue: string[]) => {
      // Si no hay categorías seleccionadas, mostrar todas las filas
      if (!filterValue || filterValue.length === 0) {
        return true;
      }

      // Verificar si el ID de la categoría del producto está en el array de categorías seleccionadas
      const categoryId = row.original.category.id.toString();

      return filterValue.includes(categoryId);
    },
  },
  {
    id: "actions",
    cell: () => {
      return (
        <ButtonGroup>
          <Button isIconOnly variant="ghost">
            <Pencil />
          </Button>
          <Button isIconOnly color="danger" variant="ghost">
            <Trash />
          </Button>
        </ButtonGroup>
      );
    },
    header: "Acción",
  },
];
