import React, { useState } from "react";

import CategoryRow from "./CategoryRow";
import { CategoryTableProps } from "./types";

const CategoryTable: React.FC<CategoryTableProps> = ({
  categories,
  onAddSubCategory,
}) => {
  const [expandedRows, setExpandedRows] = useState<Record<number, boolean>>({});

  const toggleRow = (categoryId: number) => {
    setExpandedRows({
      ...expandedRows,
      [categoryId]: !expandedRows[categoryId],
    });
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="text-xs uppercase">
          <tr>
            <th className="px-6 py-3" scope="col">
              CATEGORÍA
            </th>
            <th className="px-6 py-3" scope="col">
              ESTADO
            </th>
            <th className="px-6 py-3 text-right" scope="col">
              ACCIONES
            </th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => {
            const isExpanded = expandedRows[category.id];

            return (
              <CategoryRow
                key={category.id}
                category={category}
                isExpanded={isExpanded}
                toggleRow={toggleRow}
                onAddSubCategory={onAddSubCategory}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryTable;
