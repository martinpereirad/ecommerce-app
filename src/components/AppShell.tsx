"use client";

import { useState, type ReactNode } from "react";
import Header from "@/components/Header/Header";
import CartDrawer from "@/components/CartDrawer/CartDrawer";

export default function AppShell({ children }: { children: ReactNode }) {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <>
      <Header onCartClick={() => setCartOpen(true)} />
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      <main>{children}</main>
    </>
  );
}
