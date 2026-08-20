"use client";

import { useState } from "react";
import { getByKey } from "../../../data/productCatalog";
import BackButton from "../../../components/ui/BackButton";
import TierBadge from "../../../components/ui/TierBadge";
import LeadTimeNote from "../../../components/ui/LeadTimeNote";
import BuyPanel from "../../../components/store/BuyPanel";
import BallVariantSelector from "../../../components/store/BallVariantSelector";
import BookDemoBand from "../../../components/ui/BookDemoBand";
import GradientText from "../../../components/ui/GradientText";
import YouMightLike from "../../../components/store/YouMightLike";

const highlights = [
  {
    value: "145",
    unit: "g",
    label: "Match weight",
    desc: "Same weight as a regulation cricket ball, so the bat feels what it should.",
  },
  {
    value: "PU",
    unit: "",
    label: "Hard dimple",
    desc: "Polyurethane construction that behaves like leather off the pitch.",
  },
  {
    value: "2",
    unit: "",
    label: "Colours",
    desc: "Red for traditional nets, yellow for indoor and evening visibility.",
  },
  {
    value: "All",
    unit: "",
    label: "Machines",
    desc: "Sized for every Straight Drive wheel — consistent feed, every ball.",
  },
];

const ballPhotos = {
  "cricket-balls-box-of-6_Red": "/images/cricket-balls/red-6.jpg",
  "cricket-balls-box-of-6_Yellow": "/images/cricket-balls/yellow-6.jpg",
  "cricket-balls-box-of-12_Red": "/images/cricket-balls/red-12.jpg",
  "cricket-balls-box-of-12_Yellow": "/images/cricket-balls/yellow-12.jpg",
};

export default function CricketBalls() {
  const catalogItem = getByKey("cricket-balls");
  const [selection, setSelection] = useState({
    size: catalogItem.variants[0],
    color: catalogItem.colors[0],
  });

  const photoKey = `${selection.size?.dbSlug}_${selection.color?.label}`;
  const currentPhoto = ballPhotos[photoKey];

  return (
    <>
      <div className="px-6 pt-6">
       <BackButton href="/performance-training" />
      </div>

      <section className="border-b border-cyan/[0.16]">
        <div className="max-w-[1240px] mx-auto px-6 grid md:grid-cols-[1fr_auto_1fr] gap-10 items-center py-9 pb-[60px]">
          {/* Column 1 — photo */}
          <div
            className="aspect-square rounded-xl border border-cyan/[0.16] flex items-center justify-center overflow-hidden"
            style={{
              backgroundImage:
                "repeating-linear-gradient(-45deg, rgba(255,255,255,.03) 0 12px, transparent 12px 24px),linear-gradient(160deg, #143059, #0A192F)",
            }}
          >
            {currentPhoto ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={photoKey}
                src={currentPhoto}
                alt="Cricket Balls"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-muted text-[11px] font-display font-semibold uppercase tracking-[0.2em] text-center px-6">
                Photo — Cricket balls
              </span>
            )}
          </div>

          {/* Column 2 — variant selectors */}
          <div className="shrink-0">
            <BallVariantSelector
              variants={catalogItem.variants}
              colors={catalogItem.colors}
              onChange={setSelection}
            />
          </div>

          {/* Column 3 — title, description, price, buttons */}
          <div>
            <TierBadge>Consumables</TierBadge>
            <h1 className="font-display font-bold text-ink text-[clamp(32px,3.6vw,46px)]">
              CRICKET <GradientText>BALLS</GradientText>
            </h1>
            <p className="text-muted text-[16px] mt-4 mb-7">
              Standard machine ball, match weight. Built for our wheels —
              consistent seam, consistent bounce, long life.
            </p>

            <BuyPanel
              catalogItem={catalogItem}
              externalSelection={selection}
              hideSelector
            />

            <LeadTimeNote time={catalogItem.leadTime} />
          </div>
        </div>
      </section>

      <section className="bg-navy border-b border-cyan/[0.16]">
        <div className="max-w-[1240px] mx-auto px-6 py-16">
          <span className="block font-display font-semibold text-[13px] tracking-[0.28em] uppercase text-cyan mb-3">
            Why these balls
          </span>
          <h2 className="font-display font-bold text-ink text-[clamp(26px,3.4vw,40px)] mb-10">
            Built for the wheels, <GradientText>not just the bat.</GradientText>
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {highlights.map((h) => (
              <div
                key={h.label}
                className="rounded-xl border border-cyan/[0.16] bg-navy-card p-6"
              >
                <div className="font-mono text-4xl font-semibold bg-gradient-to-r from-cyan to-green bg-clip-text text-transparent mb-1">
                  {h.value}
                  {h.unit ? <span className="text-2xl">{h.unit}</span> : null}
                </div>
                <span className="block font-display font-semibold text-[12px] tracking-[0.18em] uppercase text-ink mb-3">
                  {h.label}
                </span>
                <p className="text-muted text-[14px] leading-relaxed">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    <BookDemoBand />
      <YouMightLike currentKey="cricket-balls" />
    </>
  );
}