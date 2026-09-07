// src/components/ui/Eyebrow.jsx
export default function Eyebrow({ children, color = "cyan" }) {
  const colorClass = color === "green" ? "text-green" : "text-cyan";
  return (
    <span className={`block font-display font-bold text-[32px] sm:text-[40px] leading-[1.1] uppercase ${colorClass}`}>
      {children}
    </span>
  );
}