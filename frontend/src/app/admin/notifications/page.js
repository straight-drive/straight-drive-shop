"use client";

import { useEffect, useState } from "react";
import { checkoutAttemptService } from "../../../services/checkoutAttemptService";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const STAGE_LABEL = {
  DETAILS_FILLED: "Filled details, didn't reach payment",
  PAYMENT_STARTED: "Reached payment, didn't complete",
};

export default function AdminNotifications() {
  const [attempts, setAttempts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [busyId, setBusyId] = useState(null);

  useEffect(() => {
    checkoutAttemptService
      .listAbandoned()
      .then((res) => setAttempts(res?.data || []))
      .catch(() => setAttempts([]))
      .finally(() => setIsLoading(false));
  }, []);

  const toggleHandled = async (id) => {
    setBusyId(id);
    try {
      const res = await checkoutAttemptService.toggleHandled(id);
      setAttempts((prev) =>
        prev.map((a) => (a.id === id ? { ...a, isHandled: res?.data?.isHandled } : a))
      );
    } finally {
      setBusyId(null);
    }
  };

  if (isLoading) {
    return <p className="text-muted">Loading...</p>;
  }

  return (
    <div>
      <Link
        href="/admin"
        className="inline-flex items-center gap-2 text-muted hover:text-cyan text-sm font-display font-semibold uppercase tracking-wide transition-colors mb-6"
      >
        <ArrowLeft size={16} />
        Dashboard
      </Link>
      <h1 className="font-display font-bold text-ink text-2xl mb-8">Checkout Alerts</h1>
      <p className="text-muted text-sm mb-8">
        People who started checkout but did not complete their order — reach out using the contact details below.
      </p>

      {attempts.length === 0 ? (
        <p className="text-muted">No abandoned checkouts right now.</p>
      ) : (
        <div className="space-y-4">
          {attempts.map((a) => (
            <div key={a.id} className="rounded-xl border border-cyan/[0.16] bg-navy-card p-6">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <b className="text-ink font-display">{a.fullName}</b>
                  <p className="text-muted text-xs">
                    {a.email} {a.phone ? `· ${a.phone}` : ""}
                  </p>
                </div>
                <span
                  className={`shrink-0 text-[10px] font-display font-semibold uppercase tracking-wide px-2.5 py-1 rounded ${
                    a.isHandled ? "bg-green/10 text-green" : "bg-cyan/10 text-cyan"
                  }`}
                >
                  {a.isHandled ? "handled" : "pending"}
                </span>
              </div>
              <p className="text-muted text-sm mb-2">
                {STAGE_LABEL[a.stage] || a.stage}
              </p>
              <p className="text-ink font-mono text-sm mb-4">
                {"\u20B9"}
                {Number(a.total).toLocaleString("en-IN")}
              </p>
              <button
                onClick={() => toggleHandled(a.id)}
                disabled={busyId === a.id}
                className="text-xs font-display font-semibold uppercase tracking-wide text-cyan hover:text-ink transition-colors disabled:opacity-50"
              >
                Mark as {a.isHandled ? "Pending" : "Handled"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}