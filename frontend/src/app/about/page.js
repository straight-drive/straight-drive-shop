// src/app/about/page.js
import Eyebrow from "../../components/ui/Eyebrow";
import GradientText from "../../components/ui/GradientText";
import Carousel from "../../components/ui/Carousel";
import Marquee from "../../components/ui/Marquee";

export const metadata = {
  title: "About Us — Straight Drive",
  description:
    "Straight Drive Sports & Leisure Pvt. Ltd. — engineering intelligent systems for professional training and interactive entertainment.",
};


const expoPhotos = [
  "/images/expos/Dubai.webp",
  "/images/expos/IAAPA_Dubai.webp",
  "/images/expos/India.webp",
  "/images/expos/Gallery1.webp",
  "/images/expos/Gallery2.webp",
  "/images/expos/Minister_Testing.webp",
  "/images/expos/Team.jpeg",
  "/images/expos/Table.jpeg",
];

const testimonials = [
  {
    quote:
      "At TimeZone we have installed Straight Drive cricket simulators in almost 7 centres. We are very happy with the performance of the units and their service support. It's a very good product in terms of ROI. We recommend Straight Drive cricket simulators to all those who plan to add it to their facility.",
    author: "TimeZone Team",
    company: "TimeZone",
    photo: null,
  },
  {
    quote:
      "We have Straight Drive products in every centre of Busters. Most reliable manufacturer with great after-sales support. All the best for all your endeavours!",
    author: "Abhishek Jain",
    company: "Busters Gaming",
    photo: "/images/testimonials/Abhishek_Jain.webp",
  },
  {
    quote:
      "We have been associated with Straight Drive since two years and have it in all our centres. Straight Drive Cricket Simulators are a great concept where both parents and kids enjoy in our arena. I recommend every FEC to have this at your place.",
    author: "Sumit Ahuja",
    company: "Sim & Sam",
    photo: "/images/testimonials/Sumit_Ahuja.webp",
  },
  {
    quote:
      "We have been using the Straight Drive Cricket Simulator in the UK for the last four years, and it has proven to be a reliable and engaging system for both practice and entertainment.",
    author: "Mans",
    company: "Director, Sloggers",
    photo: null,
  },
];

const partners = [
  { name: "TimeZone", logo: "/images/partners/TimeZone.webp" },
  { name: "Google", logo: "/images/partners/Google.webp" },
  { name: "Samsung", logo: "/images/partners/Samsung.webp" },
  { name: "Intel", logo: "/images/partners/Intel.webp" },
  { name: "Embassy Group", logo: "/images/partners/EmbassyGroup.webp" },
  { name: "Lulu", logo: "/images/partners/Lulu.webp" },
  { name: "Funtura", logo: "/images/partners/Funtura.webp" },
  { name: "Sloggers", logo: "/images/partners/Sloggers_UK_logo.webp" },
  { name: "Play Arena", logo: "/images/partners/PlayArena.webp" },
  { name: "Loco Bear", logo: "/images/partners/LocoBear.webp" },
  { name: "Masti Zone", logo: "/images/partners/MastiZone.webp" },
  { name: "Bustterz", logo: "/images/partners/Bustterz.webp" },
  { name: "Glued", logo: "/images/partners/Glued.webp" },
];

