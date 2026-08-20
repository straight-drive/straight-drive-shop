"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../hooks/useAuth";
import { useCart } from "../../context/CartContext";
import { cartService } from "../../services/cartService";
import { productService } from "../../services/productService";
import BallVariantSelector from "./BallVariantSelector";

export default function BuyPanel({ catalogItem, externalSelection, hideSelector = false }) {
  const { isAuthenticated } = useAuth();
  const { refreshCart } = useCart();
  const router = useRouter();

  const hasVariants = Boolean(catalogItem.variants);
  const [internalSelection, setInternalSelection] = useState(
    hasVariants
      ? { size: catalogItem.variants[0], color: catalogItem.colors[0] }
      : null
  );
  const selection = externalSelection ?? internalSelection;
  const setSelection = setInternalSelection;
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [cartItemId, setCartItemId] = useState(null);
  const [inCart, setInCart] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const activeSlug = hasVariants ? selection?.size?.dbSlug : catalogItem.dbSlug;

  useEffect(() => {
    if (!activeSlug) return;
    // Reset cart state when the selected variant changes
    setInCart(false);
    setCartItemId(null);
    setQty(1);
    productService
      .getBySlug(activeSlug)
      .then((res) => setProduct(res?.data || null))
      .catch(() => setProduct(null));
  }, [activeSlug]);

  const syncCartState = async (productId) => {
    const cartRes = await cartService.getCart();
    const cartItem = (cartRes?.data?.items || []).find((i) => i.productId === productId);
    if (cartItem) {
      setQty(cartItem.quantity);
      setCartItemId(cartItem.id);
      setInCart(true);
    }
  };

  const handleAddToCart = async () => {
    if (!isAuthenticated) return router.push("/login");
    if (!product?.id) return setError("Product unavailable");
    setBusy(true);
    setError("");
    try {
      await cartService.addItem(product.id, 1);
      await syncCartState(product.id);
      refreshCart();
    } catch (err) {
      setError(err?.data?.message || "Could not add to cart");
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
    if (!product?.id) return setError("Product unavailable");
    setBusy(true);
    setError("");
    try {
      if (!inCart) {
        await cartService.addItem(product.id, qty);
        refreshCart();
      }
      router.push("/checkout");
    } catch (err) {
      setError(err?.data?.message || "Could not proceed to checkout");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      {hasVariants && !hideSelector ? (
        <BallVariantSelector
          variants={catalogItem.variants}
          colors={catalogItem.colors}
          onChange={setSelection}
        />
      ) : null}

      <div className="flex items-baseline gap-3.5 mb-6">
        <span className="font-mono text-[34px] font-semibold text-ink">
          {product?.price
            ? "\u20B9" + Number(product.price).toLocaleString("en-IN")
            : "\u20B9 —"}
        </span>
        <span className="text-[13px] text-muted">GST invoice at checkout</span>
      </div>

      {error ? <p className="text-red-400 text-xs mb-3">{error}</p> : null}

      <div className="flex items-center gap-3 flex-wrap">
        {inCart ? (
          <div className="flex items-center border border-cyan/[0.16] rounded">
            <button
              onClick={() => handleQtyChange(-1)}
              disabled={busy}
              className="w-[42px] h-12 text-lg text-ink hover:text-cyan disabled:opacity-50"
            >
              -
            </button>
            <span className="font-mono text-ink min-w-[34px] text-center">{qty}</span>
            <button
              onClick={() => handleQtyChange(1)}
              disabled={busy}
              className="w-[42px] h-12 text-lg text-ink hover:text-cyan disabled:opacity-50"
            >
              +
            </button>
          </div>
        ) : (
          <button
            onClick={handleAddToCart}
            disabled={busy}
            className="px-6 py-3 rounded bg-gradient-to-r from-cyan to-green text-navy-deep font-display font-semibold uppercase tracking-[0.08em] text-sm disabled:opacity-50"
          >
            {busy ? "Adding..." : "Add to cart"}
          </button>
        )}

        <button
          onClick={handleBuyNow}
          disabled={busy}
          className="px-6 py-3 rounded border border-cyan/[0.16] text-ink font-display font-semibold uppercase tracking-[0.08em] text-sm hover:border-cyan/50 transition-colors disabled:opacity-50"
        >
          Buy now
        </button>
      </div>
    </div>
  );
}