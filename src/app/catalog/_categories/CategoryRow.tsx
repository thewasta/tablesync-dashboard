import React from "react";
import { ChevronDown, ChevronUp, Folder, FolderOpen, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useDroppable } from "@dnd-kit/core";

import SubCategoryItem from "./SubCategoryItem";
import StatusBadge from "./StatusBadge";
import { CategoryRowProps } from "./types";

const CategoryRow: React.FC<CategoryRowProps> = ({
  category,
  isExpanded,
  toggleRow,
  onAddSubCategory,
}) => {
  const { setNodeRef: setDroppableRef } = useDroppable({
    id: category.id.toString(),
  });

  return (
    <React.Fragment key={category.id}>
      <tr
        ref={setDroppableRef}
        className="border-b cursor-pointer transition-colors"
        onClick={() => toggleRow(category.id)}
      >
        <td className="px-6 py-4 font-medium flex items-center">
          {isExpanded ? (
            <FolderOpen className="mr-2 text-success-50" size={18} />
          ) : (
            <Folder className="mr-2 text-success-50" size={18} />
          )}
          <span>{category.name}</span>

          <button
            className="ml-2 text-gray-400 hover:text-gray-600"
            onClick={(e) => {
              e.stopPropagation();
              toggleRow(category.id);
            }}
          >
            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </td>
        <td className="px-6 py-4">
          <StatusBadge status={category.status} />
        </td>
        <td className="px-6 py-4 text-right">
          <button
            className="ml-2 text-purple-600 hover:text-purple-800 p-1 rounded-full hover:bg-purple-50"
            title="Añadir subcategoría"
            onClick={(e) => {
              e.stopPropagation();
              onAddSubCategory(category.id);
            }}
          >
            <Plus size={18} />
          </button>
        </td>
      </tr>

      <tr className={isExpanded ? "" : "hidden"}>
        <td className="px-6 py-0" colSpan={3}>
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                animate={{
                  opacity: 1,
                  height: "auto",
                  padding: "8px 0",
                }}
                className="pl-8 border-l-2 border-green-200"
                exit={{ opacity: 0, height: 0, padding: 0 }}
                initial={{ opacity: 0, height: 0, padding: 0 }}
                transition={{ duration: 0.2 }}
              >
                {category.sub_categories &&
                category.sub_categories.length > 0 ? (
                  <div className="space-y-2">
                    {category.sub_categories.map((subCategory) => (
                      <SubCategoryItem
                        key={subCategory.id}
                        categoryId={category.id}
                        subCategory={subCategory}
                      />
                    ))}
                  </div>
                ) : (
                  <p className="text-s italic py-2">No existen subcategorías</p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </td>
      </tr>
    </React.Fragment>
  );
};

export default CategoryRow;
