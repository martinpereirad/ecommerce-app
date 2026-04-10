"use client";

import { useState } from "react";

const FALLBACK =
  "https://placehold.co/400x400/f0f0f0/999999?text=Imagen+no+disponible";

interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function ProductImage({ src, alt, className }: ProductImageProps) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      onError={() => setImgSrc(FALLBACK)}
    />
  );
}
