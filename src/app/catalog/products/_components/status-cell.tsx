import type { Selection } from "@heroui/react";

import {
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import { CellContext } from "@tanstack/react-table";
import { useMemo, useState } from "react";

export function StatusCell(props: CellContext<any, any>) {
  const [selectedKeys, setSelectedKeys] = useState<Selection>(
    new Set([props.row.original.status]),
  );

  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(", ").replace(/_/g, ""),
    [selectedKeys],
  );

  return (
    <Dropdown placement="bottom-start">
      <DropdownTrigger className="hover:cursor-pointer capitalize">
        <Chip color="success">{selectedValue}</Chip>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Estado de producto"
        selectedKeys={selectedKeys}
        selectionMode="single"
        onSelectionChange={setSelectedKeys}
      >
        <DropdownItem key="available">Disponible</DropdownItem>
        <DropdownItem key="discontinued">Inactivo</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
