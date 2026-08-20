"use client";

export default function LeadTimePopup({ open, items, onAcknowledge }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
      <div className="absolute inset-0 bg-navy-deep/85" />
      <div className="relative w-full max-w-md rounded-xl border border-cyan/[0.16] bg-navy-card p-6 shadow-xl">
        <h3 className="font-display font-bold text-ink text-lg mb-2">
          Made-to-order dispatch times
        </h3>
        <p className="text-muted text-sm mb-4">
          Every item in your order is built to order. Here's when to expect dispatch:
        </p>

        <div className="space-y-2 mb-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center text-sm border-b border-cyan/[0.09] pb-2 last:border-0"
            >
              <span className="text-ink">{item.product?.name}</span>
              <span className="text-cyan font-mono text-xs">
                {item.product?.leadTime || "Dispatch time to be confirmed"}
              </span>
            </div>
          ))}
        </div>

        <button
          onClick={onAcknowledge}
          className="w-full px-4 py-2.5 rounded-lg bg-gradient-to-r from-cyan to-green text-navy-deep text-sm font-display font-semibold uppercase tracking-wide"
        >
          I understand, continue
        </button>
      </div>
    </div>
  );
}