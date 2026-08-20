"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authService } from "../../services/authService";
import GradientText from "../../components/ui/GradientText";

export default function ForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      await authService.forgotPassword(email);
      router.push(`/reset-password?email=${encodeURIComponent(email)}`);
    } catch (err) {
      setError(err?.data?.message || "Something went wrong. Please try again.");
      setBusy(false);
    }
  };

  return (
    <section className="min-h-[70vh] flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md">
        <h1 className="font-display font-bold text-3xl mb-2">
          Forgot your <GradientText>password?</GradientText>
        </h1>
        <p className="text-muted text-sm mb-8">
          Enter your email and we will send you a 6-digit code to reset it.
        </p>

        {error ? (
          <div className="mb-5 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
            {error}
          </div>
        ) : null}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            required
            className="w-full bg-navy-card border border-cyan/[0.16] rounded-md text-ink px-4 py-3 focus:outline-none focus:border-cyan"
          />
          <button
            type="submit"
            disabled={busy}
            className="w-full px-6 py-3.5 rounded bg-gradient-to-r from-cyan to-green text-navy-deep font-display font-semibold uppercase tracking-wide text-sm disabled:opacity-50"
          >
            {busy ? "Sending..." : "Send reset code"}
          </button>
        </form>

        <p className="text-muted text-sm mt-6 text-center">
          Remembered it?{" "}
          <Link href="/login" className="text-cyan hover:underline">
            Back to login
          </Link>
        </p>
      </div>
    </section>
  );
}