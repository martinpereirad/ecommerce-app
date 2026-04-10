import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/services/products";
import type { FilterState, Product } from "@/types";

export function useProducts(filters: FilterState) {
  const { data, isLoading, isError } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const filtered = useMemo(() => {
    if (!data) return [];
    return data.filter(
      (p) =>
        p.titulo.toLowerCase().includes(filters.search.toLowerCase()) &&
        (filters.category === "" || p.categoria === filters.category) &&
        p.precio <= filters.maxPrice
    );
  }, [data, filters]);

  return { products: filtered, isLoading, isError };
}
