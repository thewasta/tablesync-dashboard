"use server";

import { fetchApi } from "@/lib/api";

export async function productRetriever() {
  const { data, error } = await fetchApi("get", "/products");

  if (error) {
    throw new Error("Error");
  }

  return data;
}
