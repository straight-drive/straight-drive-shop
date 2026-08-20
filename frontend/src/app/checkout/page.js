"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { useAuth } from "../../hooks/useAuth";
import { cartService } from "../../services/cartService";
import { checkoutAttemptService } from "../../services/checkoutAttemptService";
import { useCart } from "../../context/CartContext";
import BackButton from "../../components/ui/BackButton";
import AlertModal from "../../components/ui/AlertModal";
import LeadTimePopup from "../../components/ui/LeadTimePopup";
import { indianStates } from "../../data/indianStates";

export default function CheckoutPage() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const { refreshCart } = useCart();
  const router = useRouter();

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPaying, setIsPaying] = useState(false);
  const [error, setError] = useState("");
  const [alertModal, setAlertModal] = useState(null);
  const [leadTimeAcked, setLeadTimeAcked] = useState(false);
  const [business, setBusiness] = useState({
    customerCompany: "",
    customerGstin: "",
  });
    const emptyAddress = {
    fullName: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "India",
    phone: "",
  };

  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [billing, setBilling] = useState(emptyAddress);

  const handleBillingChange = (e) => {
    setBilling((b) => ({ ...b, [e.target.name]: e.target.value }));
  };
  const [address, setAddress] = useState({
    fullName: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "India",
    phone: "",
  });

  useEffect(() => {
    if (!authLoading && !isAuthenticated) router.push("/login");
  }, [authLoading, isAuthenticated, router]);

  useEffect(() => {
    if (!isAuthenticated) return;
    cartService
      .getCart()
      .then((res) => setItems(res?.data?.items || []))
      .catch(() => setItems([]))
      .finally(() => setIsLoading(false));
  }, [isAuthenticated]);

  const handleChange = (e) => {
    setAddress((a) => ({ ...a, [e.target.name]: e.target.value }));
  };
  const handleBusinessChange = (e) => {
    const value =
      e.target.name === "customerGstin"
        ? e.target.value.toUpperCase().replace(/[^0-9A-Z]/g, "").slice(0, 15)
        : e.target.value;
    setBusiness((b) => ({ ...b, [e.target.name]: value }));
  };

  // 2 digits (state code), 5 letters + 4 digits + 1 letter (PAN), then 3 more.
  const GSTIN_PATTERN = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
  const gstinEntered = business.customerGstin.length > 0;
  const gstinValid = GSTIN_PATTERN.test(business.customerGstin);

  const subtotal = items.reduce(
    (sum, i) => sum + Number(i.product?.price || 0) * i.quantity,
    0
  );

  const gstTotal = items.reduce((sum, i) => {
    const line = Number(i.product?.price || 0) * i.quantity;
    const rate = i.product?.gstRate ?? 0;
    return sum + (line * rate) / 100;
  }, 0);

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setError("");
    setIsPaying(true);

    try {
      const attemptRes = await checkoutAttemptService.create({
        fullName: address.fullName,
        email: user?.email,
        phone: address.phone,
        customerCompany: business.customerCompany || undefined,
                customerGstin: business.customerGstin || undefined,
        shippingAddress: address,
        billingAddress: sameAsShipping ? address : billing,
      });
      const attempt = attemptRes?.data;
      if (!attempt?.id) throw new Error("Could not start checkout");

      const payRes = await checkoutAttemptService.initiatePayment(attempt.id);
      const razorpayOrderId = payRes?.data?.razorpayOrderId;
      const amount = payRes?.data?.amount;
      const currency = payRes?.data?.currency;

      if (typeof window.Razorpay !== "function") {
        setError(
          "Payment gateway is still loading — please wait a moment and try again."
        );
        setIsPaying(false);
        return;
      }

      const rzp = new window.Razorpay({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: amount,
        currency: currency,
        order_id: razorpayOrderId,
        name: "Straight Drive",
        description: "Straight Drive order",
        prefill: {
          name: address.fullName,
          email: user?.email,
          contact: address.phone,
        },
        theme: { color: "#00B5DF" },
        handler: async (response) => {
          // Payment succeeded on Razorpay's side at this point.
          // Never suggest retrying below this line — that risks a double charge.
          try {
            await checkoutAttemptService.confirmPayment({
              attemptId: attempt.id,
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            });
            await refreshCart();
            router.push("/checkout/success");
          } catch (err) {
            setIsPaying(false);
            setAlertModal({
              title: "Payment received — finishing up",
              message:
                "Your payment went through, but we hit a snag saving your order.\n\n" +
                `Please contact us with this payment reference and we'll sort it immediately:\n\n${response.razorpay_payment_id}`,
              tone: "info",
            });
          }
        },
        modal: {
          ondismiss: () => setIsPaying(false),
        },
      });

      rzp.on("payment.failed", (response) => {
        setIsPaying(false);
        setAlertModal({
          title: "Payment failed",
          message:
            response?.error?.description ||
            "Your payment could not be completed. Please try again.",
          tone: "error",
        });
      });

      rzp.open();
    } catch (err) {
      setError(err?.data?.message || err.message || "Something went wrong");
      setIsPaying(false);
    }
  };

  if (authLoading || isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-muted">Loading...</p>
      </div>
    );
  }

 if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-center px-6">
        <p className="text-muted">Your cart is empty.</p>
      </div>
    );
  }

  return (
    <>
     <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />

      <LeadTimePopup
        open={!leadTimeAcked}
        items={items}
        onAcknowledge={() => setLeadTimeAcked(true)}
      />
      <div className="px-6 pt-6">
        <BackButton href="/cart" />
      </div>
      <section className="max-w-[1100px] mx-auto px-6 py-16 grid md:grid-cols-2 gap-12">
        <div>
          <h1 className="font-display font-bold text-ink text-4xl mb-8">Checkout</h1>

          {error ? (
            <div className="mb-6 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
              {error}
            </div>
          ) : null}

          <form onSubmit={handlePlaceOrder} className="space-y-4">
            <input
              name="fullName"
              value={address.fullName}
              onChange={handleChange}
              placeholder="Full name"
              required
              className="w-full bg-navy-card border border-cyan/[0.16] rounded-md text-ink px-4 py-3 focus:outline-none focus:border-cyan"
            />
            <input
              name="line1"
              value={address.line1}
              onChange={handleChange}
              placeholder="Address line 1"
              required
              className="w-full bg-navy-card border border-cyan/[0.16] rounded-md text-ink px-4 py-3 focus:outline-none focus:border-cyan"
            />
            <input
              name="line2"
              value={address.line2}
              onChange={handleChange}
              placeholder="Address line 2 (optional)"
              className="w-full bg-navy-card border border-cyan/[0.16] rounded-md text-ink px-4 py-3 focus:outline-none focus:border-cyan"
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                name="city"
                value={address.city}
                onChange={handleChange}
                placeholder="City"
                required
                className="bg-navy-card border border-cyan/[0.16] rounded-md text-ink px-4 py-3 focus:outline-none focus:border-cyan"
              />
              <select
                name="state"
                value={address.state}
                onChange={handleChange}
                required
                className="bg-navy-card border border-cyan/[0.16] rounded-md text-ink px-4 py-3 focus:outline-none focus:border-cyan"
              >
                <option value="">Select state</option>
                {indianStates.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input
                name="postalCode"
                value={address.postalCode}
                onChange={handleChange}
                placeholder="Postal code"
                required
                className="bg-navy-card border border-cyan/[0.16] rounded-md text-ink px-4 py-3 focus:outline-none focus:border-cyan"
              />
              <input
                name="phone"
                value={address.phone}
                onChange={handleChange}
                placeholder="Phone"
                required
                className="bg-navy-card border border-cyan/[0.16] rounded-md text-ink px-4 py-3 focus:outline-none focus:border-cyan"
              />
            </div>
                      <input
              name="country"
              value="India"
              readOnly
              disabled
              className="w-full bg-navy-deep border border-cyan/[0.16] rounded-md text-muted px-4 py-3 cursor-not-allowed"
            />
                        <div className="pt-4 mt-2 border-t border-cyan/[0.16]">
              <span className="block font-display font-semibold text-[13px] tracking-[0.14em] uppercase text-cyan mb-3">
                Billing address
              </span>

              <label className="flex items-center gap-2.5 mb-4 cursor-pointer">
                <input
                  type="checkbox"
                  checked={sameAsShipping}
                  onChange={(e) => setSameAsShipping(e.target.checked)}
                  className="w-4 h-4 accent-cyan"
                />
                <span className="text-muted text-sm">Same as shipping address</span>
              </label>

              {!sameAsShipping ? (
                <div className="space-y-4">
                  <input
                    name="fullName"
                    value={billing.fullName}
                    onChange={handleBillingChange}
                    placeholder="Full name"
                    required
                    className="w-full bg-navy-card border border-cyan/[0.16] rounded-md text-ink px-4 py-3 focus:outline-none focus:border-cyan"
                  />
                  <input
                    name="line1"
                    value={billing.line1}
                    onChange={handleBillingChange}
                    placeholder="Address line 1"
                    required
                    className="w-full bg-navy-card border border-cyan/[0.16] rounded-md text-ink px-4 py-3 focus:outline-none focus:border-cyan"
                  />
                  <input
                    name="line2"
                    value={billing.line2}
                    onChange={handleBillingChange}
                    placeholder="Address line 2 (optional)"
                    className="w-full bg-navy-card border border-cyan/[0.16] rounded-md text-ink px-4 py-3 focus:outline-none focus:border-cyan"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      name="city"
                      value={billing.city}
                      onChange={handleBillingChange}
                      placeholder="City"
                      required
                      className="bg-navy-card border border-cyan/[0.16] rounded-md text-ink px-4 py-3 focus:outline-none focus:border-cyan"
                    />
                    <select
                      name="state"
                      value={billing.state}
                      onChange={handleBillingChange}
                      required
                      className="bg-navy-card border border-cyan/[0.16] rounded-md text-ink px-4 py-3 focus:outline-none focus:border-cyan"
                    >
                      <option value="">Select state</option>
                      {indianStates.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      name="postalCode"
                      value={billing.postalCode}
                      onChange={handleBillingChange}
                      placeholder="PIN code"
                      required
                      className="bg-navy-card border border-cyan/[0.16] rounded-md text-ink px-4 py-3 focus:outline-none focus:border-cyan"
                    />
                    <input
                      name="phone"
                      value={billing.phone}
                      onChange={handleBillingChange}
                      placeholder="Phone"
                      required
                      className="bg-navy-card border border-cyan/[0.16] rounded-md text-ink px-4 py-3 focus:outline-none focus:border-cyan"
                    />
                  </div>
                  <input
                    value="India"
                    readOnly
                    disabled
                    className="w-full bg-navy-deep border border-cyan/[0.16] rounded-md text-muted px-4 py-3 cursor-not-allowed"
                  />
                </div>
              ) : null}
            </div>
            <div className="pt-4 mt-2 border-t border-cyan/[0.16]">
              <span className="block font-display font-semibold text-[13px] tracking-[0.14em] uppercase text-cyan mb-1">
                Business details
              </span>
              <p className="text-muted text-xs mb-4">
                Optional — add these if you need your company name and GSTIN on
                the tax invoice.
              </p>

              <div className="space-y-4">
                <input
                  name="customerCompany"
                  value={business.customerCompany}
                  onChange={handleBusinessChange}
                  placeholder="Company name (optional)"
                  className="w-full bg-navy-card border border-cyan/[0.16] rounded-md text-ink px-4 py-3 focus:outline-none focus:border-cyan"
                />
                <div>
                  <input
                    name="customerGstin"
                    value={business.customerGstin}
                    onChange={handleBusinessChange}
                    placeholder="GSTIN (optional)"
                    maxLength={15}
                    className={`w-full bg-navy-card border rounded-md text-ink px-4 py-3 focus:outline-none uppercase ${
                      gstinEntered && !gstinValid
                        ? "border-red-500/50 focus:border-red-500"
                        : "border-cyan/[0.16] focus:border-cyan"
                    }`}
                  />
                  {gstinEntered && !gstinValid ? (
                    <p className="text-red-400 text-xs mt-1.5">
                      That does not look like a valid GSTIN — it should be 15
                      characters, e.g. 29AAACR5055K1Z5
                    </p>
                  ) : null}
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isPaying || (gstinEntered && !gstinValid)}
              className="w-full px-6 py-3.5 rounded bg-gradient-to-r from-cyan to-green text-navy-deep font-display font-semibold uppercase tracking-wide text-sm disabled:opacity-50"
            >
              {isPaying ? "Processing..." : "Place Order and Pay"}
            </button>
          </form>
        </div>

        <div className="rounded-xl border border-cyan/[0.16] bg-navy-card p-6 h-fit">
          <h2 className="font-display font-semibold text-ink text-sm uppercase tracking-wide mb-4">
            Order Summary
          </h2>
          <div className="space-y-4 mb-4">
            {items.map((item) => {
              const line = Number(item.product?.price || 0) * item.quantity;
              const rate = item.product?.gstRate ?? 0;
              const itemGst = (line * rate) / 100;
              return (
                <div key={item.id} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted">
                      {item.product?.name} x {item.quantity}
                    </span>
                    <span className="text-ink font-mono">
                      {"\u20B9"}
                      {line.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted opacity-70">GST @ {rate}%</span>
                    <span className="text-muted font-mono opacity-70">
                      {"\u20B9"}
                      {itemGst.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="border-t border-cyan/[0.16] pt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted">Subtotal</span>
              <span className="text-ink font-mono">
                {"\u20B9"}
                {subtotal.toLocaleString("en-IN")}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted">GST</span>
              <span className="text-ink font-mono">
                {"\u20B9"}
                {gstTotal.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
              </span>
            </div>
            <div className="flex justify-between pt-2 border-t border-cyan/[0.16]">
              <span className="text-ink font-display font-semibold">Total</span>
              <span className="font-mono text-xl text-ink">
                {"\u20B9"}
                {(subtotal + gstTotal).toLocaleString("en-IN", { maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        </div>
      </section>

      <AlertModal
        open={Boolean(alertModal)}
        title={alertModal?.title}
        message={alertModal?.message}
        tone={alertModal?.tone}
        onClose={() => setAlertModal(null)}
      />
    </>
  );
}