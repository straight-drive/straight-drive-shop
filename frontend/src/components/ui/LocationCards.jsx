import { ExternalLink } from "lucide-react";

const locations = [
  {
    label: "Manufacturing Hub",
    address: ["No 386, Rampally", "Hyderabad"],
    embed:
      "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1902.881071429422!2d78.629693!3d17.471095!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9d414858e38d%3A0x627fa3ad6ec0060a!2sAbhaya%20agro%20products!5e0!3m2!1sen!2sin!4v1786774013402!5m2!1sen!2sin",
    mapsLink: "https://maps.google.com/?q=No+386,+Rampally,+Hyderabad",
  },
  {
    label: "Corporate Office",
    address: [
      "# 301, 3rd floor, Kaveri Pride,",
      "Opp to Levelpro Badminton,",
      "VGP Layout Kudlu, Bengaluru - 560068",
    ],
    embed:
      "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3889.2288177863575!2d77.652962!3d12.893003!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae159898256f21%3A0xaa09a2909b3cb647!2sStraight%20Drive%20Sports%20and%20Leisure%20Pvt%20Ltd!5e0!3m2!1sen!2sin!4v1786774033678!5m2!1sen!2sin",
    mapsLink:
      "https://maps.google.com/?q=Straight+Drive+Sports+and+Leisure+Pvt+Ltd,+Bengaluru",
  },
];

export default function LocationCards() {
  return (
    <div className="grid sm:grid-cols-2 gap-6">
      {locations.map((loc) => (
        <div key={loc.label}>
          <div className="relative rounded-xl overflow-hidden border border-cyan/[0.16] mb-4">
            <iframe
              src={loc.embed}
              title={loc.label}
              className="w-full h-[240px]"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            />
            
             <a href={loc.mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute top-3 left-3 inline-flex items-center gap-1.5 bg-navy-deep/90 backdrop-blur-sm text-cyan text-xs font-display font-semibold uppercase tracking-wide px-3 py-2 rounded-lg border border-cyan/30 hover:border-cyan transition-colors"
            >
              Open in Maps
              <ExternalLink size={13} />
            </a>
          </div>
          <b className="font-display uppercase tracking-[0.06em] text-ink block mb-1.5">
            {loc.label}
          </b>
          {loc.address.map((line) => (
            <p key={line} className="text-muted text-sm leading-relaxed">
              {line}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
}