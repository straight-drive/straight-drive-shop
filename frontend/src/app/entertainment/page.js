// src/app/entertainment/page.js
import GradientText from "../../components/ui/GradientText";
import Eyebrow from "../../components/ui/Eyebrow";
import ListingCard from "../../components/store/ListingCard";
import { catalog } from "../../data/productCatalog";

export const metadata = {
  title: "Entertainment — Straight Drive",
  description: "Sports entertainment for venues, malls and events.",
};

export default function Entertainment() {
  const items = catalog.filter((p) => p.category === "entertainment");

  return (
    <>
      <section className="relative h-[320px] md:h-[380px] overflow-hidden">
                <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/60 to-navy-deep/30" />
        <div className="relative z-10 h-full flex items-center justify-center">
          <h1 className="font-display font-bold text-ink text-[clamp(40px,6vw,72px)] text-center">
            Entertain<GradientText>ment.</GradientText>
          </h1>
        </div>
      </section>

      <section className="pt-16 pb-6 px-6">
        <div className="max-w-[1240px] mx-auto">
          <Eyebrow color="green">For venues, malls &amp; events</Eyebrow>
          <h2 className="font-display font-bold text-ink text-[clamp(28px,3.6vw,40px)] mt-3">
            Products.
          </h2>
          <p className="text-muted max-w-[58ch] mt-3">
            Sports entertainment that keeps queues forming.
          </p>
        </div>
      </section>

      <section className="pb-24 px-6">
        <div className="max-w-[1240px] mx-auto grid md:grid-cols-3 gap-6">
          {items.map((item) => (
            <ListingCard key={item.key} item={item} />
          ))}
        </div>
      </section>
    </>
  );
}