import { Rajdhani, Barlow, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "../context/AuthContext";
import { CartProvider } from "../context/CartContext";
import SiteChrome from "../components/layout/SiteChrome";

const rajdhani = Rajdhani({
  weight: ["500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-display",
});

const barlow = Barlow({
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-body",
});

const plexMono = IBM_Plex_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata = {
  metadataBase: new URL("https://straightdrivesports.com"),
  title: {
    default: "Straight Drive — Cricket Bowling Machines & Simulators",
    template: "%s | Straight Drive",
  },
  description:
    "Straight Drive Sports & Leisure designs and manufactures cricket bowling machines, simulators and interactive sports games. Made in India, installed across 13 countries.",
  keywords: [
    "cricket bowling machine",
    "cricket simulator",
    "cricket practice equipment",
    "Straight Drive Sports",
  ],
  openGraph: {
    type: "website",
    siteName: "Straight Drive",
    url: "https://straightdrivesports.com",
    title: "Straight Drive — Cricket Bowling Machines & Simulators",
    description:
      "Cricket bowling machines, simulators and interactive sports games. Engineered and built in India.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${rajdhani.variable} ${barlow.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
       <AuthProvider>
          <CartProvider>
            <SiteChrome>{children}</SiteChrome>
          </CartProvider>
        </AuthProvider>
                <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Straight Drive Sports & Leisure Pvt. Ltd.",
              alternateName: "Straight Drive",
              url: "https://straightdrivesports.com",
              logo: "https://straightdrivesports.com/images/vision/hero_logo.svg",
              description:
                "Sports technology company designing and manufacturing cricket bowling machines, simulators and interactive entertainment systems.",
              foundingDate: "2016",
              email: "info@straightdrivesport.com",
              telephone: "+91-90009-88633",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Bengaluru",
                addressRegion: "Karnataka",
                addressCountry: "IN",
              },
              sameAs: [
                "https://www.instagram.com/straightdrivesport/",
                "https://in.linkedin.com/company/straight-drive-sports-and-leisure",
                "https://www.youtube.com/channel/UCJukVAzctZlD1EMISFi7b6w",
                "https://www.facebook.com/straightdrivesport/",
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}