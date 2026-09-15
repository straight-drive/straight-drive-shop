const locations = [
  {
    label: "Manufacturing Hub",
    address: [
      "No 386, behind Abhaya Agro Products,",
      "Hyderabad, India - 501302",
    ],
  },
  {
    label: "Corporate Office",
    address: [
      "# 301, 3rd floor, Kaveri Pride,",
      "Opp to Levelpro Badminton,",
      "VGP Layout Kudlu,",
      "Bengaluru - 560068",
    ],
  },
];

export default function LocationCards() {
  return (
    <div className="grid sm:grid-cols-2 gap-5">
      {locations.map((loc) => (
        <div
          key={loc.label}
          className="rounded-xl border border-cyan/[0.16] bg-navy-card px-6 py-5"
        >
          <b className="font-display uppercase tracking-[0.08em] text-[14px] text-cyan block mb-2.5">
            {loc.label}
          </b>
          {loc.address.map((line) => (
            <p key={line} className="text-muted text-[14px] leading-[1.7]">
              {line}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
}