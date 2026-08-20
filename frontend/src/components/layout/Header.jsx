// src/components/layout/Header.jsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ShoppingCart, User, Menu, X } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { useCart } from "../../context/CartContext";
import PasswordInput from "../ui/PasswordInput";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Performance Training", href: "/performance-training" },
  { label: "Entertainment", href: "/entertainment" },
  { label: "Book a Demo", href: "/book-demo" },
];

export default function Header() {
  const { user, isAuthenticated, login } = useAuth();
  const { cartCount } = useCart();
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const [showLogin, setShowLogin] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      await login(form);
      setShowLogin(false);
      router.push("/dashboard");
    } catch (err) {
      setError(err?.data?.message || "Invalid email or password");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-navy-deep/90 border-b border-cyan/[0.16]">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-6">
        <Link href="/" className="flex items-center shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/vision/hero_logo.svg"
            alt="Straight Drive"
            className="h-9 w-auto"
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-1 font-display text-sm uppercase tracking-wide">
          {NAV_LINKS.map((link) => {
            const isActive = !link.href.includes("#") && pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`px-4 py-2.5 rounded-md transition-colors ${
                  isActive
                    ? "text-ink bg-cyan/10 shadow-[inset_0_-2px_0_var(--color-cyan)]"
                    : "text-muted hover:text-ink"
                }`}
              >
                {link.label}
              </Link>
            );
          })}

         <div className="relative">
            <button
              onClick={() => setShowHelp((v) => !v)}
              className="px-4 py-2.5 rounded-md transition-colors text-muted hover:text-ink"
            >
              Help
            </button>

            {showHelp ? (
              <div className="absolute left-0 mt-3 w-44 z-50 rounded-xl bg-navy-card border border-ink/10 py-2 shadow-xl normal-case">
                <Link
                  href="/faq"
                  className="block px-4 py-2 text-sm text-ink hover:text-cyan hover:bg-navy-deep/50 transition-colors"
                  onClick={() => setShowHelp(false)}
                >
                  FAQ
                </Link>
                <Link
                  href="/contact"
                  className="block px-4 py-2 text-sm text-ink hover:text-cyan hover:bg-navy-deep/50 transition-colors"
                  onClick={() => setShowHelp(false)}
                >
                  Contact Us
                </Link>
              </div>
            ) : null}
          </div>
        </nav>
          <div className="flex items-center gap-5 shrink-0">
          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Menu"
            className="lg:hidden text-ink hover:text-cyan transition-colors"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
          {mounted && isAuthenticated ? (
            <Link href="/dashboard" className="text-ink hover:text-cyan transition-colors">
              <User size={20} />
            </Link>
          ) : (
            <div className="relative">
              <button
                onClick={() => setShowLogin((v) => !v)}
                className="font-display text-sm uppercase tracking-wide text-ink hover:text-cyan transition-colors"
              >
                Sign In
              </button>

              {showLogin && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowLogin(false)} />
                  <div className="absolute right-0 mt-3 w-72 z-50 rounded-xl bg-navy-card border border-ink/10 p-5 shadow-xl">
                    <h3 className="font-display text-sm uppercase tracking-wide text-ink mb-3">
                      Sign In
                    </h3>
                    {error && <p className="text-red-400 text-xs mb-3">{error}</p>}
                    <form onSubmit={handleSubmit} className="space-y-3">
                      <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Email"
                        required
                        className="w-full bg-navy-deep text-ink text-sm px-3 py-2 border border-ink/10 rounded-lg focus:outline-none focus:border-cyan"
                      />
                      <PasswordInput
                        value={form.password}
                        onChange={handleChange}
                        required
                        className="bg-navy-deep text-ink text-sm px-3 py-2 border border-ink/10 rounded-lg focus:outline-none focus:border-cyan"
                      />
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full px-3 py-2 rounded-lg bg-gradient-to-r from-cyan to-green text-navy-deep text-sm font-display font-semibold uppercase tracking-wide disabled:opacity-50"
                      >
                        {isSubmitting ? "Signing in..." : "Sign In"}
                      </button>
                    </form>
                    <p className="text-center mt-3">
                      <Link
                        href="/forgot-password"
                        className="text-cyan text-xs hover:underline"
                        onClick={() => setShowLogin(false)}
                      >
                        Forgot password?
                      </Link>
                    </p>
                    <p className="text-muted text-xs mt-4 text-center">
                      Don&apos;t have an account?{" "}
                      <Link href="/signup" className="text-cyan hover:underline" onClick={() => setShowLogin(false)}>
                        Sign up
                      </Link>
                    </p>
                  </div>
                </>
              )}
            </div>
          )}
         

          <Link href="/cart" className="relative text-ink hover:text-cyan transition-colors">
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 w-4 h-4 flex items-center justify-center rounded-full bg-cyan text-navy-deep text-[10px] font-bold">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {mobileOpen ? (
        <div className="lg:hidden border-t border-cyan/[0.16] bg-navy-deep px-6 py-4">
          <nav className="flex flex-col gap-1 font-display text-sm uppercase tracking-wide">
            {NAV_LINKS.map((link) => {
              const isActive = !link.href.includes("#") && pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`px-4 py-3 rounded-md transition-colors ${
                    isActive ? "text-ink bg-cyan/10" : "text-muted hover:text-ink"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/faq"
              onClick={() => setMobileOpen(false)}
              className="px-4 py-3 rounded-md text-muted hover:text-ink transition-colors"
            >
              FAQ
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="px-4 py-3 rounded-md text-muted hover:text-ink transition-colors"
            >
              Contact Us
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}