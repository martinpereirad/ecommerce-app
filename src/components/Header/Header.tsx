"use client";

import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { useIsHydrated } from "@/hooks/useIsHydrated";
import "./Header.css";

interface HeaderProps {
  onCartClick: () => void;
}

export default function Header({ onCartClick }: HeaderProps) {
  const items = useCartStore((s) => s.items);
  const hydrated = useIsHydrated();
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="header">
      <div className="header__inner">
        <Link href="/" className="header__logo">
          TiendaOnline
        </Link>
        <button
          className="header__cart-btn"
          onClick={onCartClick}
          aria-label="Abrir carrito"
        >
          <svg
            className="header__cart-icon"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          {hydrated && totalItems > 0 && (
            <span className="header__badge" data-testid="cart-badge">
              {totalItems}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
