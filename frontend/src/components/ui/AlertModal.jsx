"use client";

export default function AlertModal({ open, title, message, onClose, tone = "error" }) {
  if (!open) return null;

  const toneColor = tone === "error" ? "text-red-400" : "text-cyan";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
      <div className="absolute inset-0 bg-navy-deep/80" onClick={onClose} />
      <div className="relative w-full max-w-sm rounded-xl border border-cyan/[0.16] bg-navy-card p-6 shadow-xl">
        <h3 className={`font-display font-bold text-lg mb-2 ${toneColor}`}>{title}</h3>
        <p className="text-muted text-sm mb-6 whitespace-pre-line">{message}</p>
        <button
          onClick={onClose}
          className="w-full px-4 py-2.5 rounded-lg bg-gradient-to-r from-cyan to-green text-navy-deep text-sm font-display font-semibold uppercase tracking-wide"
        >
          Okay
        </button>
      </div>
    </div>
  );
}