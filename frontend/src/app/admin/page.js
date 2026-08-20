"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { adminService } from "../../services/adminService";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [messages, setMessages] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      adminService.getStats(),
      adminService.getRecentMessages(),
      adminService.getRecentAlerts(),
    ])
      .then(([statsRes, msgRes, alertRes]) => {
        setStats(statsRes?.data || null);
        setMessages(msgRes?.data || []);
        setAlerts(alertRes?.data || []);
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading || !stats) {
    return <p className="text-muted">Loading...</p>;
  }

  const statCards = [
    { label: "Total Orders", value: stats.totalOrders },
    { label: "Pending Orders", value: stats.pendingOrders },
    { label: "Delivered Orders", value: stats.deliveredOrders },
    { label: "Total Products", value: stats.totalProducts },
    { label: "Total Clients", value: stats.totalClients },
  ];

  return (
    <div>
      
      <h1 className="font-display font-bold text-ink text-2xl mb-8">Dashboard</h1>

      <div className="rounded-2xl border border-cyan/[0.16] bg-navy-card p-8 mb-6">
        <span className="text-muted text-xs font-display uppercase tracking-[0.14em]">
          Total Revenue
        </span>
        <div className="font-mono text-5xl font-semibold bg-gradient-to-r from-cyan to-green bg-clip-text text-transparent mt-2">
          {"\u20B9"}
          {stats.totalRevenue.toLocaleString("en-IN")}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
        {statCards.map((s) => (
          <div key={s.label} className="rounded-xl border border-cyan/[0.16] bg-navy-card p-5">
            <div className="font-mono text-2xl font-semibold text-ink">{s.value}</div>
            <span className="text-muted text-xs font-display uppercase tracking-wide">{s.label}</span>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="rounded-xl border border-cyan/[0.16] bg-navy-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-semibold text-ink text-sm uppercase tracking-wide">
              Recent Messages {stats.unhandledMessages > 0 ? `(${stats.unhandledMessages} pending)` : ""}
            </h2>
            <Link href="/admin/messages" className="text-cyan text-xs font-display uppercase tracking-wide">
              View all →
            </Link>
          </div>
          {messages.length === 0 ? (
            <p className="text-muted text-sm">No messages yet.</p>
          ) : (
            <div className="space-y-3">
              {messages.map((m) => (
                <div key={m.id} className="flex items-start justify-between gap-3 border-b border-cyan/[0.08] pb-3 last:border-0 last:pb-0">
                  <div className="min-w-0">
                    <b className="text-ink text-sm block">{m.name}</b>
                    <p className="text-muted text-xs truncate">{m.message}</p>
                  </div>
                  <span
                    className={`shrink-0 text-[10px] font-display font-semibold uppercase tracking-wide px-2 py-1 rounded ${
                      m.isHandled ? "bg-green/10 text-green" : "bg-cyan/10 text-cyan"
                    }`}
                  >
                    {m.isHandled ? "handled" : "pending"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-xl border border-cyan/[0.16] bg-navy-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-semibold text-ink text-sm uppercase tracking-wide">
              Checkout Alerts {stats.unhandledAlerts > 0 ? `(${stats.unhandledAlerts} pending)` : ""}
            </h2>
            <Link href="/admin/notifications" className="text-cyan text-xs font-display uppercase tracking-wide">
              View all →
            </Link>
          </div>
          {alerts.length === 0 ? (
            <p className="text-muted text-sm">No abandoned checkouts.</p>
          ) : (
            <div className="space-y-3">
              {alerts.map((a) => (
                <div key={a.id} className="flex items-start justify-between gap-3 border-b border-cyan/[0.08] pb-3 last:border-0 last:pb-0">
                  <div className="min-w-0">
                    <b className="text-ink text-sm block">{a.fullName}</b>
                    <p className="text-muted text-xs">{a.email}</p>
                  </div>
                  <span className="shrink-0 text-[10px] font-display font-semibold uppercase tracking-wide px-2 py-1 rounded bg-cyan/10 text-cyan">
                    {a.isHandled ? "handled" : "pending"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}