import Link from "next/link";

export default function CheckoutSuccess() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center text-center px-6">
      <div>
        <h1 className="font-display font-bold text-ink text-3xl mb-4">Order Confirmed</h1>
        <p className="text-muted mb-8">
          Thank you, we have received your order and will be in touch with dispatch updates.
        </p>
        <Link
          href="/dashboard"
          className="inline-block px-6 py-3 rounded bg-gradient-to-r from-cyan to-green text-navy-deep font-display font-semibold uppercase tracking-wide text-sm"
        >
          View My Orders
        </Link>
      </div>
    </div>
  );
}