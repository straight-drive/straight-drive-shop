import Link from "next/link";
import { redirect } from "next/navigation";
import { productContent } from "../../../data/productContent";
import { getByKey } from "../../../data/productCatalog";
import BackButton from "../../../components/ui/BackButton";
import TierBadge from "../../../components/ui/TierBadge";
import KeySpecs from "../../../components/ui/KeySpecs";
import SpecGroup from "../../../components/ui/SpecGroup";
import LeadTimeNote from "../../../components/ui/LeadTimeNote";
import GradientText from "../../../components/ui/GradientText";
import BookDemoBand from "../../../components/ui/BookDemoBand";
import YouMightLike from "../../../components/store/YouMightLike";

export const metadata = {
  title: "Pixel Play — Straight Drive",
  description:
    "The compact cricket simulator — big-screen cricket in a smaller footprint, for malls, parties and family venues.",
};

export default function PixelPlay() {
  redirect("/entertainment");
  const content = productContent["pixel-play"];
  const catalogItem = getByKey("pixel-play");

  return (
    <>
      <div className="px-6 pt-6">
        <BackButton href="/entertainment" />
      </div>

      <section className="border-b border-cyan/[0.16]">
        <div className="max-w-[1240px] mx-auto px-6 grid md:grid-cols-[1.15fr_.85fr] gap-[52px] items-center py-9 pb-[60px]">
          <div>
            <TierBadge>{content.tier}</TierBadge>
            <h1 className="font-display font-bold text-ink text-[clamp(38px,4.5vw,54px)]">
              {content.titleMain}
              <GradientText>{content.titleEm}</GradientText>
            </h1>
            <p className="text-muted text-[17px] max-w-[52ch] mt-4 mb-7">{content.lede}</p>

            <div className="flex flex-wrap gap-4 mb-4">
              <Link
                href="/contact"
                className="px-6 py-3 rounded bg-gradient-to-r from-cyan to-green text-navy-deep font-display font-semibold uppercase tracking-[0.08em] text-sm"
              >
                Request a proposal
              </Link>
              <button className="px-6 py-3 rounded border border-cyan/[0.16] text-ink font-display font-semibold uppercase tracking-[0.08em] text-sm hover:border-cyan/50 transition-colors">
                Download brochure
              </button>
            </div>

            <p className="text-[13px] text-muted mb-7">{content.venueNote}</p>

            <KeySpecs items={content.keySpecs} />

            <LeadTimeNote time={catalogItem.leadTime} />
          </div>

          <div
            className="aspect-video rounded-xl border border-cyan/[0.16] flex items-center justify-center relative"
            style={{
              backgroundImage:
                "repeating-linear-gradient(-45deg, rgba(255,255,255,.03) 0 12px, transparent 12px 24px), linear-gradient(160deg, #143059, #0A192F)",
            }}
          >
            <span
              className="w-[74px] h-[74px] rounded-full flex items-center justify-center text-navy-deep text-2xl bg-gradient-to-r from-cyan to-green"
              style={{ boxShadow: "0 10px 40px rgba(0,181,223,.35)" }}
            >
              &#9654;
            </span>
            <span className="absolute bottom-4 left-4 text-xs text-muted font-display uppercase tracking-wide">
              Product film — Pixel Play in a venue
            </span>
          </div>
        </div>
      </section>

      <section className="max-w-[1240px] mx-auto px-6">
        {content.features.map((f, idx) => (
          <div
            key={idx}
            className="grid md:grid-cols-2 gap-11 items-center border-t border-cyan/[0.16]"
            style={{ paddingTop: "52px", paddingBottom: "52px" }}
          >
            <div
              className={`aspect-[16/10] rounded-xl border border-cyan/[0.16] flex items-center justify-center text-center px-6 text-muted text-[11px] font-display font-semibold uppercase tracking-[0.2em] ${
                idx % 2 === 1 ? "md:order-2" : ""
              }`}
              style={{
                backgroundImage:
                  "repeating-linear-gradient(-45deg, rgba(255,255,255,.03) 0 12px, transparent 12px 24px), linear-gradient(160deg, #12294a, #0A192F)",
              }}
            >
              {f.img}
            </div>

            <div>
              <span className="block font-display font-semibold text-[13px] tracking-[0.28em] uppercase text-green mb-3">
                {f.eyebrow}
              </span>
              <h3 className="font-display font-bold text-ink text-[clamp(22px,2.6vw,30px)] mb-3">
                {f.title}
              </h3>
              <p className="text-muted text-[15px] max-w-[48ch]">{f.desc}</p>
              <div className="flex flex-wrap gap-2.5 mt-4">
                {f.chips.map((chip) => (
                  <span
                    key={chip}
                    className="font-mono text-[12px] text-cyan border border-cyan/[0.16] rounded-full px-3 py-1"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className="bg-navy border-t border-cyan/[0.16] mt-10">
        <div className="max-w-[1240px] mx-auto px-6 py-16">
          <span className="block font-display font-semibold text-[13px] tracking-[0.28em] uppercase text-green mb-3">
            Details
          </span>
          <h2 className="font-display font-bold text-ink text-[clamp(26px,3.4vw,40px)] mb-9">
            Specifications.
          </h2>
          {content.specGroups.map((group) => (
            <SpecGroup key={group.title} title={group.title} rows={group.rows} />
          ))}
        </div>
      </section>
      <BookDemoBand />

      <YouMightLike currentKey="pixel-play" />
    </>
  );
}