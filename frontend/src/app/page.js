// src/app/page.js
import Link from "next/link";
import Eyebrow from "../components/ui/Eyebrow";
import GradientText from "../components/ui/GradientText";
import Carousel from "../components/ui/Carousel";
import Marquee from "../components/ui/Marquee";
import ContactForm from "../components/store/ContactForm";
import LocationCards from "../components/ui/LocationCards";
import { getByKey } from "../data/productCatalog";

const hotItems = [
  {
    tag: "New Launch",
    title: "PaceAttack Pro",
    desc: "PaceAttack Pro is in market now !!",
    media: getByKey("paceattack-pro")?.cardPhoto,
    type: "image",
  },
  {
    tag: "Coming Soon",
    title: "Twister",
    desc: "Dedicated spin machine, launching this year.",
    media: getByKey("twister")?.cardPhoto,
    type: "image",
  },
  {
    tag: "Flagship",
    title: "Cricket Simulator",
    desc: "Full-lane simulation for venues.",
    media: getByKey("cricket-simulator")?.cardPhoto,
    type: "image",
  },
  {
    tag: "New Venue",
    title: "Cricket Simulator at Timezone",
    desc: "Timezone Zirakpur gets its very own semi-outdoor cricket simulator — and it looks absolutely impressive! ",
    media: "/images/hot/Venue.jpg",
    type: "image",
  },
];

