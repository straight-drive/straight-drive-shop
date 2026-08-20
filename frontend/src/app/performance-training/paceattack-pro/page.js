import { productContent } from "../../../data/productContent";
import { getByKey } from "../../../data/productCatalog";
import BackButton from "../../../components/ui/BackButton";
import TierBadge from "../../../components/ui/TierBadge";
import KeySpecs from "../../../components/ui/KeySpecs";
import LeadTimeNote from "../../../components/ui/LeadTimeNote";
import BuyPanel from "../../../components/store/BuyPanel";
import GradientText from "../../../components/ui/GradientText";
import SpecGroup from "../../../components/ui/SpecGroup";
import BookDemoBand from "../../../components/ui/BookDemoBand";
import YouMightLike from "../../../components/store/YouMightLike";

export const metadata = {
  title: "PaceAttack Pro — Straight Drive",
  description:
    "Professional pace training with full app control — every ball recorded, every session measured.",
};

export default function PaceAttackPro() {
  const content = productContent["paceattack-pro"];
  const catalogItem = getByKey("paceattack-pro");

  return (
    <>
     <div className="px-6 pt-6">
        <BackButton href="/performance-training" />
      </div>

      <section className="border-b border-cyan/[0.16]">
       <div className="max-w-[1240px] mx-auto px-6 grid md:grid-cols-[1.15fr_.85fr] gap-[52px] items-center py-9 pb-[60px]">
          <div>
            <TierBadge>{content.tier}</TierBadge>
            <h1 className="font-display font-bold text-ink text-[clamp(38px,4.5vw,54px)]">
              {content.titleMain}
              <GradientText>{content.titleEm}</GradientText>
              {content.titleEnd}
            </h1>
            <p className="text-muted text-[17px] max-w-[52ch] mt-4 mb-7">
              {content.lede}
            </p>

            <BuyPanel catalogItem={catalogItem} />

            <KeySpecs items={content.keySpecs} className="mt-7" />

            <LeadTimeNote time={catalogItem.leadTime} />
          </div>

                    <div className="aspect-video rounded-xl border border-cyan/[0.16] overflow-hidden relative bg-navy-deep">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="/videos/paceattack.mp4" type="video/mp4" />
            </video>
            
          </div>
        </div>
     </section>

      <section className="max-w-[1240px] mx-auto px-6">
        {content.features.map((f, idx) => (
          <div
            key={idx}
            className="grid md:grid-cols-2 gap-11 items-center py-13 border-t border-cyan/[0.16]"
            style={{ paddingTop: "52px", paddingBottom: "52px" }}
          >
           <div
              className={`aspect-[16/10] rounded-xl border border-cyan/[0.16] overflow-hidden bg-navy-deep ${
                idx % 2 === 1 ? "md:order-2" : ""
              }`}
            >
              {f.photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={f.photo}
                  alt={f.title}
                  className={`w-full h-full ${
                    f.fit === "contain" ? "object-contain" : "object-cover"
                  }`}
                />
              ) : (
                <div
                  className="w-full h-full flex items-center justify-center text-center px-6 text-muted text-[11px] font-display font-semibold uppercase tracking-[0.2em]"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(-45deg, rgba(255,255,255,.03) 0 12px, transparent 12px 24px), linear-gradient(160deg, #12294a, #0A192F)",
                  }}
                >
                  {f.img}
                </div>
              )}
            </div>

            <div>
              <span className="block font-display font-semibold text-[13px] tracking-[0.28em] uppercase text-cyan mb-3">
                {f.eyebrow}
              </span>
              <h3 className="font-display font-bold text-ink text-[26px] mb-3">
                {f.title}
              </h3>
              <p className="text-muted text-[15px]">{f.desc}</p>
              <div className="flex flex-wrap gap-2.5 mt-4">
                {f.chips.map((chip) => (
                  <span
                    key={chip}
                    className="font-mono text-xs text-cyan border border-cyan/[0.16] rounded-full px-3 py-1"
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
          <span className="block font-display font-semibold text-[13px] tracking-[0.28em] uppercase text-cyan mb-3">
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

      <YouMightLike currentKey="paceattack-pro" />
    </>
  );
}