"use client";

import Link from "next/link";
import { useFavStore } from "@/store/favStore";
import { useIsHydrated } from "@/hooks/useIsHydrated";
import StarRating from "@/components/ui/StarRating";
import type { Product } from "@/types";
import "./ProductCard.css";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const toggleFavorite = useFavStore((s) => s.toggleFavorite);
  const favorites = useFavStore((s) => s.favorites);
  const hydrated = useIsHydrated();
  const isFav = hydrated && favorites.includes(product.id);

  return (
    <article className="product-card" data-testid="product-card">
      <div className="product-card__img-wrapper">
        <img
          className="product-card__img"
          src={product.imagen}
          alt={product.titulo}
        />
        <button
          className={`product-card__fav ${isFav ? "product-card__fav--active" : ""}`}
          onClick={() => toggleFavorite(product.id)}
          aria-label={isFav ? "Quitar de favoritos" : "Agregar a favoritos"}
        >
          {isFav ? "♥" : "♡"}
        </button>
      </div>
      <div className="product-card__body">
        <h3 className="product-card__title">{product.titulo}</h3>
        <div className="product-card__meta">
          <span className="product-card__price">
            ${product.precio.toFixed(2)}
          </span>
          <StarRating rating={product.rating} />
        </div>
        <Link
          href={`/product/${product.id}`}
          className="product-card__link"
          data-testid="product-link"
        >
          Ver detalle
        </Link>
      </div>
    </article>
  );
}
