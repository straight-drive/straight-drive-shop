"use client";

import { useState } from "react";
import { contactService } from "../../services/contactService";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Cricket bowling machines",
    message: "",
  });
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setStatus("sending");
    try {
      await contactService.submit(form);
      setStatus("sent");
      setForm({
        name: "",
        email: "",
        phone: "",
        subject: "Cricket bowling machines",
        message: "",
      });
    } catch (err) {
      setError(err?.data?.message || "Could not send your message");
      setStatus("idle");
    }
  };

  if (status === "sent") {
    return (
      <div className="rounded-xl border border-cyan/[0.16] bg-navy-card p-8 text-center">
        <h3 className="font-display font-bold text-ink text-xl mb-2">Message sent.</h3>
        <p className="text-muted text-sm mb-5">
          Thanks for getting in touch — we reply within one business day.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="text-cyan text-sm font-display uppercase tracking-wide"
        >
          Send another message
        </button>
      </div>
    );
  }

  const inputClass =
    "w-full bg-navy-deep border border-cyan/[0.16] rounded-md text-ink text-[15px] px-[15px] py-[13px] focus:outline-none focus:border-cyan";
  const labelClass =
    "font-display font-semibold text-xs tracking-[0.16em] uppercase text-muted block mb-[7px]";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error ? <p className="text-red-400 text-sm">{error}</p> : null}

      <div>
        <label className={labelClass}>Name</label>
        <input name="name" value={form.name} onChange={handleChange} required className={inputClass} />
      </div>
      <div>
        <label className={labelClass}>Email</label>
        <input name="email" type="email" value={form.email} onChange={handleChange} required className={inputClass} />
      </div>
      <div>
        <label className={labelClass}>Phone</label>
        <input name="phone" value={form.phone} onChange={handleChange} className={inputClass} />
      </div>
      <div>
        <label className={labelClass}>I am interested in</label>
        <select name="subject" value={form.subject} onChange={handleChange} className={inputClass}>
          <option>Cricket bowling machines</option>
          <option>Bowling machine balls</option>
          <option>Cricket Simulator / venue</option>
          <option>Pixel Play / SubGoal Soccer</option>
          <option>Dealership / partnership</option>
          <option>Service / support</option>
        </select>
      </div>
      <div>
        <label className={labelClass}>Message</label>
        <textarea
          name="message"
          rows={4}
          value={form.message}
          onChange={handleChange}
          required
          minLength={10}
          className={inputClass}
        />
      </div>

      <div className="flex items-center justify-between gap-4 flex-wrap">
        <span className="text-muted text-[13px]">We reply within one business day.</span>
        <button
          type="submit"
          disabled={status === "sending"}
          className="px-[26px] py-[13px] rounded bg-gradient-to-r from-cyan to-green text-navy-deep font-display font-semibold uppercase tracking-[0.08em] text-[15px] disabled:opacity-50"
        >
          {status === "sending" ? "Sending..." : "Send message"}
        </button>
      </div>
    </form>
  );
}