export default function About() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[320px] md:h-[380px] overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/about-hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/60 to-navy-deep/30" />
        <div className="relative z-10 h-full flex items-center justify-center">
          <h1 className="font-display text-4xl md:text-6xl font-bold text-center">
            <GradientText>About Us</GradientText>
          </h1>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <Eyebrow>About Us</Eyebrow>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-ink mb-4">
              Who We Are?
            </h2>
            <p className="text-muted leading-relaxed">
              Straight Drive Sports &amp; Leisure Pvt. Ltd. is a sports
              technology company designing and manufacturing intelligent systems
              for professional training and interactive entertainment. We build
              integrated sports solutions that combine engineering, gameplay,
              and data to deliver engaging, reliable, and scalable experiences.
            </p>
          </div>
          <div className="aspect-video rounded-2xl bg-navy-card border border-ink/10 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/about/Team.jpeg"
              alt="Straight Drive team at work"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Vision */}
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center mb-20">
          <div className="aspect-video rounded-2xl bg-navy-card border border-ink/10 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/vision/Just_logo.svg"
              alt="Straight Drive vision"
              className="w-full h-full object-contain p-4"
            />
          </div>
          <div>
            <Eyebrow>Our Vision</Eyebrow>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-ink mb-4">
              Built to lead the category.
            </h2>
            <p className="text-muted leading-relaxed">
              To be the world&apos;s most trusted name in sports
              technology — engineering training and entertainment systems that
              venues, academies and players rely on every single day.
            </p>
          </div>
        </div>

        {/* Where We Operate */}
        <div className="max-w-7xl mx-auto">
         <div className="mb-10 text-center max-w-2xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl font-bold">
              <GradientText>Where We Operate</GradientText>
            </h2>
            <p className="mt-3 text-muted text-sm">
              A small info about our office &amp; factory.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="rounded-2xl border border-cyan/20 bg-navy-card overflow-hidden">
             <div className="aspect-video bg-navy-deep overflow-hidden border-b border-cyan/20">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/operate/RDLab.webp"
                  alt="R&D Lab, Bangalore"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8">
                <h3 className="font-display text-xl font-semibold text-cyan mb-3">
                  R&amp;D Lab
                </h3>
                <p className="text-muted text-sm leading-relaxed">
                  Our corporate office is located in HSR, Bangalore, where all
                  sales and R&amp;D activities are carried out.
                </p>
              </div>
            </div>
            <div className="rounded-2xl border border-green/20 bg-navy-card overflow-hidden">
             <div className="aspect-video bg-navy-deep overflow-hidden border-b border-green/20">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/operate/Factory.webp"
                  alt="Factory, Hyderabad"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8">
                <h3 className="font-display text-xl font-semibold text-green mb-3">
                  Factory
                </h3>
                <p className="text-muted text-sm leading-relaxed">
                  Our in-house capabilities span mechanical design, electronics,
                  software, and gameplay, enabling deeply integrated products
                  rather than assembled solutions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

    

      {/* Global Expos */}
      <section className="py-20 px-6">
        <div className="max-w-[1240px] mx-auto">
          <div className="mb-12 text-center max-w-3xl mx-auto">
            <Eyebrow>Global Presence</Eyebrow>
            <h2 className="font-display font-bold text-ink text-[clamp(28px,3.6vw,40px)] mt-3">
              Our Presence at <GradientText>Global Expos.</GradientText>
            </h2>
            <p className="font-display font-semibold text-[15px] tracking-[0.14em] uppercase text-muted mt-5">
              IAAPI Mumbai / IAAPI Thailand / DEAL Dubai / AAA China / Expo India
            </p>
          </div>

          <Carousel>
            {expoPhotos.map((photo, idx) => (
              <div
                key={idx}
                className="snap-start shrink-0 w-[320px] md:w-[380px] aspect-video rounded-xl overflow-hidden border border-cyan/[0.16] bg-navy-card"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photo}
                  alt="Straight Drive at a global expo"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </Carousel>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6">
        <div className="max-w-[1240px] mx-auto">
          <div className="mb-12 text-center max-w-2xl mx-auto">
            <Eyebrow>Client Testimonials</Eyebrow>
            <h2 className="font-display font-bold text-ink text-[clamp(28px,3.6vw,40px)] mt-4">
              From the nets, and the party floor.
            </h2>
          </div>
          <Carousel>
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="snap-start shrink-0 w-[380px] md:w-[440px] flex flex-col rounded-[14px] bg-navy-card border border-cyan/[0.16] border-l-[3px] border-l-green p-7"
              >
                <p className="text-ink text-[15px] italic leading-relaxed flex-1">
                  &quot;{t.quote}&quot;
                </p>
                <footer className="flex items-center gap-3 mt-6 pt-5 border-t border-cyan/[0.16]">
                  <div
                    className="w-12 h-12 rounded-full shrink-0 overflow-hidden flex items-center justify-center text-muted text-[8px] font-display font-semibold uppercase tracking-[0.14em] text-center border border-cyan/[0.16]"
                    style={{
                      backgroundImage: "linear-gradient(160deg, #12294a, #0A192F)",
                    }}
                  >
                    {t.photo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={t.photo}
                        alt={t.author}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      "Photo"
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <b className="font-display text-ink uppercase tracking-[0.06em] text-[15px] block leading-tight">
                      {t.author}
                    </b>
                    <span className="font-display font-semibold text-cyan uppercase tracking-[0.1em] text-[12.5px]">
                      {t.company}
                    </span>
                  </div>
                </footer>
              </div>
            ))}
          </Carousel>
        </div>
      </section>

      {/* Trusted Clients / Partners */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <Eyebrow>Our Trusted Clients</Eyebrow>
          </div>
          <Marquee items={partners} />
        </div>
      </section>
    </>
  );
}