"use client";
import { useState } from "react";
import Link from "next/link";
import { simContent } from "../../../data/simulatorContent";
import BackButton from "../../../components/ui/BackButton";
import TierBadge from "../../../components/ui/TierBadge";
import GradientText from "../../../components/ui/GradientText";
import YouMightLike from "../../../components/store/YouMightLike";
import { Settings, Monitor, ClipboardList, Video, Camera, Layers, Clock, User, Target, List, Users, Trophy, Cpu, Radio, Code } from "lucide-react";
const PART_ICONS = {
  gear: Settings,
  monitor: Monitor,
  clipboard: ClipboardList,
  video: Video,
  camera: Camera,
  layers: Layers,
  clock: Clock,
  user: User,
  target: Target,
  list: List,
  users: Users,
  trophy: Trophy,
  cpu: Cpu,
  radio: Radio,
  code: Code,
};

function PartCard({ part }) {
  const Icon = PART_ICONS[part.icon];
  return (
    <div className="relative rounded-xl border border-cyan/40 bg-navy-card px-5 pt-7 pb-5 text-center">
      <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-green text-navy-deep font-display font-bold text-[13px] flex items-center justify-center">
        {part.num}
      </span>
      <b className="block font-display font-bold uppercase tracking-[0.06em] text-[14px] text-ink mb-3">
        {part.title}
      </b>
      {Icon ? <Icon size={22} className="mx-auto text-cyan" /> : null}
    </div>
  );
}



const PH_BG =
  "repeating-linear-gradient(-45deg, rgba(255,255,255,.03) 0 12px, transparent 12px 24px), linear-gradient(160deg, #12294a, #0A192F)";

function Kicker({ eyebrow, title, badge, badgeColor = "cyan" }) {
  const badgeClass =
    badgeColor === "green"
      ? "text-green border-green/40"
      : badgeColor === "gold"
      ? "text-[#F2C14E] border-[#F2C14E]/40"
      : "text-cyan border-cyan/[0.16]";
  return (
    <div className="flex items-baseline justify-between gap-5 flex-wrap mb-[38px]">
      <div>
        <span className="block font-display font-semibold text-[13px] tracking-[0.28em] uppercase text-cyan">
          {eyebrow}
        </span>
        <h2 className="font-display font-bold text-ink text-[clamp(26px,3.4vw,40px)] mt-2.5">
          {title}
        </h2>
      </div>
      {badge ? (
        <span
          className={`font-display font-bold text-[11px] tracking-[0.2em] uppercase border rounded-full px-3.5 py-1.5 whitespace-nowrap ${badgeClass}`}
        >
          {badge}
        </span>
      ) : null}
    </div>
  );
}

function FCard({ ph, photo, fit, title, desc }) {
  return (
    <div className="rounded-xl border border-cyan/[0.16] bg-navy-card overflow-hidden flex flex-col">
      <div
        className="aspect-video overflow-hidden bg-navy-deep"
        style={{ backgroundImage: photo ? undefined : PH_BG }}
      >
        {photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={photo}
            alt={title}
            className={`w-full h-full ${fit === "contain" ? "object-contain" : "object-cover"}`}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-center px-4 text-muted text-[10px] font-display font-semibold uppercase tracking-[0.18em]">
            {ph}
          </div>
        )}
      </div>
      <div className="px-5 py-[18px]">
        <b className="font-display uppercase tracking-[0.08em] text-[15.5px] block mb-1.5 text-cyan">
          {title}
        </b>
        {desc ? <span className="text-[13.5px] text-muted">{desc}</span> : null}
      </div>
    </div>
  );
}

