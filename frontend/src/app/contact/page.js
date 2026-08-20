import Link from "next/link";
import ContactForm from "../../components/store/ContactForm";
import GradientText from "../../components/ui/GradientText";
import Eyebrow from "../../components/ui/Eyebrow";
import LocationCards from "../../components/ui/LocationCards";

export const metadata = {
  title: "Contact Us — Straight Drive",
  description: "Get in touch with Straight Drive about machines, orders, service or partnerships.",
};

export default function Support() {
  return (
    <>
      <section className="py-20 px-6 bg-navy-deep border-b border-cyan/[0.16]">
        <h1 className="font-display font-bold text-center text-[clamp(32px,4.5vw,52px)]">
          How can we <GradientText>help?</GradientText>
        </h1>
      </section>

      <section className="max-w-[1100px] mx-auto px-6 py-16 grid md:grid-cols-2 gap-12">
        <div>
          <Eyebrow>Get in touch</Eyebrow>
          <h2 className="font-display font-bold text-ink text-3xl mt-3 mb-4">
            Talk to our team.
          </h2>
          <p className="text-muted mb-8">
            Service, spares, installation or a question about your order — send
            us a message and we will get back to you.
          </p>
          <div className="mb-8">
            <LocationCards />
          </div>
         <div className="space-y-5 mb-8">
            <div>
              <span className="text-cyan text-xs font-display uppercase tracking-wide block mb-1">
                Service hours
              </span>
              <p className="text-muted text-sm">Monday to Saturday, 9:30 to 18:30 IST</p>
            </div>
            <div>
              <span className="text-cyan text-xs font-display uppercase tracking-wide block mb-1">
                Email
              </span>
              
              <a  href="mailto:info@straightdrivesport.com"
                className="text-muted text-sm hover:text-cyan transition-colors"
              >
                info@straightdrivesport.com
              </a>
            </div>
            <div>
              <span className="text-cyan text-xs font-display uppercase tracking-wide block mb-1">
                Phone No
              </span>
              
              <a  href="tel:+919000988633"
                className="text-muted text-sm hover:text-cyan transition-colors block"
              >
                +91 90009 88633
              </a>
              
              <a  href="tel:+917995998880"
                className="text-muted text-sm hover:text-cyan transition-colors block"
              >
                +91 79959 98880
              </a>
            </div>
          </div>

          <div className="rounded-xl border border-cyan/[0.16] bg-navy-card p-5">
            <h3 className="font-display font-semibold text-ink mb-2">
              Looking for quick answers?
            </h3>
            <p className="text-muted text-sm mb-3">
              Most common questions about our machines, installation and support
              are answered in our FAQ.
            </p>
            <Link href="/faq" className="text-cyan text-sm font-display uppercase tracking-wide">
              Read the FAQ →
            </Link>
          </div>
        </div>

        <div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}