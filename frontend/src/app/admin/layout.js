// src/app/admin/layout.js
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Mail, Package, Bell, ArrowLeft } from "lucide-react";
import { adminService } from "../../services/adminService";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const [badges, setBadges] = useState({});

  useEffect(() => {
    adminService
      .getStats()
      .then((res) => {
        const s = res?.data || {};
        setBadges({
          "/admin/messages": s.unhandledMessages || 0,
          "/admin/orders": s.awaitingDispatch || 0,
          "/admin/notifications": s.unhandledAlerts || 0,
        });
      })
      .catch(() => {});
  }, [pathname]);

  const ADMIN_NAV = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Messages", href: "/admin/messages", icon: Mail },
    { label: "Orders", href: "/admin/orders", icon: Package },
    { label: "Alerts", href: "/admin/notifications", icon: Bell },
  ];

  return (
    <div className="min-h-screen flex bg-navy-deep font-body">
      <aside className="w-60 shrink-0 border-r border-cyan/[0.16] bg-navy-card flex flex-col">
        <div className="px-6 py-6 border-b border-cyan/[0.16] flex items-start gap-3">
          <Link
            href="/"
            aria-label="Back to site"
            title="Back to site"
            className="text-muted hover:text-cyan transition-colors mt-0.5 shrink-0"
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <span className="font-display font-bold text-ink text-sm uppercase tracking-wide">
              Straight Drive
            </span>
            <span className="block text-[10px] text-cyan uppercase tracking-[0.25em] mt-1 font-display font-semibold">
              Admin Panel
            </span>
          </div>
        </div>
        <nav className="flex-1 py-4">
         {ADMIN_NAV.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            const count = badges[item.href] || 0;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-6 py-3 text-sm font-display font-semibold uppercase tracking-wide transition-colors ${
                  isActive
                    ? "text-ink bg-cyan/10 border-r-2 border-cyan"
                    : "text-muted hover:text-ink hover:bg-navy-deep/50"
                }`}
              >
                <Icon size={17} />
                <span className="flex-1">{item.label}</span>
                {count > 0 && (
                  <span className="text-[10px] font-mono font-bold bg-gradient-to-r from-cyan to-green text-navy-deep rounded-full px-2 py-0.5 min-w-[20px] text-center">
                    {count}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
         
      </aside>

      <main className="flex-1 px-8 py-8 overflow-x-auto">{children}</main>
    </div>
  );
}