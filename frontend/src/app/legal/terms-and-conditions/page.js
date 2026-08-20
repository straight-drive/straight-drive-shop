import LegalPage from "../../../components/ui/LegalPage";

export const metadata = {
  title: "Terms & Conditions — Straight Drive",
  description: "Terms governing use of the Straight Drive website and purchases.",
};

const sections = [
  {
    heading: "Overview",
    items: [
      "This website is operated by Straight Drive Sports & Leisure Pvt Ltd.",
      "By accessing or using this website, you agree to be bound by these Terms and Conditions.",
    ],
  },
  {
    heading: "Online Store Terms",
    items: [
      "You must be of legal age in your jurisdiction to use this site.",
      "You may not use our products or services for any illegal or unauthorized purpose.",
    ],
  },
  {
    heading: "General Conditions",
    items: [
      "We reserve the right to refuse service to anyone at any time.",
      "Content may be transferred unencrypted over various networks except for payment information.",
    ],
  },
  {
    heading: "Accuracy of Information",
    items: [
      "We are not responsible if information on this site is inaccurate, incomplete, or outdated.",
      "Content is provided for general information only.",
    ],
  },
  {
    heading: "Modifications to Service",
    items: [
      "Prices and services may change without notice.",
      "We may modify or discontinue services at any time.",
    ],
  },
  {
    heading: "Products & Services",
    items: [
      "Certain products may be available exclusively online.",
      "We reserve the right to limit or discontinue products at any time.",
    ],
  },
  {
    heading: "Billing & Account Information",
    items: [
      "You agree to provide accurate and current purchase information.",
      "We may limit or cancel orders at our discretion.",
    ],
  },
  {
    heading: "Prohibited Uses",
    items: [
      "You may not use the site for unlawful, abusive, or malicious purposes.",
      "Any violation may result in termination of access.",
    ],
  },
  {
    heading: "Disclaimer & Limitation of Liability",
    items: [
      "Services are provided on an 'as is' and 'as available' basis.",
      "Straight Drive Sports & Leisure Pvt Ltd shall not be liable for indirect or consequential damages.",
    ],
  },
  {
    heading: "Governing Law",
    items: ["These Terms shall be governed by the laws applicable in Hyderabad, India."],
  },
  {
    heading: "Contact Information",
    items: ["Questions regarding these Terms should be sent to info@straightdrivesport.com"],
  },
];

export default function TermsAndConditions() {
  return (
    <LegalPage
      title="Terms &"
      titleAccent="Conditions."
      lastUpdated="1 January 2025"
      sections={sections}
    />
  );
}