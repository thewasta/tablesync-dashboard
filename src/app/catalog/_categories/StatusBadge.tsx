import { Check, X } from "lucide-react";
import React from "react";
import { Chip } from "@heroui/react";

import { StatusBadgeProps } from "./types";

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  if (status === "available") {
    return (
      <Chip color="success" startContent={<Check size={12} />}>
        <span>Disponible</span>
      </Chip>
    );
  }

  return (
    <Chip color="danger" startContent={<X size={12} />}>
      Desactivado
    </Chip>
  );
};

export default StatusBadge;