export default function CricketSimulator() {
  const [locationTab, setLocationTab] = useState("india");
  const locations =
    locationTab === "india" ? simContent.indiaLocations : simContent.overseasLocations;
  return (
    <>
     <div className="px-6 pt-6">
        <BackButton href="/entertainment" />
      </div>

      {/* Hero */}
      <section className="py-20 pb-16">
        <div className="max-w-[1240px] mx-auto px-6 grid md:grid-cols-[1fr_1.05fr] gap-[52px] items-center">
          <div>
            <TierBadge>Flagship</TierBadge>
            <h1 className="font-display font-bold text-ink text-[clamp(40px,5vw,64px)] mt-2">
              CRICKET <GradientText><em className="italic">SIMULATOR</em></GradientText>
            </h1>
            <div className="inline-flex items-center gap-2.5 border border-green rounded-md px-[18px] py-2.5 my-4 font-display font-bold tracking-[0.14em] uppercase text-green text-sm">
              Play together. Win together.
            </div>
            <p className="text-muted text-[17px] max-w-[52ch] mb-6">
              Turn any venue into a buzzing social hub — gamified cricket for
              friends, families and corporate teams.
            </p>
            <div className="flex flex-wrap gap-3 mb-[30px]">
              {["🎮 Gamified", "👥 Multiplayer", "🏆 Social"].map((c) => (
                <span
                  key={c}
                  className="inline-flex items-center gap-2 font-display font-semibold text-[13px] tracking-[0.14em] uppercase text-cyan border border-cyan/[0.16] rounded-full px-[18px] py-2"
                >
                  {c}
                </span>
              ))}
            </div>
           <div className="flex flex-wrap gap-4">
              <Link
                href="/book-demo"
                className="px-6 py-3 rounded bg-gradient-to-r from-cyan to-green text-navy-deep font-display font-semibold uppercase tracking-wide text-sm"
              >
                Book a demo
              </Link>
              <Link
               href="/contact"
                className="px-6 py-3 rounded bg-gradient-to-r from-cyan to-green text-navy-deep font-display font-semibold uppercase tracking-wide text-sm"
              >
                Request a proposal
              </Link>
              
               <a href="/brochures/cricket-simulator.pdf"
                download
                className="px-6 py-3 rounded border border-cyan/[0.16] text-ink font-display font-semibold uppercase tracking-wide text-sm hover:border-cyan/50 transition-colors"
              >
                Download brochure
              </a>
            </div>
          </div>

        <div className="relative aspect-video rounded-xl border border-cyan/[0.16] overflow-hidden bg-navy-deep">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="/videos/crick-sim.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </section>

      {/* Immersive simulation */}
      <section className="py-[72px] border-t border-cyan/[0.16]">
        <div className="max-w-[1240px] mx-auto px-6">
          <Kicker
            eyebrow="Next-gen experience"
            title="Immersive simulation."
            badge="Premium entertainment"
          />
          <div className="grid gap-5" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))" }}>
            {simContent.immersive.map((c) => (
              <FCard key={c.title} {...c} />
            ))}
          </div>
        </div>
      </section>

      {/* Installations */}
      <section className="py-[72px] border-t border-cyan/[0.16] bg-navy">
        <div className="max-w-[1240px] mx-auto px-6">
          <Kicker
            eyebrow="Proven at scale"
            title={
              locationTab === "india"
                ? "Hundreds of installations in India."
                : "Reaching almost every nation."
            }
            badge="India + 10 nations"
            badgeColor="green"
          />

                  <div className="flex gap-4 mb-9">
            <button
              onClick={() => setLocationTab("india")}
              className={`rounded-full px-10 py-4 font-display font-bold text-[16px] tracking-[0.16em] uppercase transition-all ${
                locationTab === "india"
                  ? "bg-gradient-to-r from-cyan to-green text-navy-deep shadow-[0_6px_24px_rgba(0,181,223,.35)] scale-105"
                  : "border-2 border-cyan/30 text-muted hover:text-ink hover:border-cyan/60"
              }`}
            >
              India
            </button>
            <button
              onClick={() => setLocationTab("overseas")}
              className={`rounded-full px-10 py-4 font-display font-bold text-[16px] tracking-[0.16em] uppercase transition-all ${
                locationTab === "overseas"
                  ? "bg-gradient-to-r from-cyan to-green text-navy-deep shadow-[0_6px_24px_rgba(0,181,223,.35)] scale-105"
                  : "border-2 border-cyan/30 text-muted hover:text-ink hover:border-cyan/60"
              }`}
            >
              Overseas
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {locations.map((loc) => (
              <div
                key={loc.name}
                className="rounded-lg border border-cyan/[0.16] bg-navy-card overflow-hidden"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={loc.photo}
                    alt={loc.name}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
                <b className="block text-center font-display font-bold text-[13px] tracking-[0.12em] uppercase py-2.5 px-1.5">
                  {loc.name}
                </b>
              </div>
            ))}
          </div>
                      </div>
      </section>

      {/* Major parts */}
      <section className="py-[72px] border-t border-cyan/[0.16]">
        <div className="max-w-[1240px] mx-auto px-6">
          <div className="text-center mb-10">
            <span className="block font-display font-semibold text-[13px] tracking-[0.28em] uppercase text-green mb-4">
              System architecture
            </span>
            <h2 className="inline-block font-display font-bold text-ink text-[clamp(20px,3vw,32px)] uppercase tracking-[0.04em] border-2 border-green/50 rounded-full px-8 py-3">
              Major parts of a <GradientText>cricket simulator</GradientText>
            </h2>
          </div>

          {/* Desktop: 3 left, image centre, 3 right */}
          <div className="hidden md:grid md:grid-cols-[1fr_1.6fr_1fr] gap-6 items-center">
            <div className="flex flex-col gap-6">
              {simContent.parts.slice(0, 3).map((p) => (
                <PartCard key={p.num} part={p} />
              ))}
            </div>

                        <div className="aspect-[4/3] rounded-xl border border-cyan/[0.16] overflow-hidden bg-navy-deep">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/products/Cricket-sim.jpeg"
                alt="Cricket simulator batting cage"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-col gap-6">
              {simContent.parts.slice(3).map((p) => (
                <PartCard key={p.num} part={p} />
              ))}
            </div>
          </div>

          {/* Mobile: image first, then parts in two columns */}
          <div className="md:hidden">
                      <div className="aspect-[4/3] rounded-xl border border-cyan/[0.16] overflow-hidden bg-navy-deep mb-8">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/products/Cricket-sim.jpeg"
                alt="Cricket simulator batting cage"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-2 gap-5">
              {simContent.parts.map((p) => (
                <PartCard key={p.num} part={p} />
              ))}
            </div>
          </div>

          {/* Size requirement band */}
          <div className="mt-10 rounded-xl border border-green/40 overflow-hidden">
            <div className="bg-green/10 border-b border-green/30 py-3.5 text-center">
              <b className="font-display font-bold uppercase tracking-[0.14em] text-[15px] text-green">
                Size requirement in meters
              </b>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-green/20">
              {simContent.sizes.map((s) => (
                <div key={s.label} className="py-6 px-4 text-center">
                  <span className="block font-display uppercase tracking-[0.14em] text-[13px] text-muted mb-1.5">
                    {s.label}
                  </span>
                                    <b className="font-mono text-[22px] font-semibold text-cyan">{s.value}</b>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      
      {/* Robot */}
      <section className="py-[72px] border-t border-cyan/[0.16] bg-navy">
        <div className="max-w-[1240px] mx-auto px-6 grid md:grid-cols-[1.05fr_.95fr] gap-11 items-center">
          <div>
            <span className="block font-display font-semibold text-[13px] tracking-[0.28em] uppercase text-cyan">
              The robot behind the screen
            </span>
            <h2 className="font-display font-bold text-ink text-[clamp(26px,3.4vw,40px)] mt-2.5 mb-1.5">
              Turbo Spin <GradientText>intelligent robot.</GradientText>
            </h2>
            <span className="inline-block font-display font-bold text-[11px] tracking-[0.2em] uppercase border border-cyan/[0.16] text-cyan rounded-full px-3.5 py-1.5 mb-6">
                           BLDC Technology
            </span>
            <h3 className="font-display font-semibold text-ink text-[20px] mb-4">
              BLDC equipped &amp; intelligent
            </h3>
            <div>
              {simContent.robot.map((r) => (
                <div
                  key={r.title}
                  className="border border-cyan/[0.16] rounded-[10px] bg-navy-card px-5 py-4 mb-3 flex gap-3.5 items-start"
                >
                  <span className="text-green text-base leading-normal">✓</span>
                  <span>
                    <b className="font-display uppercase tracking-[0.06em] text-[15.5px] block text-ink">
                      {r.title}
                    </b>
                    <span className="text-[13.5px] text-muted">{r.desc}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div
            className="aspect-[3/4] max-h-[560px] rounded-[14px] border border-cyan/[0.16] flex items-center justify-center text-center px-6 text-muted text-[11px] font-display font-semibold uppercase tracking-[0.18em]"
            style={{ backgroundImage: PH_BG }}
          >
            Robot photo — Turbo Spin unit with feeder column
          </div>
        </div>
      </section>
            {/* Features & customization */}
      <section className="py-[72px] border-t border-cyan/[0.16]">
        <div className="max-w-[1240px] mx-auto px-6">
          <Kicker
            eyebrow="Easy to use and operate"
            title="Features & customization."
            badge="Game setup"
            badgeColor="green"
          />

          <div className="grid lg:grid-cols-[1.1fr_.9fr] gap-6 items-start">
            <div className="grid sm:grid-cols-2 gap-5">
              {simContent.features.map((f) => {
                const Icon = PART_ICONS[f.icon];
                return (
                  <div
                    key={f.title}
                    className="rounded-[14px] border border-cyan/[0.16] bg-navy-card p-6"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <span className="w-10 h-10 rounded-full border border-cyan/40 flex items-center justify-center text-cyan shrink-0">
                        {Icon ? <Icon size={19} /> : null}
                      </span>
                      <b className="font-display font-bold uppercase tracking-[0.06em] text-[15px] text-ink">
                        {f.title}
                      </b>
                    </div>
                    <ul className="space-y-2.5">
                      {f.points.map((p) => (
                        <li
                          key={p}
                          className="flex gap-2.5 text-[13.5px] text-muted leading-relaxed"
                        >
                          <span className="text-green shrink-0">›</span>
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>

            <div className="grid grid-cols-2 gap-5">
              {simContent.featureScreens.map((s) => (
                <div
                  key={s.alt}
                  className="aspect-[3/4] rounded-[14px] border border-cyan/[0.16] overflow-hidden bg-navy-deep"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={s.photo}
                    alt={s.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

     {/* Game modes */}
      <section className="py-[72px] border-t border-cyan/[0.16]">
        <div className="max-w-[1240px] mx-auto px-6">
          <Kicker eyebrow="Gameplay" title="Game modes." />
          <div className="grid md:grid-cols-2 gap-6">
            {simContent.modes.map((m) => (
              <div key={m.title} className="rounded-[14px] border border-cyan/[0.16] bg-navy-card p-[30px]">
                             <div className="aspect-video rounded-lg border border-cyan/[0.16] overflow-hidden bg-navy-deep mb-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={m.photo}
                    alt={m.title}
                    className="w-full h-full object-contain"
                  />
                </div>
                <span
                  className={`inline-block font-display font-bold text-[11px] tracking-[0.2em] uppercase rounded-[3px] px-3 py-1 mb-3.5 ${
                    m.tagColor === "green" ? "bg-green/15 text-green" : "bg-cyan/15 text-cyan"
                  }`}
                >
                  {m.tag}
                </span>
                <h3 className="font-display font-bold text-ink text-[26px] mb-3">{m.title}</h3>
                {m.items.map((i) => (
                  <div key={i.b} className="flex gap-3 mb-3 text-[13.5px] text-muted">
                    <span>{i.icon}</span>
                    <span>
                      <b className="text-ink block text-sm">{i.b}</b>
                      {i.t}
                    </span>
                  </div>
                ))}
                <div className="border-t border-cyan/[0.16] mt-[18px] pt-3.5 text-[12.5px] text-muted">
                  <b className="font-display tracking-[0.14em] uppercase text-[11px] text-green block mb-1">
                    Ideal for
                  </b>
                  {m.env}
                </div>
              </div>
            ))}
          </div>
          
        </div>
      </section>
            {/* Leaderboard display */}
      <section className="py-[72px] border-t border-cyan/[0.16] bg-navy">
        <div className="max-w-[1240px] mx-auto px-6">
          <Kicker
            eyebrow="Spectator engagement"
            title="External screen for leaderboard display."
            badge="Live audience view"
          />

          <div className="grid lg:grid-cols-[.85fr_1.15fr] gap-8 items-center">
            <div className="flex flex-col gap-5">
              {simContent.leaderboard.map((item) => {
                const Icon = PART_ICONS[item.icon];
                return (
                  <div
                    key={item.title}
                    className="rounded-[14px] border border-cyan/[0.16] bg-navy-card p-6"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span className="w-11 h-11 rounded-xl border border-cyan/40 flex items-center justify-center text-cyan shrink-0">
                        {Icon ? <Icon size={20} /> : null}
                      </span>
                      <b className="font-display font-bold uppercase tracking-[0.06em] text-[15px] text-ink">
                        {item.title}
                      </b>
                    </div>
                    <p className="text-[13.5px] text-muted leading-relaxed">{item.desc}</p>
                  </div>
                );
              })}
            </div>

                        <div className="aspect-[16/10] rounded-[14px] border border-cyan/[0.16] overflow-hidden bg-navy-deep">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/simulator/screens/leaderboard.jpg"
                alt="Live leaderboard on the external screen"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Bowlers */}
      <section className="py-[72px] border-t border-cyan/[0.16] bg-navy">
        <div className="max-w-[1240px] mx-auto px-6">
          <Kicker
            eyebrow="Authentic gameplay"
            title="Face international bowlers."
            badge="Real video simulation"
          />
          <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
            {simContent.bowlers.map((b) => (
              <div key={b} className="rounded-[10px] border border-cyan/[0.16] bg-navy-card overflow-hidden">
                <div
                  className="aspect-[3/4] flex items-center justify-center text-muted text-[9.5px] font-display font-semibold uppercase tracking-[0.16em]"
                  style={{ backgroundImage: "linear-gradient(160deg, #12294a, #0A192F)" }}
                >
                  Bowler photo
                </div>
                <b className="block text-center font-display font-bold text-sm tracking-[0.1em] uppercase py-3 px-2 text-cyan">
                  {b}
                </b>
              </div>
            ))}
          </div>
          <p className="text-muted text-sm mt-[22px]">
            Real match footage — actual run-up and release point, with each bowler&apos;s unique action and variations.
          </p>
        </div>
      </section>

      {/* Autoscoring */}
      <section className="py-[72px] border-t border-cyan/[0.16]">
        <div className="max-w-[1240px] mx-auto px-6">
          <Kicker
            eyebrow="Precision technology"
            title="Autoscoring system."
            badge="Patent pending"
            badgeColor="green"
          />
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-[14px] border border-cyan/[0.16] bg-navy-card p-7 relative">
              <h3 className="font-display font-bold text-ink text-[22px] mb-2.5">Sensor zones</h3>
              <p className="text-muted text-sm mb-5">
                Sensor-based net in customizable scoring zones — hit anywhere to register a score.
              </p>
              <div className="grid grid-cols-3 gap-2 max-w-[340px]">
                {[
                  { v: "6", c: "gold" }, { v: "4" }, { v: "6", c: "gold" },
                  { v: "2" }, { v: "OUT", c: "out" }, { v: "3" },
                  { v: "1" }, { v: "0" }, { v: "1" },
                ].map((z, i) => (
                  <div
                    key={i}
                    className={`aspect-video border rounded-md grid place-items-center font-mono font-semibold text-xl ${
                      z.c === "gold"
                        ? "text-[#F2C14E] border-[#F2C14E]/50"
                        : z.c === "out"
                        ? "text-[#E4586A] border-[#E4586A]/50"
                        : "text-cyan border-cyan/[0.16]"
                    }`}
                  >
                    {z.v}
                  </div>
                ))}
              </div>
              <ul className="mt-[18px] text-[13px] text-muted list-disc pl-5">
                <li className="mb-1.5">Scores per zone customizable (1–6, OUT, NO RUN).</li>
                <li className="mb-1.5">Instant LED feedback on every hit.</li>
                <li>Entire net surface is game-ready.</li>
              </ul>
            </div>

            <div className="rounded-[14px] border border-cyan/[0.16] bg-navy-card p-7 relative">
              <span className="absolute top-[22px] right-[22px] font-display font-bold text-[11px] tracking-[0.2em] uppercase border border-[#F2C14E]/40 text-[#F2C14E] rounded-full px-3.5 py-1.5">
                New
              </span>
              <h3 className="font-display font-bold text-ink text-[22px] mb-2.5">Target boards</h3>
              <p className="text-muted text-sm mb-5">
                Rectangular physical targets — aim for specific locations to score.
              </p>
              <div
                className="relative border border-green/30 rounded-lg h-[220px]"
                style={{ backgroundImage: "linear-gradient(160deg, #12294a, #0A192F)" }}
              >
                <div className="absolute border-2 border-green rounded grid place-items-center font-mono font-semibold text-green" style={{ width: "22%", height: "22%", left: "10%", top: "18%" }}>4</div>
                <div className="absolute border-2 border-green rounded grid place-items-center font-mono font-semibold text-green" style={{ width: "22%", height: "22%", right: "10%", top: "18%" }}>4</div>
                <div className="absolute border-2 border-[#F2C14E] rounded grid place-items-center font-mono font-semibold text-[#F2C14E]" style={{ width: "32%", height: "24%", left: "34%", bottom: "16%" }}>6</div>
              </div>
              <ul className="mt-[18px] text-[13px] text-muted list-disc pl-5">
                <li className="mb-1.5">Accuracy training with defined areas.</li>
                <li className="mb-1.5">Cost-effective, skill-focused setup.</li>
                <li>Reconfigure targets per drill.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

    

      {/* Display options */}
      <section className="py-[72px] border-t border-cyan/[0.16]">
        <div className="max-w-[1240px] mx-auto px-6">
          <Kicker
            eyebrow="Visual hardware"
            title="Display options."
            badge="Screen protection"
          />
          <div className="grid md:grid-cols-2 gap-6">
            {simContent.displayOptions.map((col) => (
              <div
                key={col.title}
                className={`rounded-[14px] border bg-navy-card p-7 ${
                  col.tagColor === "green" ? "border-green/35" : "border-cyan/[0.16]"
                }`}
              >
                <span
                  className={`inline-block font-display font-bold text-[11px] tracking-[0.18em] uppercase border rounded-full px-3.5 py-1.5 mb-4 ${
                    col.tagColor === "green"
                      ? "text-green border-green/40"
                      : "text-cyan border-cyan/[0.16]"
                  }`}
                >
                  {col.tag}
                </span>

                <h3 className="font-display font-bold text-ink text-[26px] mb-5">{col.title}</h3>



                {col.points.map((p) => (
                  <div key={p.b} className="mb-4 last:mb-0">
                    <b className="block font-display uppercase tracking-[0.06em] text-[15px] text-ink mb-1">
                      {p.b}
                    </b>
                    <span className="text-[13.5px] text-muted leading-relaxed">{p.t}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
            {/* Batting cage specifications */}
      <section className="py-[72px] border-t border-cyan/[0.16] bg-navy">
        <div className="max-w-[1240px] mx-auto px-6">
          <Kicker
            eyebrow="Facility hardware"
            title="Batting cage specifications."
            badge="Standard dimensions"
            badgeColor="green"
          />

          <div className="grid lg:grid-cols-2 gap-6 items-start">
            <div className="rounded-[14px] border border-cyan/[0.16] bg-navy-card overflow-hidden">
              <div className="grid grid-cols-[110px_1fr] gap-4 px-6 py-4 border-b-2 border-green/50">
                <b className="font-display font-bold uppercase tracking-[0.1em] text-[12px] text-ink">
                  Component
                </b>
                <b className="font-display font-bold uppercase tracking-[0.1em] text-[12px] text-ink">
                  Specification
                </b>
              </div>

              {simContent.cageSpecs.map((row) => (
                <div
                  key={row.component}
                  className="grid grid-cols-[110px_1fr] gap-4 px-6 py-6 border-b border-cyan/[0.12] last:border-b-0"
                >
                  <b className="font-display font-semibold text-[16px] text-green">
                    {row.component}
                  </b>
                  <div className="space-y-1.5">
                    {row.lines.map((l, i) =>
                      l.b ? (
                        <p key={i} className="text-[14px] text-ink font-medium">
                          {l.b}
                        </p>
                      ) : (
                        <p key={i} className="text-[13px] text-muted">
                          {l.t}
                        </p>
                      )
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="aspect-[4/3] rounded-[14px] border border-cyan/[0.16] overflow-hidden bg-navy-deep">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/simulator\immersive\cage-setup.jpg"
                alt="Complete cage setup"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <p className="text-muted text-[13px] mt-5">
            Customization available upon request.
          </p>
        </div>
      </section>

      {/* In-house manufacturing */}
      <section className="py-[72px] border-t border-cyan/[0.16]">
        <div className="max-w-[1240px] mx-auto px-6">
          <Kicker
            eyebrow="Competitive advantage"
            title="In-house manufacturing."
            badge="In-house deep tech"
          />

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <div className="flex flex-col gap-4">
                      {simContent.manufacturing.map((m) => (
                <div
                  key={m.b}
                  className="rounded-[10px] border border-cyan/[0.16] bg-navy-card px-5 py-4 flex gap-3.5 items-start"
                >
                  <span className="text-green text-base leading-normal shrink-0">✓</span>
                  <span>
                    <b className="font-display uppercase tracking-[0.06em] text-[15px] block text-ink mb-0.5">
                      {m.b}
                    </b>
                    <span className="text-[13.5px] text-muted">{m.t}</span>
                  </span>
                </div>
              ))}

              {/* Architecture stack */}
              <div className="mt-4">
                <div className="flex items-center gap-2 mb-3">
                  <Layers size={15} className="text-green" />
                  <span className="font-display font-semibold text-[13px] tracking-[0.14em] uppercase text-green">
                    Architecture stack
                  </span>
                </div>

                <div className="rounded-full border-2 border-green/60 bg-green/[0.06] py-4 text-center mb-3.5">
                  <b className="font-display font-bold uppercase tracking-[0.12em] text-[17px] text-ink">
                    {simContent.architectureStack.core}
                  </b>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {simContent.architectureStack.layers.map((l) => {
                    const Icon = PART_ICONS[l.icon];
                    return (
                      <div
                        key={l.label}
                        className="rounded-full border border-cyan/[0.3] py-3 flex items-center justify-center gap-2 text-cyan"
                      >
                        {Icon ? <Icon size={15} /> : null}
                        <span className="font-display font-semibold text-[13px] tracking-[0.06em]">
                          {l.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              {simContent.facilities.map((f) => (
                <div
                  key={f.title}
                  className="rounded-[14px] border border-cyan/[0.16] bg-navy-card p-5 grid sm:grid-cols-[1fr_1.1fr] gap-5 items-center"
                >
                  <div className="aspect-[4/3] rounded-lg border border-cyan/[0.16] overflow-hidden bg-navy-deep">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={f.photo}
                      alt={f.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <b className="block font-display font-bold uppercase tracking-[0.06em] text-[15px] text-cyan border-b border-cyan/25 pb-2.5 mb-3">
                      {f.title}
                    </b>
                    <ul className="space-y-1.5">
                      {f.points.map((p) => (
                        <li key={p} className="text-[13.5px] text-muted">
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="text-center font-display font-bold uppercase tracking-[0.1em] text-[15px] text-ink mt-10">
            Own the stack. Scale the platform. Win the market.
          </p>
        </div>
      </section>

      {/* Clients + CTA */}
      <section className="py-[72px] border-t border-cyan/[0.16] bg-navy pb-0">
        <div className="max-w-[1240px] mx-auto px-6">
          <Kicker eyebrow="Trusted by" title="Valued clients." />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {simContent.clients.map((c) => (
              <div
                key={c.name}
                className="border border-cyan/[0.16] rounded-lg bg-white/[0.06] h-[90px] overflow-hidden"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={c.logo}
                  alt={c.name}
                  className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity"
                />
              </div>
            ))}
          </div>

          <div
            className="bg-gradient-to-r from-cyan to-green rounded-2xl text-navy-deep grid md:grid-cols-[1.2fr_.8fr] gap-8 items-center"
            style={{ padding: "52px 40px", margin: "64px 0" }}
          >
            <div>
              <h2 className="font-display font-bold text-[clamp(24px,3.2vw,36px)] mb-2">
                Put a cricket stadium in your venue.
              </h2>
              <p className="font-medium">
                Book a demo or send us your floor plan — we&apos;ll come back with a layout and a number.
              </p>
              <p className="text-[13.5px] font-semibold mt-2.5">
                sales@straightdrivesport.com · +91 90009 88633 · +91 79959 98880
              </p>
            </div>
            <div className="flex gap-3.5 flex-wrap md:justify-end">
              <Link
                href="/book-demo"
                className="px-6 py-3 rounded bg-navy-deep text-white font-display font-semibold uppercase tracking-wide text-sm"
              >
                Book a demo
              </Link>
              <Link
                href="/contact"
                className="px-6 py-3 rounded border-2 border-navy-deep text-navy-deep font-display font-semibold uppercase tracking-wide text-sm"
              >
                Partner with us
              </Link>
            </div>
          </div>
        </div>
      </section>

      <YouMightLike currentKey="cricket-simulator" />
    </>
  );
}