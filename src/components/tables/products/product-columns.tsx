import { Button, ButtonGroup, Image } from "@heroui/react";
import { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash } from "lucide-react";

import { StatusCell } from "@/app/catalog/products/_components/status-cell";

export const getProductColumns = (): ColumnDef<any>[] => [
  {
    id: "image",
    accessorKey: "image",
    header: "Imagen",
    cell: ({ row }) => <Image src={row.original.images[0]} width={45} />,
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
  },
  {
    id: "actions",
    cell: ({ row }) => {
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
