"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../../hooks/useAuth";
import { orderService } from "../../services/orderService";
import GradientText from "../../components/ui/GradientText";

const STATUS_STYLES = {
  PENDING: "bg-cyan/10 text-cyan",
  PROCESSING: "bg-cyan/10 text-cyan",
  SHIPPED: "bg-green/10 text-green",
  DELIVERED: "bg-green/10 text-green",
  CANCELLED: "bg-red-500/10 text-red-400",
  REFUNDED: "bg-red-500/10 text-red-400",
};

const STATUS_LABEL = {
  PENDING: "Awaiting payment",
  PROCESSING: "In production",
  SHIPPED: "Dispatched",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
  REFUNDED: "Refunded",
};

export default function Dashboard() {
  const { user, isAuthenticated, isLoading: authLoading, logout } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) router.push("/login");
  }, [authLoading, isAuthenticated, router]);

  useEffect(() => {
    if (!isAuthenticated) return;
    orderService
      .listMine()
      .then((res) => setOrders(res?.data || []))
      .catch(() => setOrders([]))
      .finally(() => setIsLoading(false));
  }, [isAuthenticated]);

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  if (authLoading || !isAuthenticated) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-muted">Loading...</p>
      </div>
    );
  }

  return (
    <section className="max-w-[1000px] mx-auto px-6 py-16">
      
      <div className="flex items-start justify-between gap-4 mb-12">
        <div>
          <h1 className="font-display font-bold text-ink text-3xl mb-1">
            Welcome back, <GradientText>{user?.name}.</GradientText>
          </h1>
          <p className="text-muted text-sm">{user?.email}</p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          {(user?.role === "ADMIN" || user?.role === "SUPER_ADMIN") && (
            <Link
              href="/admin"
              className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-cyan to-green text-navy-deep text-sm font-display font-semibold uppercase tracking-wide"
            >
              Admin Panel
            </Link>
          )}
          <button
            onClick={handleLogout}
            className="px-5 py-2.5 rounded-lg border border-cyan/[0.16] text-ink text-sm font-display uppercase tracking-wide hover:border-cyan/50 hover:text-cyan transition-colors"
          >
            Log Out
          </button>
        </div>
      </div>

      <h2 className="font-display font-semibold text-ink text-lg uppercase tracking-wide mb-5">
        My Orders
      </h2>

      {isLoading ? (
        <p className="text-muted">Loading orders...</p>
      ) : orders.length === 0 ? (
        <div className="rounded-xl border border-cyan/[0.16] bg-navy-card p-10 text-center">
          <p className="text-muted mb-5">You haven&apos;t placed any orders yet.</p>
          <Link
            href="/performance-training"
            className="inline-block px-6 py-3 rounded bg-gradient-to-r from-cyan to-green text-navy-deep font-display font-semibold uppercase tracking-wide text-sm"
          >
            Browse products
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="rounded-xl border border-cyan/[0.16] bg-navy-card p-6">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  <b className="text-ink font-display">{order.orderNumber}</b>
                  <p className="text-muted text-xs">
                    Placed {new Date(order.createdAt).toLocaleDateString("en-IN")}
                  </p>
                </div>
                <span
                  className={`shrink-0 text-[10px] font-display font-semibold uppercase tracking-wide px-2.5 py-1 rounded ${
                    STATUS_STYLES[order.status] || "bg-cyan/10 text-cyan"
                  }`}
                >
                  {STATUS_LABEL[order.status] || order.status}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                {(order.items || []).map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-muted">
                      {item.product?.name} x {item.quantity}
                    </span>
                    <span className="text-ink font-mono">
                      {"\u20B9"}
                      {(Number(item.unitPrice) * item.quantity).toLocaleString("en-IN")}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap justify-between items-center gap-3 pt-4 border-t border-cyan/[0.09]">
                <div className="text-xs text-muted">
                  {order.dispatchedAt
                    ? `Dispatched ${new Date(order.dispatchedAt).toLocaleDateString("en-IN")}`
                    : order.status === "PROCESSING"
                    ? "Being built — we will notify you when it ships"
                    : ""}
                </div>
                <div className="font-mono text-ink">
                  {"\u20B9"}
                  {Number(order.total).toLocaleString("en-IN")}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}