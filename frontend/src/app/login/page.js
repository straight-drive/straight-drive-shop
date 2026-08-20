// src/app/login/page.js
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../../hooks/useAuth";
import Eyebrow from "../../components/ui/Eyebrow";
import PasswordInput from "../../components/ui/PasswordInput";
import GradientText from "../../components/ui/GradientText";
import GoogleSignInButton from "../../components/ui/GoogleSignInButton";

export default function Login() {
  const { login } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "", rememberMe: false });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      await login(form);
      router.push("/dashboard");
    } catch (err) {
      setError(err?.data?.message || "Invalid email or password");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-[70vh] flex items-center justify-center px-6 py-20">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Eyebrow>Welcome Back</Eyebrow>
          <h1 className="font-display text-3xl font-bold text-ink">
            Log in to <GradientText>Straight Drive.</GradientText>
          </h1>
        </div>

        {error && (
          <div className="mb-6 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="w-full bg-navy-card text-ink px-4 py-3 border-2 border-ink/10 rounded-lg focus:outline-none focus:border-cyan"
          />
          <PasswordInput
            value={form.password}
            onChange={handleChange}
            required
            className="bg-navy-card text-ink px-4 py-3 border-2 border-ink/10 rounded-lg focus:outline-none focus:border-cyan"
          />
          <label className="flex items-center gap-2 text-sm text-muted">
            <input
              name="rememberMe"
              type="checkbox"
              checked={form.rememberMe}
              onChange={handleChange}
            />
            Remember me
          </label>
          <div className="text-right">
            <Link href="/forgot-password" className="text-cyan text-sm hover:underline">
              Forgot password?
            </Link>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-cyan to-green text-navy-deep font-display font-semibold uppercase tracking-wide disabled:opacity-50"
          >
            {isSubmitting ? "Logging in..." : "Log In"}
          </button>
        </form>

        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-cyan/[0.16]" />
          <span className="text-muted text-xs uppercase tracking-wide">or</span>
          <div className="flex-1 h-px bg-cyan/[0.16]" />
        </div>

        <GoogleSignInButton onError={setError} />

        <p className="text-center text-muted text-sm mt-6">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-cyan hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </section>
  );
}