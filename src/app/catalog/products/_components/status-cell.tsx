import type { Selection } from "@heroui/react";

import {
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import { useMemo, useState } from "react";

export function StatusCell() {
  const [selectedKeys, setSelectedKeys] = useState<Selection>(
    new Set(["available"]),
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
