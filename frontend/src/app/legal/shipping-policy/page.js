import LegalPage from "../../../components/ui/LegalPage";

export const metadata = {
  title: "Shipping Policy — Straight Drive",
  description: "Dispatch timelines, shipping risk and delivery terms.",
};

const sections = [
  {
    heading: "Shipping Policy",
    items: [
      "Packages are dispatched within approximately 15 business days after payment confirmation.",
      "Delivery charges are displayed prior to purchase.",
      "Straight Drive Sports & Leisure Pvt Ltd reserves the right to select shipping partners.",
    ],
  },
  {
    heading: "Shipping Risk",
    items: [
      "Packages are dispatched at the customer's risk.",
      "Care is taken to ensure items are properly packaged and protected.",
    ],
  },
  {
    heading: "Delivery Time",
    items: ["Delivery timelines may vary based on destination and logistics provider."],
  },
];

export default function ShippingPolicy() {
  return (
    <LegalPage
      title="Shipping"
      titleAccent="Policy."
      lastUpdated="1 January 2025"
      sections={sections}
    />
  );
}