"use client";

import { useEffect } from "react";
import { Calendar } from "lucide-react";

// Set this in .env.local as NEXT_PUBLIC_CALENDLY_URL once you have your link,
// e.g. https://calendly.com/straightdrive/30min
const CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_URL;

export default function CalendlyEmbed() {
  useEffect(() => {
    if (!CALENDLY_URL) return;
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  if (!CALENDLY_URL) {
    return (
      <div className="rounded-lg border border-dashed border-cyan/30 bg-navy-deep p-10 text-center">
        <Calendar size={40} className="text-cyan mx-auto mb-4" />
        <b className="font-display uppercase tracking-[0.08em] text-ink block mb-2">
          Scheduling coming soon
        </b>
        <p className="text-muted text-sm">
          Booking calendar is being set up. In the meantime, use the contact
          options below and we&apos;ll get back to you within one business day.
        </p>
      </div>
    );
  }

  return (
    <div
      className="calendly-inline-widget rounded-lg overflow-hidden"
      data-url={`${CALENDLY_URL}?hide_landing_page_details=1&hide_gdpr_banner=1&background_color=0D1F3A&text_color=EAF2F7&primary_color=00B5DF`}
      style={{ minWidth: "320px", height: "620px" }}
    />
  );
}