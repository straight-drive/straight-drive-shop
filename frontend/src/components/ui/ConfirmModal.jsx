"use client";

export default function ConfirmModal({ open, title, message, confirmLabel = "Confirm", onConfirm, onCancel, busy }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
      <div className="absolute inset-0 bg-navy-deep/80" onClick={onCancel} />
      <div className="relative w-full max-w-sm rounded-xl border border-cyan/[0.16] bg-navy-card p-6 shadow-xl">
        <h3 className="font-display font-bold text-ink text-lg mb-2">{title}</h3>
        <p className="text-muted text-sm mb-6">{message}</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            disabled={busy}
            className="px-4 py-2 rounded-lg border border-cyan/[0.16] text-ink text-sm font-display uppercase tracking-wide hover:border-cyan/50 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={busy}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan to-green text-navy-deep text-sm font-display font-semibold uppercase tracking-wide disabled:opacity-50"
          >
            {busy ? "..." : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}