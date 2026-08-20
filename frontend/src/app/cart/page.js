// src/app/cart/page.js
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { useCart } from "../../context/CartContext";
import { cartService } from "../../services/cartService";
import GradientText from "../../components/ui/GradientText";

export default function CartPage() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { refreshCart } = useCart();
  const router = useRouter();

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [busyId, setBusyId] = useState(null);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [authLoading, isAuthenticated, router]);

  useEffect(() => {
    if (!isAuthenticated) return;
    cartService
      .getCart()
      .then((res) => setItems(res?.data?.items || []))
      .catch(() => setItems([]))
      .finally(() => setIsLoading(false));
  }, [isAuthenticated]);

  const updateQty = async (itemId, qty) => {
    if (qty < 1) return;
    setBusyId(itemId);
    try {
      await cartService.updateItem(itemId, qty);
      setItems((prev) => prev.map((i) => (i.id === itemId ? { ...i, quantity: qty } : i)));
      refreshCart();
    } finally {
      setBusyId(null);
    }
  };

  const removeItem = async (itemId) => {
    setBusyId(itemId);
    try {
      await cartService.removeItem(itemId);
      setItems((prev) => prev.filter((i) => i.id !== itemId));
      refreshCart();
    } finally {
      setBusyId(null);
    }
  };

  const subtotal = items.reduce(
    (sum, i) => sum + Number(i.product?.price || 0) * i.quantity,
    0
  );

  if (authLoading || isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-muted">Loading...</p>
      </div>
    );
  }

  return (
    <section className="max-w-[1000px] mx-auto px-6 py-16">
      <h1 className="font-display font-bold text-ink text-[clamp(28px,3.6vw,40px)] mb-10">
        Your <GradientText>Cart.</GradientText>
      </h1>

      {items.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-muted mb-6">Your cart is empty.</p>
          <Link
          href="/performance-training"
            className="inline-block px-6 py-3 rounded bg-gradient-to-r from-cyan to-green text-navy-deep font-display font-semibold uppercase tracking-wide text-sm"
          >
            Browse the store
          </Link>
        </div>
      ) : (
        <>
          <div className="space-y-4 mb-10">
            {items.map((item) => (
             <div
                key={item.id}
                className="rounded-xl border border-cyan/[0.16] bg-navy-card p-4 sm:p-5"
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg shrink-0"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(-45deg, rgba(255,255,255,.03) 0 12px, transparent 12px 24px), linear-gradient(160deg, #12294a, #0A192F)",
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display font-semibold text-ink text-sm sm:text-base">
                      {item.product?.name}
                    </h3>
                    <span className="font-mono text-sm text-cyan">
                      {"\u20B9"}
                      {Number(item.product?.price || 0).toLocaleString("en-IN")}
                    </span>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    disabled={busyId === item.id}
                    className="text-muted hover:text-red-400 transition-colors shrink-0"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <div className="flex items-center justify-between gap-4 mt-4 pt-4 border-t border-cyan/[0.09]">
                  <div className="flex items-center border border-cyan/[0.16] rounded">
                    <button
                      onClick={() => updateQty(item.id, item.quantity - 1)}
                      disabled={busyId === item.id}
                      className="px-3 py-2 text-ink hover:text-cyan disabled:opacity-50"
                    >
                      −
                    </button>
                    <span className="font-mono text-ink px-3 min-w-[28px] text-center text-sm">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQty(item.id, item.quantity + 1)}
                      disabled={busyId === item.id}
                      className="px-3 py-2 text-ink hover:text-cyan disabled:opacity-50"
                    >
                      +
                    </button>
                  </div>
                  <span className="font-mono text-ink">
                    {"\u20B9"}
                    {(Number(item.product?.price || 0) * item.quantity).toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
            ))}
          </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 border-t border-cyan/[0.16] pt-6">
            <div>
              <span className="text-muted text-sm block">Subtotal</span>
              <span className="font-mono text-2xl font-semibold text-ink">
                {"\u20B9"}
                {subtotal.toLocaleString("en-IN")}
              </span>
            </div>
            <Link
              href="/checkout"
              className="px-8 py-3.5 rounded bg-gradient-to-r from-cyan to-green text-navy-deep font-display font-semibold uppercase tracking-wide text-sm text-center"
            >
              Proceed to Checkout
            </Link>
          </div>
        </>
      )}
    </section>
  );
}