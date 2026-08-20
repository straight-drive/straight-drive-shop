// src/app/faq/page.js
"use client";

import { useState } from "react";
import GradientText from "../../components/ui/GradientText";
import { faqData, faqCategories } from "../../data/faq";

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? faqData
      : faqData.filter((item) => item.category === activeCategory);

  return (
    <>
      <section className="py-20 px-6 bg-navy-deep border-b border-cyan/[0.16]">
        <h1 className="font-display font-bold text-center text-[clamp(32px,4.5vw,52px)]">
          Frequently Asked <GradientText>Questions.</GradientText>
        </h1>
      </section>

      <section className="pt-16 pb-24 px-6">
        <div className="max-w-[900px] mx-auto">
         {/* Category filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-14">
            <button
              onClick={() => setActiveCategory("All")}
              className={`px-5 py-2.5 rounded-full text-xs font-display font-semibold uppercase tracking-wide transition-colors ${
                activeCategory === "All"
                  ? "bg-gradient-to-r from-cyan to-green text-navy-deep"
                  : "border border-ink/20 text-muted hover:text-ink hover:border-cyan/50"
              }`}
            >
              All <span className="opacity-70 ml-1">({faqData.length})</span>
            </button>
            {faqCategories.map((cat) => {
              const count = faqData.filter((f) => f.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2.5 rounded-full text-xs font-display font-semibold uppercase tracking-wide transition-colors ${
                    activeCategory === cat
                      ? "bg-gradient-to-r from-cyan to-green text-navy-deep"
                      : "border border-ink/20 text-muted hover:text-ink hover:border-cyan/50"
                  }`}
                >
                  {cat} <span className="opacity-70 ml-1">({count})</span>
                </button>
              );
            })}
          </div>

          {/* FAQ list */}
          <div className="space-y-4">
            {filtered.map((item) => (
              <details
                key={item.id}
                className="group rounded-xl border border-ink/10 bg-navy-card px-5 py-4"
              >
                <summary className="cursor-pointer font-display font-semibold text-ink list-none flex justify-between items-center gap-4">
                  {item.question}
                  <span className="text-cyan shrink-0 group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <p className="text-muted text-sm mt-3 leading-relaxed">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}