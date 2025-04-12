interface SubCategory {
  id: number | string;
  name: string;
  status?: string;
}

interface Category {
  id: number | string;
  name: string;
  image?: string;
  status: string;
  sub_categories: SubCategory[];
}

interface CategoryTableProps {
  categories: Category[];
  onAddSubCategory: (categoryId: number) => void;
}

interface CategoryRowProps {
  category: Category;
  isExpanded: boolean;
  toggleRow: (categoryId: number) => void;
  onAddSubCategory: (categoryId: number) => void;
}

interface SubCategoryItemProps {
  subCategory: SubCategory;
  categoryId: number;
}

interface StatusBadgeProps {
  status: string;
}

export type {
  SubCategory,
  Category,
  CategoryTableProps,
  CategoryRowProps,
  SubCategoryItemProps,
  StatusBadgeProps,
};
