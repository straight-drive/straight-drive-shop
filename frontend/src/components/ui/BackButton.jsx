// src/components/ui/BackButton.jsx
"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function BackButton({ href }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 text-muted hover:text-cyan text-sm font-display font-semibold uppercase tracking-wide transition-colors"
    >
      <ArrowLeft size={16} />
      Back
    </Link>
  );
}