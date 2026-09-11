"use client";

import { useEffect, useState } from "react";
import { orderService } from "../../../services/orderService";
import { adminService } from "../../../services/adminService";
import Link from "next/link";
import { ArrowLeft, ChevronDown } from "lucide-react";
import ConfirmModal from "../../../components/ui/ConfirmModal";
import { formatDateTime } from "../../../utils/formatDate";


export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [serialInputs, setSerialInputs] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [busyId, setBusyId] = useState(null);
  const [message, setMessage] = useState("");
    const [expandedId, setExpandedId] = useState(null);

  const loadOrders = async () => {
    try {
      const res = await orderService.listAll();
      const list = res?.data || [];
      setOrders(list);

      const inputs = {};
      for (const order of list) {
        for (const item of order.items || []) {
          inputs[item.id] = Array.from({ length: item.quantity }, (_, i) =>
            item.serialNumbers?.[i]?.serial || ""
          );
        }
      }
      setSerialInputs(inputs);
    } catch (err) {
      setMessage(err?.data?.message || "Could not load orders");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const updateSerial = (itemId, idx, value) => {
    setSerialInputs((prev) => ({
      ...prev,
      [itemId]: prev[itemId].map((s, i) => (i === idx ? value : s)),
    }));
  };

  const autoFill = async (item) => {
    setBusyId(item.id);
    setMessage("");
    try {
      const res = await orderService.suggestSerials(item.productId, item.quantity, item.id);
      setSerialInputs((prev) => ({ ...prev, [item.id]: res?.data || prev[item.id] }));
    } catch (err) {
      setMessage(err?.data?.message || "Could not suggest serials");
    } finally {
      setBusyId(null);
    }
  };

  const saveSerials = async (item) => {
    setBusyId(item.id);
    setMessage("");
    try {
      await orderService.saveSerials(item.id, serialInputs[item.id]);
      setMessage("Serial numbers saved");
      loadOrders();
    } catch (err) {
      setMessage(err?.data?.message || "Could not save serials");
    } finally {
      setBusyId(null);
    }
  };
 const [confirmDeliverId, setConfirmDeliverId] = useState(null);
  const [confirmDispatchId, setConfirmDispatchId] = useState(null);
  const [confirmPaymentId, setConfirmPaymentId] = useState(null);
  const [confirmCancelId, setConfirmCancelId] = useState(null);

  const markDelivered = async () => {
    const orderId = confirmDeliverId;
    setBusyId(orderId);
    setMessage("");
    try {
      await adminService.updateOrderStatus(orderId, "DELIVERED");
      setMessage("Order marked as delivered");
      loadOrders();
    } catch (err) {
      setMessage(err?.data?.message || "Could not update order");
    } finally {
      setBusyId(null);
      setConfirmDeliverId(null);
    }
  };
const dispatchOrder = async () => {
    const orderId = confirmDispatchId;
    setBusyId(orderId);
    setMessage("");
    try {
      await orderService.dispatch(orderId);
      setMessage("Order dispatched and invoice generated");
      loadOrders();
    } catch (err) {
      setMessage(err?.data?.message || "Could not dispatch order");
    } finally {
      setBusyId(null);
      setConfirmDispatchId(null);
    }
  };
    const confirmPayment = async () => {
    setBusyId(confirmPaymentId);
    setMessage("");
    try {
      await orderService.confirmOfflinePayment(confirmPaymentId);
      setConfirmPaymentId(null);
      loadOrders();
    } catch (err) {
      setMessage(err?.data?.message || "Could not confirm payment");
    } finally {
      setBusyId(null);
    }
  };

  const cancelOrder = async () => {
    setBusyId(confirmCancelId);
    setMessage("");
    try {
      await orderService.cancelUnpaid(confirmCancelId);
      setConfirmCancelId(null);
      loadOrders();
    } catch (err) {
      setMessage(err?.data?.message || "Could not cancel order");
    } finally {
      setBusyId(null);
    }
  };

  const allSerialsSaved = (order) =>
    (order.items || []).every(
      (item) => (item.serialNumbers?.length || 0) === item.quantity
    );

  if (isLoading) {
    return <p className="text-muted">Loading orders...</p>;
  }

  return (
    <div>
      <Link
        href="/admin"
        className="inline-flex items-center gap-2 text-muted hover:text-cyan text-sm font-display font-semibold uppercase tracking-wide transition-colors mb-6"
      >
        <ArrowLeft size={16} />
        Dashboard
      </Link>
      <h1 className="font-display font-bold text-ink text-2xl mb-8">Orders and Inventory</h1>

      {message ? (
        <div className="mb-6 px-4 py-3 rounded-lg bg-cyan/10 border border-cyan/30 text-cyan text-sm">
          {message}
        </div>
      ) : null}

      {orders.length === 0 ? (
        <p className="text-muted">No orders yet.</p>
      ) : (
        <div className="space-y-5">
          {orders.map((order) => (
            <div key={order.id} className="rounded-xl border border-cyan/[0.16] bg-navy-card p-6">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
                <div>
                  <b className="text-ink font-display">{order.orderNumber}</b>
                  <p className="text-muted text-xs">
                    {order.user?.name} · {order.user?.email}
                  </p>
                  <p className="text-muted text-xs font-mono mt-1">
                    {"\u20B9"}
                    {Number(order.total).toLocaleString("en-IN")}
                  </p>
                </div>
                                  <div className="shrink-0 text-right">
                    <span className="block text-muted text-[11px] font-mono mb-1.5">
                      {formatDateTime(order.createdAt)}
                    </span>
                  <span
                    className={`inline-block text-[10px] font-display font-semibold uppercase tracking-wide px-2.5 py-1 rounded ${
                      order.dispatchedAt ? "bg-green/10 text-green" : "bg-cyan/10 text-cyan"
                    }`}
                                   >
                      {order.status}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setExpandedId(expandedId === order.id ? null : order.id)}
                  className="flex items-center gap-1.5 text-xs font-display font-semibold uppercase tracking-wide text-cyan hover:text-ink transition-colors mb-5"
                >
                  {expandedId === order.id ? "Hide details" : "View more"}
                  <ChevronDown
                    size={14}
                    className={`transition-transform ${expandedId === order.id ? "rotate-180" : ""}`}
                  />
                </button>

                {expandedId === order.id ? (
                  <div className="rounded-lg border border-cyan/[0.12] bg-navy-deep p-5 mb-5 grid sm:grid-cols-2 gap-5 text-[13px]">
                    <div>
                      <b className="block font-display uppercase tracking-[0.1em] text-[11px] text-cyan mb-2">
                        Shipping address
                      </b>
                      <p className="text-ink">{order.shippingAddress?.fullName}</p>
                      <p className="text-muted">{order.shippingAddress?.line1}</p>
                      {order.shippingAddress?.line2 ? (
                        <p className="text-muted">{order.shippingAddress.line2}</p>
                      ) : null}
                      <p className="text-muted">
                        {order.shippingAddress?.city}, {order.shippingAddress?.state}{" "}
                        {order.shippingAddress?.postalCode}
                      </p>
                      <p className="text-muted">{order.shippingAddress?.country}</p>
                      <p className="text-muted mt-1.5">{order.shippingAddress?.phone}</p>
                    </div>

                    <div>
                      <b className="block font-display uppercase tracking-[0.1em] text-[11px] text-cyan mb-2">
                        Billing address
                      </b>
                      <p className="text-ink">{order.billingAddress?.fullName}</p>
                      <p className="text-muted">{order.billingAddress?.line1}</p>
                      {order.billingAddress?.line2 ? (
                        <p className="text-muted">{order.billingAddress.line2}</p>
                      ) : null}
                      <p className="text-muted">
                        {order.billingAddress?.city}, {order.billingAddress?.state}{" "}
                        {order.billingAddress?.postalCode}
                      </p>
                      <p className="text-muted">{order.billingAddress?.country}</p>
                    </div>

                    {order.customerCompany || order.customerGstin ? (
                      <div>
                        <b className="block font-display uppercase tracking-[0.1em] text-[11px] text-cyan mb-2">
                          Business details
                        </b>
                        {order.customerCompany ? (
                          <p className="text-ink">{order.customerCompany}</p>
                        ) : null}
                        {order.customerGstin ? (
                          <p className="text-muted font-mono">GSTIN {order.customerGstin}</p>
                        ) : null}
                      </div>
                    ) : null}

                    <div>
                      <b className="block font-display uppercase tracking-[0.1em] text-[11px] text-cyan mb-2">
                        Payment
                      </b>
                      <p className="text-muted">
                        Method: {order.paymentMethod || "not recorded"}
                      </p>
                      {order.razorpayPaymentId ? (
                        <p className="text-muted font-mono text-[12px] break-all">
                          {order.razorpayPaymentId}
                        </p>
                      ) : null}
                      {order.paidAt ? (
                        <p className="text-muted mt-1.5">Paid {formatDateTime(order.paidAt)}</p>
                      ) : null}
                      {order.dispatchedAt ? (
                        <p className="text-muted">
                          Dispatched {formatDateTime(order.dispatchedAt)}
                        </p>
                      ) : null}
                      {order.zohoInvoiceId ? (
                        <p className="text-muted font-mono text-[12px] mt-1.5">
                          Invoice {order.zohoInvoiceId}
                        </p>
                      ) : null}
                    </div>
                  </div>
                ) : null}

                <div className="space-y-5">
                  {(order.items || []).map((item) => (
                  <div key={item.id} className="border-t border-cyan/[0.09] pt-4">
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <div>
                        <span className="text-ink text-sm font-display">
                          {item.product?.name} x {item.quantity}
                        </span>
                        <span className="block text-muted text-xs">
                          Product ID: {item.product?.productCode || "not set"}
                        </span>
                      </div>
                      {!order.dispatchedAt ? (
                        <div className="flex gap-2 shrink-0">
                          <button
                            onClick={() => autoFill(item)}
                            disabled={busyId === item.id}
                            className="text-xs font-display uppercase tracking-wide text-cyan hover:text-ink disabled:opacity-50"
                          >
                            Auto-fill
                          </button>
                          <button
                            onClick={() => saveSerials(item)}
                            disabled={busyId === item.id}
                            className="text-xs font-display uppercase tracking-wide px-3 py-1.5 rounded border border-cyan/30 text-ink hover:border-cyan disabled:opacity-50"
                          >
                            Save
                          </button>
                        </div>
                      ) : null}
                    </div>

                    <div className="grid sm:grid-cols-2 gap-2">
                      {(serialInputs[item.id] || []).map((serial, idx) => (
                        <input
                          key={idx}
                          value={serial}
                          onChange={(e) => updateSerial(item.id, idx, e.target.value)}
                          disabled={Boolean(order.dispatchedAt)}
                          placeholder={`Unit ${idx + 1} serial number`}
                          className="bg-navy-deep border border-cyan/[0.16] rounded-md text-ink text-sm px-3 py-2 focus:outline-none focus:border-cyan disabled:opacity-60"
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>

                           {order.status === "AWAITING_PAYMENT" ? (
                 <div className="mt-5">
                   <p className="text-xs text-muted mb-3">
                     Paying by{" "}
                     {order.paymentMethod === "INTERNATIONAL"
                       ? "international transfer"
                       : "bank transfer"}
                     . Confirm once the payment reaches the account.
                   </p>
                   <div className="flex gap-3 flex-wrap">
                     <button
                       onClick={() => setConfirmPaymentId(order.id)}
                       disabled={busyId === order.id}
                       className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan to-green text-navy-deep text-xs font-display font-semibold uppercase tracking-wide disabled:opacity-40"
                     >
                       Confirm Payment
                     </button>
                     <button
                       onClick={() => setConfirmCancelId(order.id)}
                       disabled={busyId === order.id}
                       className="px-4 py-2 rounded-lg border border-red-500/40 text-red-400 text-xs font-display font-semibold uppercase tracking-wide hover:bg-red-500/10 transition-colors disabled:opacity-40"
                     >
                       Cancel Order
                     </button>
                   </div>
                 </div>
               ) : !order.dispatchedAt ? (
                 <button
                    onClick={() => setConfirmDispatchId(order.id)}
                  disabled={busyId === order.id || !allSerialsSaved(order)}
                  className="mt-5 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan to-green text-navy-deep text-xs font-display font-semibold uppercase tracking-wide disabled:opacity-40"
                >
                  Mark Dispatched
                </button>
              ) : order.status === "DELIVERED" ? (
                <p className="mt-5 text-xs text-green">
                  Delivered · Dispatched {new Date(order.dispatchedAt).toLocaleDateString("en-IN")}
                  {order.zohoInvoiceId ? ` · Invoice ${order.zohoInvoiceId}` : ""}
                </p>
              ) : (
                <div className="mt-5 flex items-center gap-4 flex-wrap">
                  <p className="text-xs text-muted">
                    Dispatched {new Date(order.dispatchedAt).toLocaleDateString("en-IN")}
                    {order.zohoInvoiceId ? ` · Invoice ${order.zohoInvoiceId}` : ""}
                  </p>
                  <button
                    onClick={() => setConfirmDeliverId(order.id)}
                    disabled={busyId === order.id}
                    className="px-4 py-2 rounded-lg border border-green/40 text-green text-xs font-display font-semibold uppercase tracking-wide hover:bg-green/10 transition-colors disabled:opacity-40"
                  >
                    Mark Delivered
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
     )}

      <ConfirmModal
        open={Boolean(confirmDeliverId)}
        title="Mark as delivered?"
        message="This confirms the order has reached the customer. This cannot be undone."
        confirmLabel="Mark Delivered"
        onConfirm={markDelivered}
        onCancel={() => setConfirmDeliverId(null)}
        busy={busyId === confirmDeliverId}
      />
              <ConfirmModal
          open={Boolean(confirmPaymentId)}
          title="Confirm payment received?"
          message="This marks the order as paid and moves it into production. The customer will be emailed."
          confirmLabel="Confirm Payment"
          onConfirm={confirmPayment}
          onCancel={() => setConfirmPaymentId(null)}
          busy={busyId === confirmPaymentId}
        />

        <ConfirmModal
          open={Boolean(confirmCancelId)}
          title="Cancel this order?"
          message="The order will be cancelled and any coupon used will be returned to the customer."
          confirmLabel="Cancel Order"
          onConfirm={cancelOrder}
          onCancel={() => setConfirmCancelId(null)}
          busy={busyId === confirmCancelId}
        />

        <ConfirmModal
          open={Boolean(confirmDispatchId)}
        title="Mark as dispatched?"
        message="This generates the Zoho invoice and cannot be undone. Make sure all serial numbers are correct."
        confirmLabel="Mark Dispatched"
        onConfirm={dispatchOrder}
        onCancel={() => setConfirmDispatchId(null)}
        busy={busyId === confirmDispatchId}
      />
    </div>
  );
}