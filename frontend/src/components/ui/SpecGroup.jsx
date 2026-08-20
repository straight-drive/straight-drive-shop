export default function SpecGroup({ title, rows }) {
  return (
    <div className="rounded-xl border border-cyan/[0.16] bg-navy-card overflow-hidden mb-[18px]">
      <h4 className="flex items-center gap-3 font-display font-bold text-[14px] tracking-[0.18em] uppercase px-[22px] py-4 bg-cyan/[0.06] border-b border-cyan/[0.16]">
        <span className="w-1 h-[18px] rounded-sm bg-gradient-to-r from-cyan to-green shrink-0" />
        {title}
      </h4>
      <dl>
        {rows.map((row, idx) => (
          <div
            key={idx}
            className={`grid grid-cols-[38%_1fr] gap-4 items-center px-[22px] py-3.5 ${
              idx > 0 ? "border-t border-cyan/[0.09]" : ""
            }`}
          >
            <dt className="text-[14px] text-muted">{row.label}</dt>
            <dd className="text-[15px] font-medium text-ink">
              {row.tbc ? (
                <span className="text-muted italic text-[13px]">To be confirmed</span>
              ) : row.list ? (
                <span className="flex flex-wrap gap-1.5">
                  {row.list.map((v) => (
                    <span
                      key={v}
                      className="font-mono text-xs text-cyan border border-cyan/[0.16] rounded-full px-2.5 py-1"
                    >
                      {v}
                    </span>
                  ))}
                </span>
              ) : (
                row.value
              )}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}