// src/components/ui/ChoiceTile.jsx
import Link from "next/link";

export default function ChoiceTile({ href, name, photo = "Photo" }) {
  return (
    <Link
      href={href}
      className="group relative flex flex-col rounded-[14px] border border-cyan/[0.16] bg-navy-card overflow-hidden cursor-pointer transition-all duration-200 hover:-translate-y-[5px] hover:border-cyan/[0.55]"
    >
      <div
        className="aspect-video flex items-center justify-center text-muted text-[11px] font-display font-semibold uppercase tracking-[0.2em]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-45deg, rgba(255,255,255,.03) 0 12px, transparent 12px 24px), linear-gradient(160deg, #12294a, #0A192F)",
        }}
      >
        {photo}
      </div>
      <div className="px-7 py-6 text-center">
        <h3 className="text-[22px] font-bold text-ink">{name}</h3>
        <span className="font-display font-semibold uppercase tracking-[0.1em] text-[13px] text-cyan group-hover:text-ink transition-colors mt-2 inline-block">
          Choose →
        </span>
      </div>
    </Link>
  );
}