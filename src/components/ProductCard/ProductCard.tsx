"use client";

import { useState } from "react";
import Link from "next/link";
import { useFavStore } from "@/store/favStore";
import { useCartStore } from "@/store/cartStore";
import { useIsHydrated } from "@/hooks/useIsHydrated";
import StarRating from "@/components/ui/StarRating";
import ProductImage from "@/components/ui/ProductImage";
import type { Product } from "@/types";
import "./ProductCard.css";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const toggleFavorite = useFavStore((s) => s.toggleFavorite);
  const favorites = useFavStore((s) => s.favorites);
  const addItem = useCartStore((s) => s.addItem);
  const hydrated = useIsHydrated();
  const isFav = hydrated && favorites.includes(product.id);
  const [added, setAdded] = useState(false);

  function handleAddToCart() {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1000);
  }

  return (
    <article className="product-card" data-testid="product-card">
      <div className="product-card__img-wrapper">
        <ProductImage
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
        <div className="product-card__actions">
          <Link
            href={`/product/${product.id}`}
            className="product-card__link"
            data-testid="product-link"
          >
            Ver detalle
          </Link>
          <button
            className={`product-card__cart-btn ${added ? "product-card__cart-btn--added" : ""}`}
            onClick={handleAddToCart}
            aria-label="Agregar al carrito"
            data-testid="add-to-cart-card"
          >
            {added ? (
              "✓"
            ) : (
              <>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
                <span className="product-card__cart-badge" aria-hidden="true">+</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
