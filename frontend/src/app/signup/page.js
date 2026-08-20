// src/app/signup/page.js
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../../hooks/useAuth";
import Eyebrow from "../../components/ui/Eyebrow";
import PasswordInput from "../../components/ui/PasswordInput";
import GradientText from "../../components/ui/GradientText";
import GoogleSignInButton from "../../components/ui/GoogleSignInButton";

export default function Signup() {
  const { signup } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ name: "", company: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      await signup(form);
      router.push("/dashboard");
    } catch (err) {
      setError(err?.data?.message || "Could not create account");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-[70vh] flex items-center justify-center px-6 py-20">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Eyebrow>Join Us</Eyebrow>
          <h1 className="font-display text-3xl font-bold text-ink">
            Create your <GradientText>account.</GradientText>
          </h1>
        </div>

        {error && (
          <div className="mb-6 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full name"
            required
            className="w-full bg-navy-card text-ink px-4 py-3 border-2 border-ink/10 rounded-lg focus:outline-none focus:border-cyan"
          />
          <input
            name="company"
            value={form.company}
            onChange={handleChange}
            placeholder="Company (optional)"
            className="w-full bg-navy-card text-ink px-4 py-3 border-2 border-ink/10 rounded-lg focus:outline-none focus:border-cyan"
          />
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
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-cyan to-green text-navy-deep font-display font-semibold uppercase tracking-wide disabled:opacity-50"
          >
            {isSubmitting ? "Creating account..." : "Sign Up"}
          </button>
       </form>

        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-cyan/[0.16]" />
          <span className="text-muted text-xs uppercase tracking-wide">or</span>
          <div className="flex-1 h-px bg-cyan/[0.16]" />
        </div>

        <GoogleSignInButton onError={setError} />

        <p className="text-center text-muted text-sm mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-cyan hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </section>
  );
}