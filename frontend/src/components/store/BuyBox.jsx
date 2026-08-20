// src/components/store/BuyBox.jsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../hooks/useAuth";
import { useCart } from "../../context/CartContext";
import { cartService } from "../../services/cartService";

export default function BuyBox({ product }) {
  const { isAuthenticated } = useAuth();
  const { refreshCart } = useCart();
  const router = useRouter();
  const [qty, setQty] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [isBuying, setIsBuying] = useState(false);
  const [error, setError] = useState("");

  const handleAddToCart = async () => {
    if (!isAuthenticated) return router.push("/login");
    setError("");
    setIsAdding(true);
    try {
      await cartService.addItem(product.id, qty);
      refreshCart();
    } catch (err) {
      setError(err?.data?.message || "Could not add to cart");
    } finally {
      setIsAdding(false);
    }
  };

  const handleBuyNow = async () => {
    if (!isAuthenticated) return router.push("/login");
    setError("");
    setIsBuying(true);
    try {
      await cartService.addItem(product.id, qty);
      refreshCart();
      router.push("/checkout");
    } catch (err) {
      setError(err?.data?.message || "Could not proceed to checkout");
    } finally {
      setIsBuying(false);
    }
  };

  return (
    <div>
      <div className="flex items-baseline gap-3.5 mb-6">
        <span className="font-mono text-[34px] font-semibold text-ink">
          {product.price ? `₹${Number(product.price).toLocaleString("en-IN")}` : "₹ —"}
        </span>
        <span className="text-[13px] text-muted">
          {product.price ? "GST invoice at checkout" : "Price TBC · GST invoice at checkout"}
        </span>
      </div>

      {error && <p className="text-red-400 text-xs mb-3">{error}</p>}

      <div className="flex items-center gap-4">
        <div className="flex items-center border border-cyan/[0.16] rounded">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="px-3.5 py-2.5 text-ink hover:text-cyan transition-colors"
          >
            −
          </button>
          <span className="font-mono text-ink px-2 min-w-[24px] text-center">{qty}</span>
          <button
            onClick={() => setQty((q) => q + 1)}
            className="px-3.5 py-2.5 text-ink hover:text-cyan transition-colors"
          >
            +
          </button>
        </div>
        <button
          onClick={handleAddToCart}
          disabled={isAdding || isBuying}
          className="px-6 py-3 rounded bg-gradient-to-r from-cyan to-green text-navy-deep font-display font-semibold uppercase tracking-[0.08em] text-sm disabled:opacity-50"
        >
          {isAdding ? "Adding..." : "Add to cart"}
        </button>
        <button
          onClick={handleBuyNow}
          disabled={isAdding || isBuying}
          className="px-6 py-3 rounded border border-cyan/[0.16] text-ink font-display font-semibold uppercase tracking-[0.08em] text-sm hover:border-cyan/50 transition-colors disabled:opacity-50"
        >
          {isBuying ? "..." : "Buy now"}
        </button>
      </div>
    </div>
  );
}