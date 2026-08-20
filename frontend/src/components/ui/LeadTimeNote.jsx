// src/components/ui/LeadTimeNote.jsx
import { Clock } from "lucide-react";

export default function LeadTimeNote({ time }) {
  if (!time) return null;

  return (
    <div className="flex items-start gap-2.5 mt-5 px-4 py-3 rounded-lg bg-cyan/[0.06] border border-cyan/[0.16]">
      <Clock size={16} className="text-cyan shrink-0 mt-0.5" />
      <p className="text-[13px] text-muted">
        Made to order — this product takes{" "}
        <b className="text-ink">{time}</b> to get dispatched.
      </p>
    </div>
  );
}