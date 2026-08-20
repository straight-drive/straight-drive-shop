import Link from "next/link";
import { FaInstagram, FaLinkedinIn, FaYoutube, FaFacebookF } from "react-icons/fa";

const socials = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/straightdrivesport/",
    Icon: FaInstagram,
    color: "#E1306C",
  },
  {
    label: "LinkedIn",
    href: "https://in.linkedin.com/company/straight-drive-sports-and-leisure",
    Icon: FaLinkedinIn,
    color: "#0A66C2",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/channel/UCJukVAzctZlD1EMISFi7b6w",
    Icon: FaYoutube,
    color: "#FF0000",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/straightdrivesport/",
    Icon: FaFacebookF,
    color: "#1877F2",
  },
];

const quickLinks = [
  { label: "Performance Training", href: "/performance-training" },
  { label: "Entertainment", href: "/entertainment" },
  { label: "Book a Demo", href: "/book-demo" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "FAQ", href: "/faq" },
];

const policies = [
  { label: "Privacy Policy", href: "/legal/privacy-policy" },
  { label: "Terms & Conditions", href: "/legal/terms-and-conditions" },
  { label: "Shipping Policy", href: "/legal/shipping-policy" },
  { label: "Refund & Cancellation Policy", href: "/legal/refund-and-cancellation-policy" },
];

export default function Footer() {
  return (
    <footer className="border-t border-cyan/[0.16] bg-navy-deep py-16 px-6">
      <div className="max-w-[1240px] mx-auto">
        <div className="grid md:grid-cols-[1.4fr_1fr_1fr] gap-12">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/vision/hero_logo.svg"
              alt="Straight Drive"
              className="h-12 w-auto mb-4"
            />

           

            <h4 className="font-display text-[13px] uppercase tracking-[0.14em] text-ink mb-3">
              Follow us at
            </h4>
            <div className="flex gap-3">
      {socials.map(({ label, href, Icon, color }) => (
                
                <a  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg border border-cyan/[0.16] flex items-center justify-center transition-all hover:scale-110 hover:border-transparent"
                  style={{ color }}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-[13px] uppercase tracking-[0.14em] text-ink mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm text-muted">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-cyan transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-[13px] uppercase tracking-[0.14em] text-ink mb-4">
              Policies
            </h4>
            <ul className="space-y-2.5 text-sm text-muted">
              {policies.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-cyan transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}