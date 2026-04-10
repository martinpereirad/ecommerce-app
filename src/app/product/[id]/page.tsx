"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getProductById } from "@/services/products";
import { useCartStore } from "@/store/cartStore";
import StarRating from "@/components/ui/StarRating";
import Spinner from "@/components/ui/Spinner";
import "./page.css";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const addItem = useCartStore((s) => s.addItem);

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
          <img
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
          <button
            className="detail__add-btn"
            onClick={() => addItem(product)}
            data-testid="add-to-cart"
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
}
