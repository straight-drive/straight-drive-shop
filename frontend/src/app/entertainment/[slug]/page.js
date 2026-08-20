import Link from "next/link";
import { notFound } from "next/navigation";
import { productContent } from "../../../data/productContent";
import { getByKey } from "../../../data/productCatalog";
import TierBadge from "../../../components/ui/TierBadge";
import KeySpecs from "../../../components/ui/KeySpecs";

export default async function EntertainmentDetail({ params }) {
  const { slug } = await params;
  const content = productContent[slug];
  const catalogItem = getByKey(slug);
  if (!content || !catalogItem) return notFound();

  return (
    <>
      <div
        className="max-w-[1240px] mx-auto px-6 grid md:grid-cols-[1.15fr_.85fr] gap-[52px]"
        style={{ paddingTop: "36px", paddingBottom: "60px" }}
      >
        <div>
          <div
            className="aspect-video rounded-[10px] border border-cyan/[0.16] flex items-center justify-center text-muted text-sm relative"
            style={{
              backgroundImage:
                "repeating-linear-gradient(-45deg, rgba(255,255,255,.03) 0 12px, transparent 12px 24px), linear-gradient(160deg, #12294a, #0A192F)",
            }}
          >
            <span
              className="w-[74px] h-[74px] rounded-full flex items-center justify-center text-navy-deep text-2xl bg-gradient-to-r from-cyan to-green"
              style={{ boxShadow: "0 10px 40px rgba(0,181,223,.35)" }}
            >
              &#9654;
            </span>
            <span className="absolute bottom-3.5 left-3.5 text-xs text-muted font-display uppercase tracking-wide">
              Product film placeholder
            </span>
          </div>
          <div className="grid grid-cols-5 gap-2 mt-3">
            {["Video", "Venue", "In play", "Screen", "Layout"].map((t) => (
              <div
                key={t}
                className="aspect-square rounded border border-cyan/[0.16] flex items-center justify-center text-[10px] text-muted bg-navy-card cursor-pointer hover:border-cyan transition-colors"
              >
                {t}
              </div>
            ))}
          </div>
        </div>

        <div>
          <TierBadge>{content.tier}</TierBadge>
          <h1 className="font-display font-bold text-ink text-[clamp(38px,4.5vw,54px)]">
            {content.title}
          </h1>
          <p className="text-muted text-[17px] max-w-[46ch] my-4">{content.sub}</p>

          <KeySpecs items={content.keySpecs} className="mb-7" />

          <div className="flex flex-wrap gap-4">
            <Link
              href="/#contact"
              className="px-6 py-3 rounded bg-gradient-to-r from-cyan to-green text-navy-deep font-display font-semibold uppercase tracking-wide text-sm"
            >
              Request a proposal
            </Link>
            <button className="px-6 py-3 rounded border border-cyan/[0.16] text-ink font-display font-semibold uppercase tracking-wide text-sm hover:border-cyan/50 transition-colors">
              Download brochure
            </button>
          </div>

          <p className="text-[13px] text-muted mt-4">{content.venueNote}</p>
        </div>
      </div>

      <div className="max-w-[1240px] mx-auto px-6">
        <h3 className="font-display font-bold text-ink text-xl" style={{ margin: "34px 0 16px" }}>
          What you get
        </h3>
        <div
          className="grid gap-[18px]"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", margin: "36px 0" }}
        >
          {content.features.map((f) => (
            <div key={f.title} className="rounded-[10px] border border-cyan/[0.16] bg-navy-card p-[22px]">
              <b className="font-display text-ink block mb-2">{f.title}</b>
              <span className="text-muted text-sm">{f.desc}</span>
            </div>
          ))}
        </div>

        <div
          className="bg-gradient-to-r from-cyan to-green text-navy-deep text-center rounded-2xl"
          style={{ padding: "56px 24px", margin: "24px 0 64px" }}
        >
          <h2 className="font-display font-bold text-3xl mb-3">{content.ctaTitle}</h2>
          <p className="mb-6 opacity-80">
            Tell us about your space and we will come back with a layout and a number.
          </p>
          <Link
            href="/#contact"
            className="inline-block px-6 py-3 rounded bg-navy-deep text-ink font-display font-semibold uppercase tracking-wide text-sm"
          >
            Talk to our team
          </Link>
        </div>
      </div>
    </>
  );
}