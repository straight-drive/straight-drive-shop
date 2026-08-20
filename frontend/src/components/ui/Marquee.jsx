export default function Marquee({ items }) {
  const doubled = [...items, ...items];

  return (
    <div className="marquee-track">
      <div className="marquee-row">
        {doubled.map((item, idx) => {
          const isImage = typeof item === "object" && item.logo;
          return (
           <div
              key={idx}
              className="flex items-center justify-center px-2 py-4 shrink-0"
            >
              {isImage ? (
                <div className="w-[180px] h-[90px] rounded-lg overflow-hidden bg-white/5 border border-cyan/[0.16] flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.logo}
                    alt={item.name || "Partner"}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <span className="text-muted font-display text-lg uppercase tracking-wide whitespace-nowrap">
                  {typeof item === "string" ? item : item.name}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}