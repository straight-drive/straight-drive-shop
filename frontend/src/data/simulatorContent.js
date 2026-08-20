export const simContent = {
  immersive: [
    { photo: "/images/simulator/immersive/Realistic.webp", title: "Unmatched realism", desc: "Real bat, real ball, real bowling — you're in the stadium." },
    { photo: "/images/simulator/immersive/Pro_Challenge.jpg", title: "Pro challenge", desc: "International-level bowlers with varied pace and spin." },
    { photo: "/images/simulator/immersive/Social_Gaming.jpeg", title: "Social gaming", desc: "Parties, corporate gatherings and group fun." },
    { photo: "/images/simulator/immersive/ROI.jpeg", title: "Proven ROI", desc: "A top revenue earner driving high repeat footfall." },
  ],

  indiaLocations: [
    { name: "Kozhikode", photo: "/images/simulator/india/kozhikode.webp" },
    { name: "Mumbai", photo: "/images/simulator/india/mumbai.webp" },
    { name: "Bengaluru", photo: "/images/simulator/india/bengaluru.webp" },
    { name: "Hyderabad", photo: "/images/simulator/india/hyderabad.webp" },
    { name: "Noida", photo: "/images/simulator/india/noida.webp" },
    { name: "Raipur", photo: "/images/simulator/india/raipur.webp" },
    { name: "Coimbatore", photo: "/images/simulator/india/coimbatore.webp" },
    { name: "Nainital", photo: "/images/simulator/india/nainital.webp" },
    { name: "Gurgaon", photo: "/images/simulator/india/gurgaon.webp" },
    { name: "Indore", photo: "/images/simulator/india/indore.webp" },
  ],

  overseasLocations: [
    { name: "USA", photo: "/images/simulator/overseas/usa.webp" },
    { name: "Australia", photo: "/images/simulator/overseas/australia.webp" },
    { name: "United Kingdom", photo: "/images/simulator/overseas/uk.webp" },
    { name: "Saudi Arabia", photo: "/images/simulator/overseas/saudi-arabia.webp" },
    { name: "Bangladesh", photo: "/images/simulator/overseas/bangladesh.webp" },
    { name: "Canada", photo: "/images/simulator/overseas/canada.webp" },
    { name: "Bahrain", photo: "/images/simulator/overseas/bahrain.webp" },
    { name: "Sri Lanka", photo: "/images/simulator/overseas/sri-lanka.webp" },
    { name: "South Africa", photo: "/images/simulator/overseas/south-africa.webp" },
    { name: "Dubai", photo: "/images/simulator/overseas/dubai.webp" },
  ],

  parts: [
    { num: 1, title: "Bowling simulator", icon: "gear" },
    { num: 2, title: "Game software", icon: "monitor" },
    { num: 3, title: "Scoring system", icon: "clipboard" },
    { num: 4, title: "Projector or LED screen", icon: "video" },
    { num: 5, title: "Video replay system", icon: "camera" },
    { num: 6, title: "Batting cage", icon: "layers" },
  ],

  sizes: [
    { value: "10 × 2.5 × 2.5", label: "Minimum" },
    { value: "15 × 3 × 3", label: "Ideal" },
    { value: "20 × 3 × 3", label: "Max" },
  ],

  robot: [
    { title: "Motorized actuator system", desc: "Adjust line, length and angles seamlessly via precision control." },
    { title: "Spin & swing control", desc: "Master off-spin, leg-spin and swinging deliveries effortlessly." },
    { title: "Auto variations", desc: "Intelligent adjustments to simulate realistic bowler unpredictability." },
    { title: "High-capacity feeder", desc: "150-ball capacity allows longer training sessions without interruptions." },
    { title: "BLDC motors", desc: "Next-gen EV technology ensuring maximum efficiency and durability." },
  ],
    features: [
    {
      icon: "clock",
      title: "Match duration",
      points: [
        "Custom overs — choose any length from 1 to 10+ overs.",
        "Flexibility — quick 5-minute games or full match simulations.",
        "Event fit — tailor timing for corporate events or parties.",
      ],
    },
    {
      icon: "user",
      title: "Bowler selection",
      points: [
        "Variety — spinners, pacers or medium fast options.",
        "Strategy — match the bowler to the batsman's weakness.",
        "Control — operator can switch bowlers between overs.",
      ],
    },
    {
      icon: "target",
      title: "Smart targets",
      points: [
        "Skill based — set runs per over based on player level.",
        "Dynamic — system adjusts difficulty for balanced play.",
        "Challenge — create scenarios like \"30 runs in 2 overs\".",
      ],
    },
    {
      icon: "monitor",
      title: "External display",
      points: [
        "Spectator view — a dedicated third screen for the audience.",
        "Live stats — rank, run rate and ball-by-ball data.",
        "Engagement — keeps waiting players involved in the game.",
      ],
    },
  ],

   featureScreens: [
    { photo: "/images/simulator/screens/game-start.jpg", alt: "Game start screen" },
    { photo: "/images/simulator/screens/player-details.jpg", alt: "Enter player details" },
  ],

  modes: [
    {
            photo: "/images/simulator/modes/target-mode.webp",
      tag: "Target Mode · Team Play",
      tagColor: "cyan",
      title: "Chase it down, together.",
      items: [
        { icon: "👥", b: "Team collaboration", t: "Whole team chases one preset target." },
        { icon: "📊", b: "Shared scoreboard", t: "Balls left & runs required, live." },
        { icon: "🎚", b: "Custom difficulty", t: "Backyard to Legendary." },
      ],
      env: "Parties · Academies · Corporate events",
    },
    {
      photo: "/images/simulator/modes/social-mode.webp",
      tag: "Social Mode · Player vs Player",
      tagColor: "green",
      title: "Every player for themselves.",
      items: [
        { icon: "👑", b: "Head-to-head", t: "Highest total wins." },
        { icon: "📈", b: "Live leaderboard", t: "Runs, balls, strike rate, rank." },
        { icon: "🏅", b: "Spotlight awards", t: "Super Striker, Super 4s, Super 6s." },
      ],
      env: "Tournaments · Leagues · Prize challenges",
    },
  ],
    leaderboard: [
    {
      icon: "list",
      title: "Live game statistics",
      desc: "Real-time scoring updates displayed instantly on an external screen outside the lane, keeping spectators engaged with every ball bowled.",
    },
    {
      icon: "users",
      title: "Audience engagement",
      desc: "Transform passive waiting into active viewing. Friends and family can track progress, creating a stadium-like atmosphere outside the cage.",
    },
    {
      icon: "trophy",
      title: "Performance tracking",
      desc: "Showcase leaderboards, high scores and player rankings to drive competitive spirit and encourage repeat plays.",
    },
  ],

  bowlers: ["Ishant Sharma", "Ravi Ashwin", "Deepak Chahar", "Shakib Al Hasan"],

 

  displayOptions: [
    {
      tag: "Standard option",
      tagColor: "cyan",
      title: "Projector setup",
      points: [
        { b: "4:3 aspect ratio", t: "Standard projection format optimized for cricket simulation gameplay." },
        { b: "Impact protection", t: "Solid plywood backing reinforces the screen against high-speed ball impacts." },
        { b: "Release point", t: "Precision cutout allows the bowling machine to fire directly through the screen." },
      ],
    },
    {
      tag: "Premium upgrade",
      tagColor: "green",
      title: "P3 LED screen",
      points: [
        { b: "Enhanced visuals", t: "High-brightness P3 LED modules deliver vivid colors and sharp contrast." },
        { b: "Polycarbonate shield", t: "Transparent, high-strength polycarbonate screen installed in front protects the LED modules." },
        { b: "Seamless experience", t: "No shadows or ambient light interference — a superior professional aesthetic." },
      ],
    },
  ],
    cageSpecs: [
    {
      component: "Structure",
      lines: [
        { b: "50mm square pipe with powder-coated colour in black." },
        { t: "(Colour can be customised)" },
        { t: "Minimum: 10 × 2.5 × 2.5 meters" },
        { t: "Ideal: 15 × 3 × 3 meters" },
      ],
    },
    {
      component: "Nets",
      lines: [
        { b: "Made of 2.5mm thickness with 50mm hole gap." },
        { t: "Available colours: Blue, Green, White, Black." },
      ],
    },
    {
      component: "Flooring",
      lines: [
        { b: "Artificial turf — default" },
        { t: "High-density cricket turf, 15mm pile height." },
        { b: "PP tiles — on demand" },
        { t: "Available based on specific requirement." },
      ],
    },
  ],

  manufacturing: [
    { b: "Integrated hardware + sensing + software", t: "Seamless ecosystem built from the ground up." },
    { b: "Training + entertainment = one platform", t: "Versatile solution serving multiple market segments." },
    { b: "In-house deep-tech advantage", t: "Full control over IP and technology roadmap." },
    { b: "Modular product architecture", t: "What others sell as a product, we treat as a module." },
    { b: "Scalable production model", t: "Each module could be a standalone company elsewhere." },
  ],
    architectureStack: {
    core: "SD Infinity Core",
    layers: [
      { icon: "cpu", label: "Hardware" },
      { icon: "radio", label: "Sensing" },
      { icon: "code", label: "Software" },
    ],
  },
  facilities: [
    {
      title: "Hyderabad — Manufacturing",
      photo: "/images/operate/Factory.webp",
      points: ["Mechanical assembly", "Precision calibration", "Scalable production"],
    },
    {
      title: "Bengaluru — Electronics lab",
      photo: "/images/operate/RDLab.webp",
      points: ["Hardware-software integration", "Advanced testing lab", "R&D center"],
    },
  ],

  clients: [
    { name: "TimeZone", logo: "/images/partners/TimeZone.webp" },
    { name: "Google", logo: "/images/partners/Google.webp" },
    { name: "Samsung", logo: "/images/partners/Samsung.webp" },
    { name: "Intel", logo: "/images/partners/Intel.webp" },
    { name: "Embassy Group", logo: "/images/partners/EmbassyGroup.webp" },
    { name: "Lulu", logo: "/images/partners/Lulu.webp" },
    { name: "Funtura", logo: "/images/partners/Funtura.webp" },
    { name: "Sloggers", logo: "/images/partners/Sloggers_UK_logo.webp" },
    { name: "Play Arena", logo: "/images/partners/PlayArena.webp" },
    { name: "Loco Bear", logo: "/images/partners/LocoBear.webp" },
    { name: "Masti Zone", logo: "/images/partners/MastiZone.webp" },
    { name: "Bustterz", logo: "/images/partners/Bustterz.webp" },
    { name: "Glued", logo: "/images/partners/Glued.webp" },
  ],
};