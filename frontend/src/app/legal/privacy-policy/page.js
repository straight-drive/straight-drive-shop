import LegalPage from "../../../components/ui/LegalPage";

export const metadata = {
  title: "Privacy Policy — Straight Drive",
  description: "How Straight Drive collects, uses and shares your information.",
};

const sections = [
  {
    heading: "Overview",
    items: [
      "This Privacy Policy describes how your personal information is collected, used, and shared when you visit or interact with this website.",
    ],
  },
  {
    heading: "Personal Information We Collect",
    items: [
      "When you visit the site, we automatically collect certain information about your device including browser type, IP address, time zone, and cookies.",
      "We also collect information about pages or products you view, referral sources, and how you interact with the site.",
      "When you make a purchase or enquiry, we may collect your name, billing address, shipping address, payment information, email address, and phone number.",
    ],
  },
  {
    heading: "How We Collect Information",
    items: [
      "Cookies: data files placed on your device that often include an anonymous unique identifier.",
      "Log files: track actions occurring on the site such as IP address, browser type, ISP, referring pages, and timestamps.",
      "Web beacons, tags, and pixels: electronic files used to record browsing behavior.",
    ],
  },
  {
    heading: "How We Use Your Information",
    items: [
      "To fulfill orders and process payments.",
      "To communicate with you regarding enquiries or purchases.",
      "To screen for potential risk or fraud.",
      "To improve and optimize our website and marketing efforts.",
    ],
  },
  {
    heading: "Sharing Your Personal Information",
    items: [
      "We share personal information with third parties only as necessary to operate our services.",
      "We may share information to comply with applicable laws, regulations, legal processes, or lawful requests.",
    ],
  },
  {
    heading: "Behavioral Advertising",
    items: [
      "We may use your information to provide targeted advertisements or marketing communications.",
      "You may opt out of targeted advertising through relevant third-party platforms.",
    ],
  },
  {
    heading: "Do Not Track",
    items: [
      "We do not alter our data collection practices when we receive a Do Not Track signal from your browser.",
    ],
  },
  {
    heading: "Your Rights",
    items: [
      "If you are a European resident, you have the right to access, correct, update, or delete your personal information.",
      "To exercise this right, please contact us using the information below.",
    ],
  },
  {
    heading: "Data Retention",
    items: ["We retain order and enquiry information unless and until you request deletion."],
  },
  {
    heading: "Changes",
    items: [
      "We may update this Privacy Policy periodically to reflect operational, legal, or regulatory changes.",
    ],
  },
  {
    heading: "Minors",
    items: ["The site is not intended for individuals under the age of 15."],
  },
  {
    heading: "Contact Us",
    items: [
      "Straight Drive Sports & Leisure Pvt Ltd",
      "Manufacturing Hub — No 386, Rampally, Hyderabad",
      "Corporate Office — 840, Sector 3, 17th Main HSR Layout, Bangalore",
      "Email: info@straightdrivesport.com",
    ],
  },
];

export default function PrivacyPolicy() {
  return (
    <LegalPage
      title="Privacy"
      titleAccent="Policy."
      lastUpdated="1 January 2025"
      sections={sections}
    />
  );
}