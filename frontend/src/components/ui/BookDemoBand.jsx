import Link from "next/link";

export default function BookDemoBand({
  title = "See it in person.",
  text = "Book a demo and we'll walk you through it — layout, gameplay, numbers, whatever you need.",
}) {
  return (
    <section className="max-w-[1240px] mx-auto px-6 pb-16">
      <div
        className="bg-gradient-to-r from-cyan to-green rounded-2xl text-navy-deep grid md:grid-cols-[1.2fr_.8fr] gap-8 items-center"
        style={{ padding: "52px 40px" }}
      >
        <div>
          <h2 className="font-display font-bold text-[clamp(24px,3.2vw,36px)] mb-2">
            {title}
          </h2>
          <p className="font-medium">{text}</p>
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
            Talk to us
          </Link>
        </div>
      </div>
    </section>
  );
}