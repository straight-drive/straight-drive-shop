
export const productContent = {
  "paceattack-pro": {
    tier: "Professional",
    titleMain: "PACE",
    titleEm: "ATTACK",
    titleEnd: " PRO",
    flagship: true,
    purchasable: true,
    lede: "Professional pace training with full app control — every ball recorded, every session measured.",
    keySpecs: [
      { value: "160", label: "km/h" },
      { value: "Swing", label: "variations" },
      { value: "Video Replay", label: "In-app" },
    ],
    features: [
      {
        img: "Screenshot — TAB app, ball-by-ball replay list",
        photo: "/images/paceattack/Application_Replay.png",
        eyebrow: "Major feature",
        title: "Video replay of every ball.",
        desc: "Control the machine from an app and review a stored video replay of every single delivery — see exactly how you played each ball, session after session.",
        chips: ["Every ball stored", "Session history", "BLE control"],
      },
      {
        img: "Photo — ball leaving the head at pace",
        photo: "/images/paceattack/swing.jpg",
        eyebrow: "Major feature",
        title: "Up to 160 km/h with swing variations.",
        desc: "Genuine express pace plus outswing and inswing on demand — train against the deliveries that actually get batters out.",
        chips: ["160 km/h", "Outswing", "Inswing"],
      },
      {
        img: "Photo — TFT touch screen on machine",
        photo: "/images/paceattack/touch-screen.jpg",
        eyebrow: "Major feature",
        title: "Touch-screen TFT on the machine.",
        desc: "Full control at the machine itself — set pace, swing and feed without reaching for the tablet.",
        chips: ["TFT display", "On-machine control"],
      },
      {
        img: "Photo — tilt and pan mechanism close-up",
        photo: "/images/paceattack/tilt.jpg",
        eyebrow: "Major feature",
        title: "Precise tilt and pan change system.",
        desc: "Motorized line and length changes with repeatable precision — move the ball around the batter exactly where the drill demands.",
        chips: ["Motorized", "Repeatable line and length"],
      },
      {
        img: "Photo — polyurethane wheels / drive assembly",
        photo: "/images/paceattack/wheels.jpg",
        eyebrow: "Major feature",
        title: "Polyurethane wheels, well-built mechanicals.",
        desc: "A robust mechanical system built around polyurethane drive wheels — the same engineering standard as our commercial simulators.",
        chips: ["PU wheels", "Commercial-grade build"],
      },
      {
        img: "Photo — hard PU balls and leather ball",
        eyebrow: "Major feature",
        title: "Bowls hard PU balls — leather too.",
        desc: "Takes hard polyurethane balls that behave like a cricket ball, with occasional leather-ball use supported for match-feel sessions.",
        chips: ["Hard PU balls", "Occasional leather"],
      },

    ],
    specGroups: [
      {
        title: "Delivery",
        rows: [
          { label: "Top speed", value: "160 km/h" },
          { label: "Variations", value: "Pace, Outswing, Inswing" },
          { label: "Ball type", value: "Hard PU balls, occasional leather supported" },
        ],
      },
      {
        title: "Control",
        rows: [
          { label: "TAB app", value: "Yes — full control plus stored video replay of every ball" },
          { label: "On-machine", value: "Touch-screen TFT" },
          { label: "Line and length", value: "Motorized precise tilt and pan system" },
        ],
      },
      {
        title: "Build and Support",
        rows: [
          { label: "Drive", value: "Polyurethane wheels, commercial-grade mechanical system" },
          { label: "Service", value: "Mon-Sat, 9:30 to 18:30 IST, quick spares turnaround" },
          { label: "Dimensions, weight, power", value: "To be confirmed" },
          { label: "Warranty", value: "12 months plus AMC options" },
        ],
      },
    ],
  },
 "cricket-balls": {
    tier: "Consumables",
    titleMain: "CRICKET ",
    titleEm: "BALLS",
    lede: "Standard machine ball, match weight. Built for our wheels — consistent seam, consistent bounce, long life.",
    keySpecs: [
      { value: "145", label: "g weight" },
      { value: "PU", label: "hard dimple" },
      { value: "All", label: "machines" },
    ],
    features: [
      {
        img: "Photo — ball close-up showing seam and dimple texture",
        eyebrow: "Major feature",
        title: "Cricket-ball feel, machine-ball durability.",
        desc: "Hard polyurethane dimple construction that behaves like a leather ball off the pitch, but survives thousands of deliveries through the wheels.",
        chips: ["Hard PU", "145g", "Match weight"],
      },
      {
        img: "Photo — balls loaded in machine feeder",
        eyebrow: "Major feature",
        title: "Built for our wheels.",
        desc: "Sized and weighted specifically for Straight Drive machines — consistent feed, consistent release, no wheel damage over time.",
        chips: ["All machines", "Consistent feed"],
      },
      {
        img: "Photo — red and yellow balls side by side",
        eyebrow: "Options",
        title: "Two colours, two pack sizes.",
        desc: "Red for traditional net sessions, yellow for high-visibility indoor and evening play. Available in boxes of 6 or 12.",
        chips: ["Red", "Yellow", "Box of 6", "Box of 12"],
      },
      {
        img: "Photo — worn vs new ball comparison",
        eyebrow: "Ownership",
        title: "Consumables, priced to restock.",
        desc: "Balls wear with use — that is normal. Keep a box on the shelf so a session is never cut short.",
        chips: ["Consumable", "Restock easily"],
      },
    ],
    specGroups: [
      {
        title: "Ball",
        rows: [
          { label: "Weight", value: "145g" },
          { label: "Construction", value: "Hard PU dimple, cricket-ball feel" },
          { label: "Compatibility", value: "All Straight Drive machines" },
        ],
      },
      {
        title: "Pack",
        rows: [
          { label: "Available in", value: "Box of 6 or Box of 12" },
          { label: "Colours", list: ["Red", "Yellow"] },
        ],
      },
      {
        title: "Care",
        rows: [
          { label: "Warranty", value: "Consumable item — not covered under warranty" },
          { label: "Expected life", tbc: true },
        ],
      },
    ],
  },
 twister: {
    tier: "Swing and Spin",
    titleMain: "TWI",
    titleEm: "STER",
    lede: "Dedicated swing and spin machine — outswing, inswing, off-spin and leg-spin on demand, for batters who want the hard deliveries every ball.",
    keySpecs: [
      { value: "4", label: "variations" },
      { value: "Spin", label: "plus swing" },
      { value: "App", label: "control" },
    ],
    features: [
      {
        img: "Photo — ball leaving the head with visible seam angle",
        eyebrow: "Major feature",
        title: "Four genuine variations on demand.",
        desc: "Outswing, inswing, off-spin and leg-spin — switch between them mid-session and make the batter read the ball, not the machine.",
        chips: ["Outswing", "Inswing", "Off-spin", "Leg-spin"],
      },
      {
        img: "Photo — spin adjustment mechanism close-up",
        eyebrow: "Major feature",
        title: "Adjustable turn intensity.",
        desc: "Dial the amount of spin up or down to match the surface you are preparing for — from subtle drift to sharp turn.",
        chips: ["Variable turn", "Repeatable"],
      },
      {
        img: "Screenshot — app control panel",
        eyebrow: "Major feature",
        title: "App and on-machine control.",
        desc: "Set deliveries from your phone or straight from the panel on the machine — whichever suits the session.",
        chips: ["App control", "On-machine panel"],
      },
      {
        img: "Photo — machine in academy nets",
        eyebrow: "Built for volume",
        title: "Made for academy sessions.",
        desc: "Built to the same commercial standard as the rest of the range — designed to run through back-to-back sessions, day after day.",
        chips: ["Commercial-grade", "Daily use"],
      },
      {
        img: "Photo — service engineer at machine",
        eyebrow: "Ownership",
        title: "Service support, six days a week.",
        desc: "Our own service team, Monday to Saturday, 9:30 to 18:30 IST — with quick turnaround on spares from our Hyderabad factory.",
        chips: ["Mon-Sat 9:30-18:30 IST", "Quick spares turnaround"],
      },
    ],
    specGroups: [
      {
        title: "Delivery",
        rows: [
          { label: "Variations", list: ["Outswing", "Inswing", "Off-spin", "Leg-spin"] },
          { label: "Top speed", tbc: true },
          { label: "Spin control", value: "Adjustable turn intensity" },
        ],
      },
      {
        title: "Control and Power",
        rows: [
          { label: "Control", value: "App plus on-machine panel" },
          { label: "Power", value: "230V AC" },
        ],
      },
      {
        title: "Build and Support",
        rows: [
          { label: "Dimensions and weight", tbc: true },
          { label: "Service", value: "Mon-Sat, 9:30 to 18:30 IST, quick spares turnaround" },
          { label: "Warranty", value: "12 months plus AMC options" },
        ],
      },
    ],
  },

  "cricket-simulator": {
    tier: "Flagship",
    title: "CRICKET SIMULATOR",
    sub: "Full-lane cricket simulation — real bowling, autoscoring and big-screen gameplay that anchors an entire venue.",
    purchasable: false,
    venueNote: "Venue product — priced per installation. We handle layout, install, training and AMC.",
    keySpecs: [
      { value: "Full", label: "lane" },
      { value: "Auto", label: "scoring" },
      { value: "100", label: "ball feeder" },
    ],
    features: [
      { title: "Real bowling", desc: "Robotic BLDC bowling machine delivering match-like pace and variations." },
      { title: "Smart scoring", desc: "Target boards and scoring zones with live leaderboards." },
      { title: "Instant replays", desc: "Video highlights on the external display to pull a crowd." },
      { title: "Fully automatic", desc: "Bowls, scores, displays graphics and updates leaderboards on its own." },
    ],
    ctaTitle: "The centrepiece of your venue.",
  },

 "pixel-play": {
    tier: "Compact",
    titleMain: "PIXEL ",
    titleEm: "PLAY",
    lede: "The compact cricket simulator — big-screen cricket fun in a smaller footprint, for malls, parties and family venues.",
    purchasable: false,
    venueNote: "Venue product — priced per installation. We handle layout, install, training and AMC.",
    keySpecs: [
      { value: "Compact", label: "footprint" },
      { value: "Big", label: "screen" },
      { value: "All", label: "ages" },
    ],
    features: [
      {
        img: "Photo — Pixel Play unit installed in a mall corridor",
        eyebrow: "Major feature",
        title: "Fits where a full lane cannot.",
        desc: "A fraction of the space of a full simulator lane, so it drops into mall corridors, party halls and family zones that could never host a full setup.",
        chips: ["Small footprint", "Mall-ready", "Quick install"],
      },
      {
        img: "Photo — player mid-shot with big screen behind",
        eyebrow: "Major feature",
        title: "Big-screen cricket, small space.",
        desc: "The screen and gameplay stay full-scale, so it still feels like a proper cricket experience rather than a cut-down version.",
        chips: ["Big screen", "Full gameplay"],
      },
      {
        img: "Photo — kids and adults queuing to play",
        eyebrow: "Major feature",
        title: "Walk-up, no coaching required.",
        desc: "Short high-energy formats designed for crowds who want to play immediately — softer deliveries and simple controls mean anyone can bat.",
        chips: ["All ages", "Short sessions", "No instructions"],
      },
      {
        img: "Screenshot — leaderboard and scoring display",
        eyebrow: "Major feature",
        title: "The same platform as the flagship.",
        desc: "Runs the same Straight Drive sensing, scoring and leaderboard technology as our full Cricket Simulator — proven across hundreds of installations.",
        chips: ["Same platform", "Live leaderboards"],
      },
      {
        img: "Photo — operator at touch screen",
        eyebrow: "Operations",
        title: "One operator, minimal training.",
        desc: "Simple touch-screen interface means a single staff member can run it alongside other duties, keeping running costs low.",
        chips: ["One operator", "Simple interface"],
      },
      {
        img: "Photo — service engineer at machine",
        eyebrow: "Ownership",
        title: "Service support, six days a week.",
        desc: "Our own service team, Monday to Saturday, 9:30 to 18:30 IST — with quick turnaround on spares from our Hyderabad factory.",
        chips: ["Mon-Sat 9:30-18:30 IST", "Quick spares turnaround"],
      },
    ],
    specGroups: [
      {
        title: "Setup",
        rows: [
          { label: "Footprint", tbc: true },
          { label: "Power", value: "230V AC" },
          { label: "Screen", value: "Big-screen display, size to be confirmed" },
        ],
      },
      {
        title: "Experience",
        rows: [
          { label: "Session length", value: "Short-format, walk-up friendly" },
          { label: "Age range", value: "All ages" },
          { label: "Scoring", value: "Smart target zones with live leaderboards" },
        ],
      },
      {
        title: "Ownership",
        rows: [
          { label: "Staff needed", value: "One operator" },
          { label: "Service", value: "Mon-Sat, 9:30 to 18:30 IST" },
          { label: "AMC", value: "Optional annual maintenance plans available" },
        ],
      },
    ],
  },

 "subgoal-soccer": {
    tier: "Social Game",
    titleMain: "SUBGOAL ",
    titleEm: "SOCCER",
    lede: "Fast-paced tabletop football with a twist — social, competitive and endlessly replayable.",
    purchasable: false,
    price: "₹98,600",
    venueNote: "Venue product — priced per installation. We handle layout, install, training and AMC.",
    keySpecs: [
      { value: "2-4", label: "players" },
      { value: "60s", label: "rounds" },
      { value: "Any", label: "venue" },
    ],
    features: [
      {
        photo: "/images/Subgoal/Soccer.jpg",
        eyebrow: "Major feature",
        title: "Electronic score tracking.",
        desc: "Automatically tracks goals and displays the score, eliminating manual scoring found on conventional soccer tables.",
        chips: ["Automatic scoring", "Live display"],
      },
      {
        photo: "/images/Subgoal/Socr.jpg",
        eyebrow: "Major feature",
        title: "A modern take on table soccer.",
        desc: "Brings a fresh, contemporary playing format to the classic soccer-table category while retaining the competitive 1-v-1 experience.",
        chips: ["Contemporary format", "1-v-1"],
      },
      {
        photo: "/images/Subgoal/Sub.jpg",
        eyebrow: "Major feature",
        title: "Fast, skill-based gameplay.",
        desc: "Rewards reaction speed, accuracy and ball control, making every rally competitive and engaging.",
        chips: ["Reaction speed", "Ball control"],
      },
      {
        photo: "/images/Subgoal/Subg.jpg",
        eyebrow: "Major feature",
        title: "No manual score counters.",
        desc: "Integrated scoring makes the experience cleaner and more premium compared with traditional foosball-style tables.",
        chips: ["Integrated scoring", "Premium finish"],
      },
      {
        photo: "/images/Subgoal/Subgoal.jpg",
        eyebrow: "Major feature",
        title: "Compact entertainment attraction.",
        desc: "Delivers a highly engaging football game in a relatively small footprint — ideal for arcades, FECs, malls and sports venues.",
        chips: ["Small footprint", "Arcades & FECs", "Malls"],
      },
      {
        photo: "/images/Subgoal/subgoal-hero.jpg",
        fit: "contain",
        eyebrow: "Operations",
        title: "Built for repeat play.",
        desc: "Quick games, visible scoring and head-to-head competition naturally encourage rematches and high player turnover.",
        chips: ["High turnover", "Rematch-friendly"],
      },
    ],
  
    specGroups: [
      {
        title: "Gameplay",
        rows: [
          { label: "Players", value: "2 to 4" },
          { label: "Round length", value: "60 seconds" },
          { label: "Scoring", value: "Built-in score tracking and tournament mode" },
        ],
      },
      {
        title: "Physical",
        rows: [
          { label: "Format", value: "Compact table, fits cafes and breakout areas" },
          { label: "Dimensions and weight", tbc: true },
          { label: "Power", value: "230V AC" },
        ],
      },
      {
        title: "Ownership",
        rows: [
          { label: "Durability", value: "Commercial-duty build" },
          { label: "Service", value: "Mon-Sat, 9:30 to 18:30 IST" },
          { label: "AMC", value: "Optional annual maintenance plans available" },
        ],
      },
    ],
  }}