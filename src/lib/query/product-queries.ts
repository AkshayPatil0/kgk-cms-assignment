import { queryOptions } from "@tanstack/react-query";
import { fetchGet } from "../api";
import { ProductWithCategory, Product } from "@/services/product-service";

export const getProductsOptions = () =>
  queryOptions({
    queryKey: ["products"],
    queryFn: async () => fetchGet<ProductWithCategory[]>("/api/products"),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

export const getProductByIdOptions = (id: Product["id"]) =>
  queryOptions({
    queryKey: ["product", id],
    queryFn: async () => fetchGet<ProductWithCategory>(`/api/products/${id}`),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });


