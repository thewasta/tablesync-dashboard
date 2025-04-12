"use server";
interface SubCategory {
  id: number;
  name: string;
  status?: string;
}

interface Category {
  id: number;
  name: string;
  status: string;
  sub_categories?: SubCategory[];
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

export type RetrieverResponse = {
  response: Category[];
};

const categories: Category[] = [
  {
    id: 1,
    name: "Category 1",
    status: "available",
    sub_categories: [
      {
        id: 1,
        name: "Sub Category 1",
        status: "available",
      },
    ],
  },
  {
    id: 2,
    name: "Category 2",
    status: "available",
  },
  {
    id: 3,
    name: "Category 3",
    status: "disabled",
    sub_categories: [
      {
        id: 2,
        name: "Sub Category 2",
        status: "available",
      },
    ],
  },
];

export async function retriever(): Promise<RetrieverResponse> {
  return Promise.resolve({
    response: categories,
  });
}

export async function add({
  subCategory,
  categoryId,
}: {
  subCategory: SubCategory;
  categoryId: number;
}): Promise<Category[]> {
  const categoryFound = categories.find((c) => c.id === categoryId);

  if (!categoryFound) {
    throw new Error("Category not found");
  }

  categoryFound.sub_categories?.push(subCategory);

  return Promise.resolve(categories);
}

export async function moveSubCategory({
  subCategory,
  categoryId,
}: {
  subCategory: SubCategory;
  categoryId: number;
}) {}
