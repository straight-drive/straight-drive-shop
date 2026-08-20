import LegalPage from "../../../components/ui/LegalPage";

export const metadata = {
  title: "Refund & Cancellation Policy — Straight Drive",
  description: "Returns, refunds, exchanges and cancellation terms.",
};

const sections = [
  {
    heading: "Returns",
    items: [
      "Our policy lasts 30 days from the date of purchase.",
      "Items must be unused, in original condition, and in original packaging.",
      "Proof of purchase is required for all returns.",
    ],
  },
  {
    heading: "Refunds",
    items: [
      "Once your return is received and inspected, we will notify you of approval or rejection.",
      "Approved refunds are processed within 7–14 business days to the original payment method.",
    ],
  },
  {
    heading: "Late or Missing Refunds",
    items: [
      "If a refund has not been received, please check with your bank or credit card provider.",
      "If issues persist, contact us at info@paceattack.com.",
    ],
  },
  {
    heading: "Sale Items",
    items: [
      "Only regular-priced items are eligible for refunds.",
      "Sale items are non-refundable.",
    ],
  },
  {
    heading: "Exchanges",
    items: [
      "We replace items only if they are defective or damaged.",
      "Contact us before sending items for exchange.",
    ],
  },
  {
    heading: "Shipping for Returns",
    items: [
      "Customers are responsible for return shipping costs.",
      "Shipping costs are non-refundable.",
      "Returns should be sent to Straight Drive Sports & Leisure Pvt Ltd, No 386, Rampally, Hyderabad – 500051, India.",
    ],
  },
];

export default function RefundPolicy() {
  return (
    <LegalPage
      title="Refund &"
      titleAccent="Cancellation."
      lastUpdated="1 January 2025"
      sections={sections}
    />
  );
}