// src/components/ui/KeySpecs.jsx
export default function KeySpecs({ items, className = "" }) {
  return (
    <div className={`grid grid-cols-3 gap-3 ${className}`}>
      {items.map((item, idx) => (
        <div key={idx} className="border border-cyan/[0.16] rounded-lg p-3.5 text-center bg-navy-card">
          <b className="font-mono text-xl text-cyan block">{item.value}</b>
          <span className="text-[11px] tracking-[0.14em] uppercase text-muted font-display font-semibold">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}