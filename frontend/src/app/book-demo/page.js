import Link from "next/link";
import { CheckCircle } from "lucide-react";
import GradientText from "../../components/ui/GradientText";
import Eyebrow from "../../components/ui/Eyebrow";
import CalendlyEmbed from "../../components/ui/CalendlyEmbed";

export const metadata = {
  title: "Book a Demo — Straight Drive",
  description:
    "Schedule a personalised walkthrough of Straight Drive machines and simulators with our team.",
};

const expectations = [
  {
    icon: "👤",
    title: "Expert walkthrough",
    desc: "A personalised tour from someone who actually builds and installs these machines.",
  },
  {
    icon: "⏱️",
    title: "30 to 60 minutes",
    desc: "Flexible timing that works around you and your team.",
  },
  {
    icon: "📊",
    title: "Live demo",
    desc: "Real installations and use cases relevant to your venue or academy.",
  },
  {
    icon: "💬",
    title: "Q&A session",
    desc: "Ask anything — layout, ROI, service, or technical detail.",
  },
];

const includes = [
  "Product and platform overview",
  "Custom layout review for your space",
  "Pricing and ROI discussion",
  "Installation and next steps",
];

const faqs = [
  { q: "Is there a cost for the demo?", a: "No — demos are completely free, with no obligation." },
  { q: "How long does it take?", a: "Typically 30 to 60 minutes, depending on your questions." },
  { q: "Do I need to prepare anything?", a: "Just your questions, and a rough idea of your space if you have one." },
  { q: "Can my team join?", a: "Absolutely — we can accommodate multiple people on the call." },
];

export default function BookDemo() {
  return (
    <>
      <section className="py-20 px-6 bg-navy-deep border-b border-cyan/[0.16]">
        <div className="max-w-[1240px] mx-auto text-center">
          <Eyebrow>Let&apos;s talk</Eyebrow>
          <h1 className="font-display font-bold text-[clamp(32px,4.5vw,52px)] mt-3">
            Book your <GradientText>demo.</GradientText>
          </h1>
          <p className="text-muted mt-4 max-w-[52ch] mx-auto">
            A personalised walkthrough of our machines and simulators, tailored
            to what you&apos;re building.
          </p>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-[1240px] mx-auto grid md:grid-cols-2 gap-[52px]">
          {/* Left — what to expect */}
          <div>
            <Eyebrow>What to expect</Eyebrow>
            <h2 className="font-display font-bold text-ink text-[clamp(26px,3.4vw,36px)] mt-3 mb-8">
              How the call works.
            </h2>

            <div className="space-y-6 mb-10">
              {expectations.map((e) => (
                <div key={e.title} className="flex gap-4">
                  <div className="text-3xl shrink-0">{e.icon}</div>
                  <div>
                    <b className="font-display uppercase tracking-[0.06em] text-ink block mb-1">
                      {e.title}
                    </b>
                    <p className="text-muted text-sm">{e.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-cyan/[0.16] bg-navy-card p-6">
              <b className="font-display uppercase tracking-[0.1em] text-[13px] text-cyan block mb-4">
                The demo includes
              </b>
              <ul className="space-y-2.5">
                {includes.map((i) => (
                  <li key={i} className="flex items-center gap-2.5 text-ink text-sm">
                    <CheckCircle size={17} className="text-green shrink-0" />
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right — Calendly */}
          <div>
            <div className="rounded-xl border border-cyan/[0.16] bg-navy-card p-6">
              <h3 className="font-display font-bold text-ink text-xl mb-5">
                Pick a time
              </h3>

              <CalendlyEmbed />

              <div className="border-t border-cyan/[0.16] mt-6 pt-6">
                <p className="text-muted text-sm mb-4">Or reach out directly:</p>
                <div className="space-y-3">
                  
                    <a href="mailto:sales@straightdrivesport.com"
                    className="block px-4 py-3 rounded-lg bg-gradient-to-r from-cyan to-green text-navy-deep text-center font-display font-semibold uppercase tracking-wide text-sm"
                  >
                    Email us
                  </a>
                  <Link
                     href="/contact"
                    className="block px-4 py-3 rounded-lg border border-cyan/[0.16] text-ink text-center font-display font-semibold uppercase tracking-wide text-sm hover:border-cyan/50 transition-colors"
                  >
                    Send a message
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-navy border-t border-cyan/[0.16]">
        <div className="max-w-[900px] mx-auto">
          <div className="text-center mb-10">
            <Eyebrow>Common questions</Eyebrow>
            <h2 className="font-display font-bold text-ink text-[clamp(26px,3.4vw,36px)] mt-3">
              Demo FAQs.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {faqs.map((f) => (
              <div key={f.q} className="rounded-xl border border-cyan/[0.16] bg-navy-card p-6">
                <b className="font-display text-ink block mb-2">{f.q}</b>
                <p className="text-muted text-sm">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}