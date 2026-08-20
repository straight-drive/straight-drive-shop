// src/components/store/ListingCard.jsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../../hooks/useAuth";
import { useCart } from "../../context/CartContext";
import { cartService } from "../../services/cartService";
import { productService } from "../../services/productService";

export default function ListingCard({ item }) {
  const { isAuthenticated } = useAuth();
  const { refreshCart } = useCart();
  const router = useRouter();
  const [qty, setQty] = useState(1);
  const [cartItemId, setCartItemId] = useState(null);
  const [inCart, setInCart] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const detailHref = `/${item.category}/${item.key}`;
  const hasVariants = Boolean(item.variants);

  const resolveProductId = async () => {
    const res = await productService.getBySlug(item.dbSlug);
    return res?.data?.id;
  };

  const handleAddToCart = async () => {
    if (!isAuthenticated) return router.push("/login");
    if (hasVariants) return router.push(detailHref);
    setBusy(true);
    setError("");
    try {
      const productId = await resolveProductId();
      if (!productId) throw new Error("Product not found for slug: " + item.dbSlug);
      await cartService.addItem(productId, 1);
      const cartRes = await cartService.getCart();
      const cartItem = (cartRes?.data?.items || []).find((i) => i.productId === productId);
      setQty(cartItem?.quantity || 1);
      setCartItemId(cartItem?.id || null);
      setInCart(true);
      refreshCart();
    } catch (err) {
      console.error("Add to cart failed:", err);
      setError(err?.message || err?.data?.message || "Something went wrong");
    } finally {
      setBusy(false);
    }
  };

  const handleQtyChange = async (delta) => {
    if (!cartItemId) return;
    const nextQty = qty + delta;
    setBusy(true);
    try {
      if (nextQty < 1) {
        await cartService.removeItem(cartItemId);
        setInCart(false);
        setCartItemId(null);
        setQty(1);
      } else {
        await cartService.updateItem(cartItemId, nextQty);
        setQty(nextQty);
      }
      refreshCart();
    } finally {
      setBusy(false);
    }
  };

  const handleBuyNow = async () => {
    if (!isAuthenticated) return router.push("/login");
    if (hasVariants) return router.push(detailHref);
    setBusy(true);
    try {
      if (!inCart) {
        const productId = await resolveProductId();
        if (!productId) throw new Error("Product not found");
        await cartService.addItem(productId, qty);
        refreshCart();
      }
      router.push("/checkout");
    } catch {
      router.push(detailHref);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="rounded-xl border border-cyan/[0.16] bg-navy-card overflow-hidden flex flex-col">
     {item.comingSoon ? (
        <div className="aspect-video relative overflow-hidden bg-navy-deep">
          {item.cardPhoto ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
             <img
                src={item.cardPhoto}
                alt={item.name}
                className="w-full h-full object-contain opacity-60"
              />
              <span className="absolute top-3 left-3 font-display font-bold text-[10px] tracking-[0.18em] uppercase bg-navy-deep/80 text-muted border border-muted/30 rounded-[3px] px-2.5 py-[3px]">
                Coming Soon
              </span>
            </>
          ) : (
            <span className="absolute inset-0 flex items-center justify-center text-muted text-[11px] font-display font-semibold uppercase tracking-[0.2em]">
              {item.photo}
            </span>
          )}
        </div>
      ) : (
      <Link href={detailHref}>
          <div className="aspect-video overflow-hidden bg-navy-deep">
            {item.cardPhoto ? (
              // eslint-disable-next-line @next/next/no-img-element
             <img
                src={item.cardPhoto}
                alt={item.name}
                className={`w-full h-full ${
                  item.cardFit === "contain" ? "object-contain" : "object-cover"
                }`}
              />
            ) : (
              <div
                className="w-full h-full flex items-center justify-center text-muted text-[11px] font-display font-semibold uppercase tracking-[0.2em]"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(-45deg, rgba(255,255,255,.03) 0 12px, transparent 12px 24px), linear-gradient(160deg, #12294a, #0A192F)",
                }}
              >
                {item.photo}
              </div>
            )}
          </div>
        </Link>
      )}

      <div className="p-6 flex flex-col flex-1 gap-3">
        {item.comingSoon ? (
          <h3 className="text-[22px] font-bold text-muted">{item.name}</h3>
        ) : (
          <Link href={detailHref}>
            <h3 className="text-[22px] font-bold text-ink hover:text-cyan transition-colors">
              {item.name}
            </h3>
          </Link>
        )}

        {item.desc ? <p className="text-[14.5px] text-muted">{item.desc}</p> : null}

        {item.comingSoon ? (
          <span className="mt-auto text-center px-4 py-2.5 rounded border border-muted/20 text-muted font-display font-semibold uppercase tracking-[0.08em] text-sm">
            Coming Soon
          </span>
        ) : item.purchasable === false ? (
          <Link
            href={detailHref}
            className="mt-auto font-display font-semibold uppercase tracking-[0.1em] text-sm text-cyan hover:text-ink transition-colors"
          >
            Explore more →
          </Link>
        ) : hasVariants ? (
          <Link
            href={detailHref}
            className="mt-auto text-center px-4 py-2.5 rounded bg-gradient-to-r from-cyan to-green text-navy-deep font-display font-semibold uppercase tracking-[0.08em] text-sm"
          >
            Choose a pack →
          </Link>
        ) : (
          <div className="mt-auto flex items-center gap-3">
            {inCart ? (
              <div className="flex items-center border border-cyan/[0.16] rounded">
                <button
                  onClick={() => handleQtyChange(-1)}
                  disabled={busy}
                  className="px-3 py-2 text-ink hover:text-cyan disabled:opacity-50"
                >
                  −
                </button>
                <span className="font-mono text-ink px-2 min-w-[20px] text-center text-sm">
                  {qty}
                </span>
                <button
                  onClick={() => handleQtyChange(1)}
                  disabled={busy}
                  className="px-3 py-2 text-ink hover:text-cyan disabled:opacity-50"
                >
                  +
                </button>
              </div>
            ) : (
              <button
                onClick={handleAddToCart}
                disabled={busy}
                className="flex-1 px-3 py-2.5 rounded border border-cyan/[0.16] text-ink text-xs font-display font-semibold uppercase tracking-wide hover:border-cyan/50 transition-colors disabled:opacity-50"
              >
                {busy ? "Adding..." : "Add to Cart"}
              </button>
            )}
            <button
              onClick={handleBuyNow}
              disabled={busy}
              className="flex-1 px-3 py-2.5 rounded bg-gradient-to-r from-cyan to-green text-navy-deep text-xs font-display font-semibold uppercase tracking-wide disabled:opacity-50"
            >
              Buy Now
            </button>
          </div>
        )}

        {error ? <p className="text-red-400 text-[11px]">{error}</p> : null}
      </div>
    </div>
  );
}