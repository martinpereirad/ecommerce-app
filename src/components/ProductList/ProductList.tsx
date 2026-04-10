import ProductCard from "@/components/ProductCard/ProductCard";
import Spinner from "@/components/ui/Spinner";
import EmptyState from "@/components/ui/EmptyState";
import type { Product } from "@/types";
import "./ProductList.css";

interface ProductListProps {
  products: Product[];
  isLoading: boolean;
  isError: boolean;
}

export default function ProductList({
  products,
  isLoading,
  isError,
}: ProductListProps) {
  if (isLoading) return <Spinner />;

  if (isError) {
    return <EmptyState message="Error al cargar los productos" />;
  }

  if (products.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="product-list" data-testid="product-list">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
