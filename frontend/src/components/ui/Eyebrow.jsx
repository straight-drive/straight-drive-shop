// src/components/ui/Eyebrow.jsx
export default function Eyebrow({ children, color = "cyan" }) {
  const colorClass = color === "green" ? "text-green" : "text-cyan";
  return (
    <span className={`block font-display font-semibold text-[13px] tracking-[0.28em] uppercase ${colorClass}`}>
      {children}
    </span>
  );
}