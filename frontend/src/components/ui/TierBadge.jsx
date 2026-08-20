// src/components/ui/TierBadge.jsx
export default function TierBadge({ children }) {
  return (
    <span className="inline-block font-display font-bold italic text-[13px] tracking-[0.22em] uppercase bg-gradient-to-r from-cyan to-green text-navy-deep rounded-[3px] px-[13px] py-[5px] mb-4">
      {children}
    </span>
  );
}