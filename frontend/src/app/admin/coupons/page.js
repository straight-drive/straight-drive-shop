"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { couponService } from "../../../services/couponService";
import { productService } from "../../../services/productService";
import { formatDateTime } from "../../../utils/formatDate";

export default function AdminCoupons() {
  const [coupons, setCoupons] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [busyId, setBusyId] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    code: "",
    name: "",
    discountPercent: "",
    productIds: [],
  });

  const load = async () => {
    try {
      const [couponRes, productRes] = await Promise.all([
        couponService.list(),
        productService.list(),
      ]);
      setCoupons(couponRes?.data || []);
      setProducts(productRes?.data?.items || []);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const toggleProduct = (id) => {
    setForm((f) => ({
      ...f,
      productIds: f.productIds.includes(id)
        ? f.productIds.filter((p) => p !== id)
        : [...f.productIds, id],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      await couponService.create({
        code: form.code,
        name: form.name,
        discountPercent: Number(form.discountPercent),
        productIds: form.productIds,
      });
      setMessage("Coupon created");
      setForm({ code: "", name: "", discountPercent: "", productIds: [] });
      load();
    } catch (err) {
      setError(err?.data?.message || "Could not create coupon");
    }
  };

  const toggleActive = async (id) => {
    setBusyId(id);
    try {
      await couponService.toggleActive(id);
      load();
    } finally {
      setBusyId(null);
    }
  };

  if (isLoading) return <p className="text-muted">Loading...</p>;

  return (
    <div>
      <Link
        href="/admin"
        className="inline-flex items-center gap-2 text-muted hover:text-cyan text-sm mb-6 transition-colors"
      >
        <ArrowLeft size={16} /> Back to admin
      </Link>

      <h1 className="font-display font-bold text-ink text-2xl mb-6">Coupons</h1>

      {/* Create form */}
      <div className="rounded-xl border border-cyan/[0.16] bg-navy-card p-6 mb-8">
        <h2 className="font-display font-semibold text-ink mb-4">
          Create a coupon
        </h2>

        {error ? <p className="text-red-400 text-sm mb-3">{error}</p> : null}
        {message ? <p className="text-green text-sm mb-3">{message}</p> : null}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-muted text-xs uppercase tracking-wide mb-1.5">
                Code
              </label>
              <input
                name="code"
                value={form.code}
                onChange={handleChange}
                placeholder="LAUNCH10"
                required
                className="w-full bg-navy-deep border border-cyan/[0.16] rounded-md text-ink px-3 py-2 uppercase focus:outline-none focus:border-cyan"
              />
            </div>

            <div>
              <label className="block text-muted text-xs uppercase tracking-wide mb-1.5">
                Name
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Launch offer"
                required
                className="w-full bg-navy-deep border border-cyan/[0.16] rounded-md text-ink px-3 py-2 focus:outline-none focus:border-cyan"
              />
            </div>

            <div>
              <label className="block text-muted text-xs uppercase tracking-wide mb-1.5">
                Discount %
              </label>
              <input
                name="discountPercent"
                type="number"
                min="1"
                max="100"
                value={form.discountPercent}
                onChange={handleChange}
                placeholder="10"
                required
                className="w-full bg-navy-deep border border-cyan/[0.16] rounded-md text-ink px-3 py-2 focus:outline-none focus:border-cyan"
              />
            </div>
          </div>

          <div>
            <label className="block text-muted text-xs uppercase tracking-wide mb-2">
              Applies to
            </label>
            <p className="text-muted text-xs mb-3">
              Leave all unticked to apply the coupon to every product.
            </p>
            <div className="grid sm:grid-cols-2 gap-2">
              {products.map((p) => (
                <label
                  key={p.id}
                  className="flex items-center gap-2.5 text-sm text-ink cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={form.productIds.includes(p.id)}
                    onChange={() => toggleProduct(p.id)}
                    className="w-4 h-4 accent-cyan"
                  />
                  {p.name}
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-cyan to-green text-navy-deep text-sm font-display font-semibold uppercase tracking-wide"
          >
            Create coupon
          </button>
        </form>
      </div>

      {/* Existing coupons */}
      {coupons.length === 0 ? (
        <p className="text-muted">No coupons yet.</p>
      ) : (
        <div className="space-y-4">
          {coupons.map((c) => (
            <div
              key={c.id}
              className="rounded-xl border border-cyan/[0.16] bg-navy-card p-6"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <b className="font-mono text-ink text-lg">{c.code}</b>
                  <p className="text-muted text-sm mt-0.5">{c.name}</p>
                  <p className="text-cyan text-sm font-display mt-2">
                    {c.discountPercent}% off
                    {c.productIds.length > 0
                      ? ` · ${c.productIds.length} product${c.productIds.length > 1 ? "s" : ""}`
                      : " · all products"}
                  </p>
                  <p className="text-muted text-xs mt-2">
                    Redeemed {c.timesRedeemed}{" "}
                    {c.timesRedeemed === 1 ? "time" : "times"}
                  </p>
                </div>

                <div className="shrink-0 text-right">
                  <span className="block text-muted text-[11px] font-mono mb-2">
                    {formatDateTime(c.createdAt)}
                  </span>
                  <span
                    className={`inline-block text-[10px] font-display font-semibold uppercase tracking-wide px-2.5 py-1 rounded ${
                      c.isActive
                        ? "bg-green/10 text-green"
                        : "bg-muted/10 text-muted"
                    }`}
                  >
                    {c.isActive ? "active" : "inactive"}
                  </span>
                </div>
              </div>

              <button
                onClick={() => toggleActive(c.id)}
                disabled={busyId === c.id}
                className="mt-4 text-xs font-display font-semibold uppercase tracking-wide text-cyan hover:text-ink transition-colors disabled:opacity-50"
              >
                {c.isActive ? "Deactivate" : "Activate"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}