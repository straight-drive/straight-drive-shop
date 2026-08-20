// src/components/ui/PageHead.jsx
import Link from "next/link";
import Eyebrow from "./Eyebrow";
import GradientText from "./GradientText";

export default function PageHead({ crumbs = [], eyebrow, title, titleGrad, intro, showTitle = true }) {
  return (
    <div className="max-w-[1240px] mx-auto px-6">
      <div className="pt-[26px] text-[13.5px] text-muted">
        {crumbs.map((c, idx) => (
          <span key={idx}>
            {c.href ? (
              <Link href={c.href} className="hover:text-cyan transition-colors">
                {c.label}
              </Link>
            ) : (
              <span className="text-ink">{c.label}</span>
            )}
            {idx < crumbs.length - 1 && " / "}
          </span>
        ))}
      </div>

      <div className="pt-10 pb-5">
        {showTitle && eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        {showTitle && (
          <h1 className="font-display font-bold text-ink text-[clamp(36px,5vw,58px)] mt-3">
            {title}
            {titleGrad && <GradientText>{titleGrad}</GradientText>}
          </h1>
        )}
        {intro && <p className="text-muted max-w-[58ch] mt-3">{intro}</p>}
      </div>
    </div>
  );
}