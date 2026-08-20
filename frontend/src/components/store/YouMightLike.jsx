// src/components/store/YouMightLike.jsx
import Link from "next/link";
import { getOthers } from "../../data/productCatalog";

export default function YouMightLike({ currentKey }) {
  const others = getOthers(currentKey);

  return (
    <section className="max-w-[1240px] mx-auto px-6 pt-4 pb-24">
      <h2 className="font-display font-bold text-ink text-2xl mb-6">
        Other products you might like.
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
        {others.map((p) => (
          <Link
            key={p.key}
            href={`/${p.category}/${p.key}`}
            className="group rounded-xl border border-cyan/[0.16] bg-navy-card overflow-hidden hover:-translate-y-1 hover:border-cyan/50 transition-all"
          >
           <div className="aspect-square overflow-hidden bg-navy-deep">
              {p.cardPhoto ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={p.cardPhoto}
                  alt={p.name}
                  className={`w-full h-full ${
                    p.cardFit === "contain" ? "object-contain" : "object-cover"
                  }`}
                />
              ) : (
                <div
                  className="w-full h-full flex items-center justify-center text-muted text-[10px] font-display font-semibold uppercase tracking-wide text-center px-2"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(-45deg, rgba(255,255,255,.03) 0 12px, transparent 12px 24px), linear-gradient(160deg, #12294a, #0A192F)",
                  }}
                >
                  {p.photo}
                </div>
              )}
            </div>
            <div className="p-3 text-center">
              <span className="text-sm font-display font-semibold text-ink group-hover:text-cyan transition-colors">
                {p.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}