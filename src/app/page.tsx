"use client";

import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import Filters from "@/components/Filters/Filters";
import ProductList from "@/components/ProductList/ProductList";
import { useProducts } from "@/hooks/useProducts";
import { getProducts } from "@/services/products";
import type { FilterState } from "@/types";
import "./page.css";

export default function HomePage() {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    category: "",
    maxPrice: 1300,
  });

  const { products, isLoading, isError } = useProducts(filters);

  const { data: allProducts } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const categories = useMemo(() => {
    if (!allProducts) return [];
    return [...new Set(allProducts.map((p) => p.categoria))];
  }, [allProducts]);

  return (
    <div className="home">
      <Filters
        filters={filters}
        onFilterChange={setFilters}
        categories={categories}
      />
      <ProductList
        products={products}
        isLoading={isLoading}
        isError={isError}
      />
    </div>
  );
}