const venues = [
  {
    name: "Timezone, Ambience Mall",
    location: "Delhi, India",
    desc: "Timezone opens Straight Drive cricket simulator with autoscoring and large LED screen at Ambience Mall, Delhi.",
    photo: "/images/venues/Timezone_Delhi.webp",
  },
  {
    name: "Century Cricket",
    location: "Houston, USA",
    desc: "Century Cricket, Houston (USA), opens AI-powered batting lanes using Straight Drive cricket bowling machines.",
    photo: "/images/venues/Century_Cricket_USA.webp",
  },
  {
    name: "Union Minister of Tourism",
    location: "India",
    desc: "Hon'ble Union Minister of Tourism trying out the Straight Drive cricket simulator.",
    photo: "/images/venues/Minister_Testing.webp",
  },
  {
    name: "PlayArena",
    location: "Bengaluru, India",
    desc: "Visit our Experience Zone at Play Arena, Sarjapura for all the latest updates.",
    photo: "/images/venues/Play_Arena.webp",
  },
  {
    name: "Nets Premier League",
    location: "Brampton, Canada",
    desc: "Nets Premier League Canada launches a new venue in Brampton featuring our cricket simulator.",
    photo: "/images/venues/Brampton_Canada.webp",
  },
];
const testimonials = [
  {
    quote:
      "At TimeZone we have installed Straight Drive cricket simulators in almost 7 centres. We are very happy with the performance of the units and their service support. It's a very good product in terms of ROI. We recommend Straight Drive cricket simulators to all those who plan to add it to their facility.",
    author: "TimeZone Team",
    company: "TimeZone",
    photo: "/images/testimonials/TimeZone.webp",
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
      "We have been associated with Straight Drive since two years and have it in all our centres. Straight Drive Cricket Simulators are a great concept where both parents and kids enjoy in our arena. I recommend every FEC to have this at your place. I wish Straight Drive all the best!",
    author: "Sumit Ahuja",
    company: "Sim & Sam",
    photo: "/images/testimonials/Sumit_Ahuja.webp",
  },
  {
    quote:
      "We have been using the Straight Drive Cricket Simulator in the UK for the last four years, and it has proven to be a reliable and engaging system for both practice and entertainment.",
    author: "Mans",
    company: "Director, Sloggers",
    photo: "/images/testimonials/Sloggers_UK_logo.webp",
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
const memberships = [
  { name: "IAAPA", logo: "/images/memberships/IAAPA_logo.webp" },
  { name: "IAAPI", logo: "/images/memberships/IAAPI_logo.webp" },
  { name: "Startup India", logo: "/images/memberships/startup-india_logo.webp" },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[86vh] max-h-[780px] min-h-[540px] overflow-hidden">
               <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
          <source src="/videos/paceattack.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/25 via-navy-deep/55 to-navy-deep" />
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="max-w-[900px] px-6 text-center">
                        <h1 className="font-display font-bold text-ink leading-[1.05] text-[clamp(46px,7vw,92px)] mb-[18px]">
              Play the <GradientText>Future.</GradientText>
            </h1>

            <div className="flex flex-wrap gap-4 justify-center">
              
               <a href="#entertainment"
                className="inline-flex items-center px-[26px] py-[13px] rounded bg-gradient-to-r from-cyan to-green text-navy-deep font-display font-semibold uppercase tracking-[0.08em] text-[15px] shadow-[0_6px_24px_rgba(0,181,223,.25)] hover:-translate-y-0.5 transition-transform"
              >
                Entertainment
              </a>
              
              <a  href="#performance"
                className="inline-flex items-center px-[26px] py-[13px] rounded bg-navy-card border border-cyan text-cyan font-display font-semibold uppercase tracking-[0.08em] text-[15px] shadow-[0_6px_24px_rgba(0,181,223,.2)] hover:bg-navy-deep hover:-translate-y-0.5 transition-all"
              >
                Performance Training
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* What's Hot */}
      <section className="py-12 sm:py-20 border-b border-cyan/[0.16]">
        <div className="max-w-7xl mx-auto px-6">
          <Eyebrow>What&apos;s Hot</Eyebrow>
          <h2 className="font-display font-bold text-ink text-[clamp(28px,3.6vw,40px)] mt-3">
            New at <GradientText>Straight Drive.</GradientText>
          </h2>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-9">
          <Carousel>
            {hotItems.map((item, idx) => (
              <div
                key={idx}
                className="snap-start shrink-0 w-[320px] md:w-[340px] bg-navy-card border border-cyan/[0.16] rounded-xl overflow-hidden"
              >
                <div className="aspect-video bg-navy-deep relative overflow-hidden">
                  {item.media ? (
                    item.type === "video" ? (
                      <video
                        src={item.media}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.media}
                        alt={item.title}
                        className="w-full h-full object-contain"
                      />
                    )
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted text-[11px] font-display font-semibold uppercase tracking-[0.2em]">
                      Photo / Video
                    </div>
                  )}
                  <span className="absolute top-3 left-3 z-10 font-display font-bold text-[12px] tracking-[0.18em] uppercase bg-gradient-to-r from-cyan to-green text-navy-deep rounded-[4px] px-3.5 py-[6px]">
                    {item.tag}
                  </span>
                </div>
                <div className="px-5 py-[18px]">
                  <time className="font-mono text-[11.5px] text-cyan">{item.date}</time>
                  <h3 className="font-display font-bold text-lg text-ink mt-[5px] mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-[13.5px] text-muted">{item.desc}</p>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-navy border-b border-cyan/[0.16]">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-[18px] px-6 py-[42px]">
          {[
            { value: "10 M+", label: "Engagements" },
            { value: "13+", label: "Countries" },
            { value: "400+", label: "Installations" },
            { value: "10 yrs", label: "Of expertise" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <b className="font-mono text-4xl font-semibold bg-gradient-to-r from-cyan to-green bg-clip-text text-transparent">
                {stat.value}
              </b>
              <span className="block text-[12.5px] tracking-[0.18em] uppercase text-muted mt-1.5 font-display font-semibold">
                {stat.label}
              </span>
            </div>
          ))}
          </div>

          <div className="border-t border-cyan/[0.16] px-6 py-10">
           <p className="text-center font-display font-bold text-[20px] tracking-[0.1em] uppercase text-muted mb-8">
              Our <span className="text-green">Memberships</span>
            </p>
            <div className="flex flex-wrap items-center justify-center gap-10">
              {memberships.map((m) => (
                <div key={m.name} className="w-[140px] h-[70px] flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={m.logo}
                    alt={m.name}
                    className="max-w-full max-h-full object-contain opacity-80 hover:opacity-100 transition-opacity"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      {/* Entertainment — GREEN */}
      <section id="entertainment" className="py-14 sm:py-24 px-6 border-b border-cyan/[0.16] scroll-mt-24">
        <div className="max-w-[1240px] mx-auto">
          <Eyebrow color="green">For venues, malls &amp; events</Eyebrow>
          <h2 className="font-display font-bold text-ink text-[clamp(40px,6vw,72px)] mt-4">
            Entertain<GradientText>ment.</GradientText>
          </h2>
          <p className="text-muted max-w-[56ch] mt-3.5">
            Sports entertainment that keeps queues forming — anchored by our flagship.
          </p>

          <div className="mt-12">
            <Link
              href="/entertainment/cricket-simulator"
              className="group relative block rounded-[14px] border border-cyan/[0.16] overflow-hidden cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:border-cyan/[0.55]"
            >
              <div className="aspect-[4/3] sm:aspect-[21/9] overflow-hidden bg-navy-deep">
                <video autoPlay muted loop playsInline className="w-full h-full object-cover">
                  <source src="/videos/crick-sim.mp4" type="video/mp4" />
                </video>
              </div>

              <div
                className="absolute inset-0 flex flex-col justify-between sm:justify-center px-[6%] pt-6 pb-2 sm:py-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(6,15,33,.75) 0%, transparent 35%, transparent 55%, rgba(6,15,33,.9) 100%)",
                }}
              >
                <span className="inline-block w-max font-display font-bold italic text-xs tracking-[0.24em] uppercase bg-gradient-to-r from-cyan to-green text-navy-deep rounded-[3px] px-3.5 py-[5px] sm:mb-3.5">
                  Flagship
                </span>

                <div className="sm:pr-0">
                  <h3 className="font-display font-bold text-ink text-[clamp(24px,4vw,52px)] leading-tight whitespace-nowrap">
                    CRICKET{" "}
                    <em className="not-italic">
                      <GradientText>
                        <em className="italic">SIMULATOR</em>
                      </GradientText>
                    </em>
                  </h3>
                  <p className="text-ink/85 text-[11px] sm:text-[14.5px] mt-0.5 sm:mt-2.5 pr-24 sm:pr-0 whitespace-nowrap">
                    Real bowling, autoscoring, big-screen gameplay.
                  </p>
                  <span className="absolute bottom-2 right-[6%] sm:static sm:mt-3 sm:block font-display font-semibold uppercase tracking-[0.1em] text-[13px] sm:text-[15px] text-cyan group-hover:text-ink transition-colors">
                    Explore →
                  </span>
                </div>
              </div>
            </Link>

            <Link
              href="/entertainment/subgoal-soccer"
              className="group relative block rounded-[14px] border border-cyan/[0.16] overflow-hidden cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:border-cyan/[0.55] mt-6"
            >
              <div className="aspect-[4/3] sm:aspect-[21/9] overflow-hidden bg-navy-deep">
                <video autoPlay muted loop playsInline className="w-full h-full object-cover">
                  <source src="/videos/Subgoal.mp4" type="video/mp4" />
                </video>
              </div>

              <div
                className="absolute inset-0 flex flex-col justify-between sm:justify-center px-[6%] pt-6 pb-2 sm:py-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(6,15,33,.75) 0%, transparent 35%, transparent 55%, rgba(6,15,33,.9) 100%)",
                }}
              >
                <span className="inline-block w-max font-display font-bold italic text-xs tracking-[0.24em] uppercase bg-gradient-to-r from-cyan to-green text-navy-deep rounded-[3px] px-3.5 py-[5px] sm:mb-3.5">
                  Social Game
                </span>

                <div className="sm:pr-0">
                  <h3 className="font-display font-bold text-ink text-[clamp(24px,4vw,52px)] leading-tight">
                    SUBGOAL <GradientText>SOCCER</GradientText>
                  </h3>
                  <p className="text-ink/85 text-[12px] sm:text-[14.5px] mt-0.5 sm:mt-2.5 pr-24 sm:pr-0">
                    Fast, social, endlessly replayable.
                  </p>
                  <span className="absolute bottom-2 right-[6%] sm:static sm:mt-3 sm:block font-display font-semibold uppercase tracking-[0.1em] text-[13px] sm:text-[15px] text-cyan group-hover:text-ink transition-colors">
                    Explore →
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Performance Training — CYAN */}
      <section id="performance" className="py-14 sm:py-24 px-6 bg-navy border-t border-cyan/[0.16] scroll-mt-24">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <Eyebrow>For athletes, academies &amp; clubs</Eyebrow>
            <h2 className="font-display font-bold text-ink text-[clamp(40px,6vw,72px)] mt-4">
              Performance <GradientText>Training.</GradientText>
            </h2>
            <p className="text-muted max-w-[56ch] mt-3.5">
              Serious practice equipment, engineered and built by us.
            </p>
          </div>

          <Link
            href="/performance-training/paceattack-pro"
            className="group relative block rounded-[14px] border border-cyan/[0.16] overflow-hidden cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:border-cyan/[0.55] mt-12"
          >
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

                          <div
                className="absolute inset-0 flex flex-col justify-between sm:justify-center px-[6%] pt-6 pb-2 sm:py-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(6,15,33,.75) 0%, transparent 35%, transparent 55%, rgba(6,15,33,.9) 100%)",
                }}
              >
                <span className="inline-block w-max font-display font-bold italic text-xs tracking-[0.24em] uppercase bg-gradient-to-r from-cyan to-green text-navy-deep rounded-[3px] px-3.5 py-[5px] sm:mb-3.5">
                  New Launch
                </span>

              <div className="sm:pr-0">
                <h3 className="font-display font-bold text-ink text-[clamp(24px,4vw,52px)] leading-tight">
                  PACEATTACK <GradientText>PRO</GradientText>
                </h3>
                <p className="text-ink/85 text-[12px] sm:text-[14.5px] mt-0.5 sm:mt-2.5 pr-24 sm:pr-0">
                  Up to 160 km/h, with swing and full app control.
                </p>
                               <span className="absolute bottom-2 right-[6%] sm:static sm:mt-3 sm:block font-display font-semibold uppercase tracking-[0.1em] text-[13px] sm:text-[15px] text-cyan group-hover:text-ink transition-colors">
                  Explore →
                </span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* About teaser */}
     <section className="pt-14 sm:pt-24 pb-6 sm:pb-10 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                   <div className="aspect-video rounded-xl bg-navy-card border border-cyan/[0.16] overflow-hidden order-2 md:order-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/about/Team.jpeg"
              alt="Straight Drive team"
              className="w-full h-full object-cover"
            />
          </div>
                   <div className="order-1 md:order-2">
            <Eyebrow>About <GradientText>Us</GradientText></Eyebrow>
            <p className="text-ink text-lg font-medium mb-4">
              One company, <GradientText>Two engines.</GradientText>
            </p>
            <p className="text-muted mb-6">
              Brainpower in Bengaluru, muscle in Hyderabad — our own R&amp;D lab
              and factory, ~36 people, building on one platform since 2016.
            </p>
            <Link
              href="/about"
              className="font-display font-semibold uppercase tracking-[0.1em] text-[15px] text-cyan"
            >
              Meet the team →
            </Link>
          </div>
        </div>
      </section>

              {/* Works */}
        <section className="pt-14 sm:pt-24 pb-6 sm:pb-10 px-6">
        <div className="max-w-7xl mx-auto">
                   <Eyebrow>Our Successful <GradientText>Works</GradientText></Eyebrow>
          <p className="text-ink text-lg font-medium mb-3">
            Success stories from the field.
          </p>
          <p className="text-muted max-w-xl mb-10">
            A few of the venues running Straight Drive equipment.
          </p>
          <Carousel>
            {venues.map((venue, idx) => (
              <div
                key={idx}
                className="snap-start shrink-0 w-[280px] md:w-[320px] rounded-xl overflow-hidden bg-navy-card border border-cyan/[0.16]"
              >
                <div className="aspect-video bg-navy-deep overflow-hidden">
                  {venue.photo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={venue.photo}
                      alt={venue.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted text-[11px] font-display font-semibold uppercase tracking-[0.2em]">
                      Photo
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-display font-bold text-ink mb-1 uppercase tracking-[0.02em]">
                    {venue.name}
                  </h3>
                  <div className="text-muted text-xs mb-2">{venue.location}</div>
                  <p className="text-muted text-[13.5px]">{venue.desc}</p>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </section>

    {/* Testimonials */}
       <section className="pt-6 sm:pt-10 pb-10 sm:pb-20 px-6">
        <div className="max-w-[1240px] mx-auto">
          <div className="mb-8 text-center max-w-2xl mx-auto">
          <Eyebrow>Client <GradientText>Testimonials</GradientText></Eyebrow>
            <p className="text-ink text-lg font-medium mt-2">
              From the nets, and the party floor.
            </p>
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
                    style={{ backgroundImage: "linear-gradient(160deg, #12294a, #0A192F)" }}
                  >
                    {t.photo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={t.photo} alt={t.author} className="w-full h-full object-cover" />
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

      {/* Partners */}
      <section className="py-10 sm:py-16 px-6 bg-navy-deep/40">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <Eyebrow>Our Proud <GradientText>Partners</GradientText></Eyebrow>
            <p className="text-ink text-base font-medium">
              Trusted by the best in the business.
            </p>
          </div>
         <Marquee items={partners} />
        </div>
      </section>

      {/* Contact */}
           <section id="contact" className="py-14 sm:py-24 px-6 bg-navy border-t border-cyan/[0.16] scroll-mt-24">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
          <div>
            <Eyebrow><GradientText>Contact</GradientText></Eyebrow>
            <p className="text-ink text-lg font-medium mb-4">
              Let's talk cricket.
            </p>
            <p className="text-muted mb-8">
              Tell us what you&apos;re building — a home net, an academy, or a
              full entertainment venue.
            </p>

            <div className="mb-8">
              <LocationCards />
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="flex gap-3">
                <span className="text-cyan text-lg leading-none mt-0.5">✉</span>
                <div>
                  <b className="text-ink font-display uppercase tracking-[0.08em] text-[13.5px] block mb-1">
                    Email
                  </b>
                  
                   <a href="mailto:info@straightdrivesport.com"
                    className="text-muted text-sm hover:text-cyan transition-colors"
                  >
                    info@straightdrivesport.com
                  </a>
                </div>
              </div>

              <div className="flex gap-3">
                <span className="text-cyan text-lg leading-none mt-0.5">☎</span>
                <div>
                  <b className="text-ink font-display uppercase tracking-[0.08em] text-[13.5px] block mb-1">
                    Phone No
                  </b>
                  
                   <a href="tel:+919000988633"
                    className="text-muted text-sm hover:text-cyan transition-colors block"
                  >
                    +91 90009 88633
                  </a>
                  
                  <a  href="tel:+917995998880"
                    className="text-muted text-sm hover:text-cyan transition-colors block"
                  >
                    +91 79959 98880
                  </a>
                </div>
              </div>
            </div>
          </div>

          <ContactForm />
        </div>
      </section>
    </>
  );
}