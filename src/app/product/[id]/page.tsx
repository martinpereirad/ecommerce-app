"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getProductById } from "@/services/products";
import { useCartStore } from "@/store/cartStore";
import StarRating from "@/components/ui/StarRating";
import Spinner from "@/components/ui/Spinner";
import ProductImage from "@/components/ui/ProductImage";
import "./page.css";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const addItems = useCartStore((s) => s.addItems);
  const [quantity, setQuantity] = useState(1);

  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(Number(id)),
  });

  if (isLoading) return <Spinner />;

  if (isError || !product) {
    return (
      <div className="detail-error">
        <p>Producto no encontrado</p>
        <button className="detail__back-btn" onClick={() => router.back()}>
          ← Volver
        </button>
      </div>
    );
  }

  function handleAdd() {
    if (product) addItems(product, quantity);
  }

  return (
    <div className="detail">
      <button
        className="detail__back-btn"
        onClick={() => router.back()}
        data-testid="back-btn"
      >
        ← Volver
      </button>

      <div className="detail__content">
        <div className="detail__img-wrapper">
          <ProductImage
            className="detail__img"
            src={product.imagen}
            alt={product.titulo}
          />
        </div>

        <div className="detail__info">
          <span className="detail__category">{product.categoria}</span>
          <h1 className="detail__title">{product.titulo}</h1>
          <StarRating rating={product.rating} />
          <p className="detail__description">{product.descripcion}</p>
          <p className="detail__price">${product.precio.toFixed(2)}</p>

          <div className="detail__qty-wrapper">
            <button
              className="detail__qty-btn"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              aria-label="Reducir cantidad"
              disabled={quantity <= 1}
            >
              −
            </button>
            <span className="detail__qty-value">{quantity}</span>
            <button
              className="detail__qty-btn"
              onClick={() => setQuantity((q) => Math.min(99, q + 1))}
              aria-label="Aumentar cantidad"
              disabled={quantity >= 99}
            >
              +
            </button>
          </div>

          <button
            className="detail__add-btn"
            onClick={handleAdd}
            data-testid="add-to-cart"
          >
            Agregar {quantity > 1 ? `${quantity} ` : ""}al carrito
          </button>
        </div>
      </div>
    </div>
  );
}
