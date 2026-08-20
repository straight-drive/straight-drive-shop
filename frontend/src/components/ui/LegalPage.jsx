import GradientText from "./GradientText";

export default function LegalPage({ title, titleAccent, lastUpdated, sections }) {
  return (
    <>
      <section className="py-20 px-6 bg-navy-deep border-b border-cyan/[0.16]">
        <div className="max-w-[820px] mx-auto text-center">
          <h1 className="font-display font-bold text-[clamp(32px,4.5vw,52px)]">
            {title} <GradientText>{titleAccent}</GradientText>
          </h1>
          {lastUpdated ? (
            <p className="text-muted text-sm mt-4">Last updated: {lastUpdated}</p>
          ) : null}
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-[820px] mx-auto space-y-10">
          {sections.map((s) => (
            <div key={s.heading}>
              <h2 className="font-display font-bold text-ink text-xl mb-4">
                {s.heading}
              </h2>
              <ul className="space-y-2.5">
                {s.items.map((item, i) => (
                  <li key={i} className="flex gap-3 text-muted text-[15px] leading-relaxed">
                    <span className="text-cyan shrink-0 mt-1.5 w-1 h-1 rounded-full bg-cyan" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}