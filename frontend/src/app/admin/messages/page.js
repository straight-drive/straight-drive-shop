"use client";

import { useEffect, useState } from "react";
import { contactService } from "../../../services/contactService";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [busyId, setBusyId] = useState(null);

  useEffect(() => {
    contactService
      .listAll()
      .then((res) => setMessages(res?.data || []))
      .catch(() => setMessages([]))
      .finally(() => setIsLoading(false));
  }, []);

  const toggleStatus = async (id) => {
    setBusyId(id);
    try {
      const res = await contactService.toggleHandled(id);
      setMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, isHandled: res?.data?.isHandled } : m))
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
      <h1 className="font-display font-bold text-ink text-2xl mb-8">Contact Messages</h1>

      {messages.length === 0 ? (
        <p className="text-muted">No messages yet.</p>
      ) : (
        <div className="space-y-4">
          {messages.map((m) => (
            <div key={m.id} className="rounded-xl border border-cyan/[0.16] bg-navy-card p-6">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <b className="text-ink font-display">{m.name}</b>
                  <p className="text-muted text-xs">
                    {m.email} {m.phone ? `· ${m.phone}` : ""}
                  </p>
                  {m.subject && (
                    <span className="inline-block mt-1 text-[10px] text-cyan font-display uppercase tracking-wide">
                      {m.subject}
                    </span>
                  )}
                </div>
                <span
                  className={`shrink-0 text-[10px] font-display font-semibold uppercase tracking-wide px-2.5 py-1 rounded ${
                    m.isHandled ? "bg-green/10 text-green" : "bg-cyan/10 text-cyan"
                  }`}
                >
                  {m.isHandled ? "handled" : "pending"}
                </span>
              </div>
              <p className="text-muted text-sm mb-4">{m.message}</p>
              <button
                onClick={() => toggleStatus(m.id)}
                disabled={busyId === m.id}
                className="text-xs font-display font-semibold uppercase tracking-wide text-cyan hover:text-ink transition-colors disabled:opacity-50"
              >
                Mark as {m.isHandled ? "Pending" : "Handled"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}