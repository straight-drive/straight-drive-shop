// src/components/store/BallVariantSelector.jsx
"use client";

import { useState } from "react";

export default function BallVariantSelector({ variants, colors, onChange }) {
  const [sizeIdx, setSizeIdx] = useState(0);
  const [colorIdx, setColorIdx] = useState(0);

  const select = (nextSizeIdx, nextColorIdx) => {
    setSizeIdx(nextSizeIdx);
    setColorIdx(nextColorIdx);
    onChange({ size: variants[nextSizeIdx], color: colors[nextColorIdx] });
  };

  return (
    <div className="space-y-5 mb-6">
      <div>
        <span className="text-muted text-xs font-display uppercase tracking-wide block mb-2.5">
          Pack size
        </span>
        <div className="flex gap-3">
          {variants.map((v, idx) => (
            <button
              key={v.label}
              onClick={() => select(idx, colorIdx)}
              className={`flex flex-col items-center gap-1.5 rounded-lg border p-3 w-[100px] transition-colors ${
                idx === sizeIdx
                  ? "border-cyan bg-cyan/10"
                  : "border-cyan/[0.16] hover:border-cyan/40"
              }`}
            >
              <div
                className="w-10 h-10 rounded-full"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(-45deg, rgba(255,255,255,.05) 0 6px, transparent 6px 12px), linear-gradient(160deg, #12294a, #0A192F)",
                }}
              />
              <span className="text-[13px] font-display font-semibold text-ink">{v.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <span className="text-muted text-xs font-display uppercase tracking-wide block mb-2.5">
          Colour
        </span>
        <div className="flex gap-3">
          {colors.map((c, idx) => (
            <button
              key={c.label}
              onClick={() => select(sizeIdx, idx)}
              className={`flex flex-col items-center gap-1.5 rounded-lg border p-3 w-[100px] transition-colors ${
                idx === colorIdx
                  ? "border-cyan bg-cyan/10"
                  : "border-cyan/[0.16] hover:border-cyan/40"
              }`}
            >
              <div
                className="w-10 h-10 rounded-full border border-white/10"
                style={{ backgroundColor: c.hex }}
              />
                        <span className="text-[13px] font-display font-semibold text-ink">{c.label}</span>
              {c.weight ? (
                <span className="text-[11px] text-muted">{c.weight}</span>
              ) : null}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}