"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { authService } from "../../services/authService";
import PasswordInput from "../../components/ui/PasswordInput";
import GradientText from "../../components/ui/GradientText";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState(searchParams.get("email") || "");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      await authService.resetPassword({ email, otp, password });
      setDone(true);
    } catch (err) {
      setError(err?.data?.message || "Could not reset your password");
    } finally {
      setBusy(false);
    }
  };

  if (done) {
    return (
      <div className="w-full max-w-md text-center">
        <h1 className="font-display font-bold text-3xl mb-3">
          Password <GradientText>updated.</GradientText>
        </h1>
        <p className="text-muted text-sm mb-8">
          You can now sign in with your new password.
        </p>
        <Link
          href="/login"
          className="inline-block px-6 py-3 rounded bg-gradient-to-r from-cyan to-green text-navy-deep font-display font-semibold uppercase tracking-wide text-sm"
        >
          Go to login
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md">
      <h1 className="font-display font-bold text-3xl mb-2">
        Reset your <GradientText>password.</GradientText>
      </h1>
      <p className="text-muted text-sm mb-8">
        Enter the 6-digit code we emailed you, along with a new password.
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
        <input
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
          placeholder="6-digit code"
          inputMode="numeric"
          required
          className="w-full bg-navy-card border border-cyan/[0.16] rounded-md text-ink px-4 py-3 font-mono text-lg tracking-[0.3em] text-center focus:outline-none focus:border-cyan"
        />
        <PasswordInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="New password"
          required
          className="bg-navy-card border border-cyan/[0.16] rounded-md text-ink px-4 py-3 focus:outline-none focus:border-cyan"
        />
        <button
          type="submit"
          disabled={busy}
          className="w-full px-6 py-3.5 rounded bg-gradient-to-r from-cyan to-green text-navy-deep font-display font-semibold uppercase tracking-wide text-sm disabled:opacity-50"
        >
          {busy ? "Resetting..." : "Reset password"}
        </button>
      </form>

      <p className="text-muted text-sm mt-6 text-center">
        Need a new code?{" "}
        <Link href="/forgot-password" className="text-cyan hover:underline">
          Request another
        </Link>
      </p>
    </div>
  );
}

export default function ResetPassword() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center px-6 py-16">
      <Suspense fallback={<p className="text-muted">Loading...</p>}>
        <ResetPasswordForm />
      </Suspense>
    </section>
  );
}