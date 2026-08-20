// src/components/ui/ProductCard.jsx
import Link from "next/link";

export default function ProductCard({
  href = "/store",
  photo = "Photo / Video",
  title,
  titleEm,
  desc,
  chip,
  showGo = true,
  soon = false,
}) {
  const inner = (
    <>
      {soon && (
        <span className="absolute top-3.5 right-3.5 z-10 font-display font-bold text-[10px] tracking-[0.18em] uppercase border border-cyan/[0.16] text-muted rounded-[3px] px-2.5 py-[3px]">
          Coming soon
        </span>
      )}
      <span className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-cyan to-green opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
      <div
        className="aspect-[4/3] rounded-md flex items-center justify-center text-muted text-[11px] font-display font-semibold uppercase tracking-[0.2em]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-45deg, rgba(255,255,255,.03) 0 12px, transparent 12px 24px), linear-gradient(160deg, #12294a, #0A192F)",
        }}
      >
        {photo}
      </div>
      <h3 className="text-[22px] font-bold text-ink">
        {title}
        {titleEm && (
          <em className="italic bg-gradient-to-r from-cyan to-green bg-clip-text text-transparent">
            {titleEm}
          </em>
        )}
      </h3>
      <p className="text-[14.5px] text-muted flex-1">{desc}</p>
      <div className="flex justify-between items-center">
        {chip && (
          <span className="font-mono text-xs text-cyan border border-cyan/[0.16] rounded-full px-[11px] py-[3px]">
            {chip}
          </span>
        )}
        {showGo && (
          <span className="font-display font-semibold tracking-[0.08em] uppercase text-[13px] text-cyan group-hover:text-ink transition-colors">
            View →
          </span>
        )}
      </div>
    </>
  );

  const classes = `group relative flex flex-col gap-3.5 bg-navy-card border border-cyan/[0.16] rounded-[10px] p-6 overflow-hidden transition-all duration-200 ${
    soon
      ? "opacity-55 pointer-events-none"
      : "cursor-pointer hover:-translate-y-1 hover:border-cyan/50"
  }`;

  if (soon) {
    return <article className={classes}>{inner}</article>;
  }

  return (
    <Link href={href} className={classes}>
      {inner}
    </Link>
  );
}