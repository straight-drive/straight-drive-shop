// src/components/store/StoreProductCard.jsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShoppingCart } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { useCart } from "../../context/CartContext";
import { cartService } from "../../services/cartService";

export default function StoreProductCard({ product }) {
  const { isAuthenticated } = useAuth();
  const { refreshCart } = useCart();
  const router = useRouter();
  const [isAdding, setIsAdding] = useState(false);
  const [isBuyingNow, setIsBuyingNow] = useState(false);
  const [error, setError] = useState("");

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
    setError("");
    setIsAdding(true);
    try {
      await cartService.addItem(product.id, 1);
      refreshCart();
    } catch (err) {
      setError(err?.data?.message || "Could not add to cart");
    } finally {
      setIsAdding(false);
    }
  };

  const handleBuyNow = async () => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
    setError("");
    setIsBuyingNow(true);
    try {
      await cartService.addItem(product.id, 1);
      refreshCart();
      router.push("/checkout");
    } catch (err) {
      setError(err?.data?.message || "Could not proceed to checkout");
    } finally {
      setIsBuyingNow(false);
    }
  };

  return (
    <div className="rounded-2xl overflow-hidden bg-navy-card border border-ink/10 flex flex-col">
      <div className="aspect-video bg-navy-deep overflow-hidden">
        {product.media?.[0]?.url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.media[0].url}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted text-sm">
            Photo / Video
          </div>
        )}
      </div>

      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-display text-lg font-semibold text-ink mb-2">
          {product.name}
        </h3>
        <p className="text-muted text-sm mb-4 flex-1">
          {product.shortDescription || product.description}
        </p>

        <div className="font-mono text-xl text-ink mb-4">
          ₹{Number(product.price).toFixed(2)}
        </div>

        {error && <p className="text-red-400 text-xs mb-3">{error}</p>}

        <div className="flex gap-3">
          <button
            onClick={handleAddToCart}
            disabled={isAdding || isBuyingNow || product.stock === 0}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-ink/20 text-ink text-sm font-display uppercase tracking-wide hover:border-cyan/50 hover:text-cyan transition-colors disabled:opacity-50"
          >
            <ShoppingCart size={16} />
            {isAdding ? "Adding..." : "Add to Cart"}
          </button>
          <button
            onClick={handleBuyNow}
            disabled={isAdding || isBuyingNow || product.stock === 0}
            className="flex-1 px-4 py-2.5 rounded-lg bg-gradient-to-r from-cyan to-green text-navy-deep text-sm font-display font-semibold uppercase tracking-wide disabled:opacity-50"
          >
            {isBuyingNow ? "Processing..." : product.stock === 0 ? "Out of Stock" : "Buy Now"}
          </button>
        </div>
      </div>
    </div>
  );
}