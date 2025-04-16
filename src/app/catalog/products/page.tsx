import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Metadata } from "next";

import ClientSidePage from "./_components/client";

import { productRetriever } from "@/actions/product.service";
import { retriever } from "@/actions/category.service";

export const metadata: Metadata = {
  title: "Productos",
};
export default async function ProductsPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["products"],
    queryFn: async () => productRetriever(),
  });

  await queryClient.prefetchQuery({
    queryKey: ["categories"],
    queryFn: async () => retriever(),
  });

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="truncate text-xl font-medium tracking-wide">
            Listado de Productos
          </h2>
        </div>
        {/*
          <div>
          <Button>
            <Plus /> Nuevo Producto
          </Button>
        </div>
          */}
      </div>
      <div className="flex">{/* Input type="search" />*/}</div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ClientSidePage />
      </HydrationBoundary>
    </div>
  );
}
