"use client";

import { useCartStore } from "@/store/cartStore";
import { useIsHydrated } from "@/hooks/useIsHydrated";
import "./CartDrawer.css";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, removeItem, updateQuantity, clearCart } = useCartStore();
  const hydrated = useIsHydrated();

  const total = items.reduce(
    (sum, item) => sum + item.precio * item.quantity,
    0
  );

  if (!hydrated) return null;

  return (
    <>
      <div
        className={`drawer-overlay ${isOpen ? "drawer-overlay--visible" : ""}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        className={`drawer ${isOpen ? "drawer--open" : ""}`}
        aria-label="Carrito de compras"
        data-testid="cart-drawer"
      >
        <div className="drawer__header">
          <h2 className="drawer__title">Carrito</h2>
          <button className="drawer__close" onClick={onClose} aria-label="Cerrar carrito">
            &times;
          </button>
        </div>

        <div className="drawer__body">
          {items.length === 0 ? (
            <p className="drawer__empty" data-testid="cart-empty">
              Tu carrito está vacío
            </p>
          ) : (
            <ul className="drawer__list">
              {items.map((item) => (
                <li key={item.id} className="drawer__item" data-testid="cart-item">
                  <img
                    className="drawer__item-img"
                    src={item.imagen}
                    alt={item.titulo}
                  />
                  <div className="drawer__item-info">
                    <p className="drawer__item-name">{item.titulo}</p>
                    <p className="drawer__item-price">
                      ${item.precio.toFixed(2)}
                    </p>
                    <div className="drawer__qty-controls">
                      <button
                        className="drawer__qty-btn"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        aria-label="Reducir cantidad"
                      >
                        &minus;
                      </button>
                      <span className="drawer__qty-value">{item.quantity}</span>
                      <button
                        className="drawer__qty-btn"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        aria-label="Aumentar cantidad"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    className="drawer__remove-btn"
                    onClick={() => removeItem(item.id)}
                    aria-label={`Eliminar ${item.titulo}`}
                    data-testid="remove-item"
                  >
                    &times;
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="drawer__footer">
            <div className="drawer__total">
              <span>Total</span>
              <span className="drawer__total-value">
                ${total.toFixed(2)}
              </span>
            </div>
            <button className="drawer__clear-btn" onClick={clearCart}>
              Vaciar carrito
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
