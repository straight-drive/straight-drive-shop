import { notFound } from "next/navigation";
import { productContent } from "../../../data/productContent";
import { getByKey } from "../../../data/productCatalog";
import BackButton from "../../../components/ui/BackButton";
import TierBadge from "../../../components/ui/TierBadge";
import KeySpecs from "../../../components/ui/KeySpecs";
import SpecGroup from "../../../components/ui/SpecGroup";
import LeadTimeNote from "../../../components/ui/LeadTimeNote";
import YouMightLike from "../../../components/store/YouMightLike";
import BuyPanel from "../../../components/store/BuyPanel";

export default async function TrainingDetail({ params }) {
  const { slug } = await params;
  const content = productContent[slug];
  const catalogItem = getByKey(slug);
  if (!content || !catalogItem) return notFound();

  return (
    <>
     <div className="px-6 pt-6">
        <BackButton href="..." />
      </div>

      <section className="max-w-[1240px] mx-auto px-6 grid md:grid-cols-2 gap-12 py-9">
        <div>
          <div
            className="aspect-[16/10] rounded-[10px] border border-cyan/[0.16] flex items-center justify-center relative"
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
            <span className="absolute bottom-3 left-3 text-xs text-muted">
              Product video placeholder
            </span>
          </div>
          <div className="grid grid-cols-5 gap-2 mt-2">
            {["Video", "Front", "Side", "In play", "Detail"].map((t) => (
              <div
                key={t}
                className="aspect-square rounded border border-cyan/[0.16] flex items-center justify-center text-[10px] text-muted bg-navy-card cursor-pointer hover:border-cyan transition-colors"
              >
                {t}
              </div>
            ))}
          </div>

          <h3 className="font-display font-bold text-ink text-xl mt-9 mb-4">Specifications</h3>
          {content.specGroups.map((group) => (
            <SpecGroup key={group.title} title={group.title} rows={group.rows} />
          ))}
        </div>

        <div>
          <TierBadge>{content.tier}</TierBadge>
          <h1 className="font-display font-bold text-ink text-[clamp(38px,4.5vw,54px)]">
            {content.title}
          </h1>
          <p className="text-muted text-[17px] max-w-[46ch] my-4">{content.sub}</p>

          <BuyPanel catalogItem={catalogItem} />

          <KeySpecs items={content.keySpecs} className="mt-7" />

          <LeadTimeNote time={catalogItem.leadTime} />
        </div>
      </section>
        
      <YouMightLike currentKey={slug} />
    </>
  );
}