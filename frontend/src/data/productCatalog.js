// src/data/productCatalog.js
// Single source of truth for every customer-facing product entry.
// "variants" items (Cricket Balls) map to 3 real products under one listing card.

export const catalog = [
  {
    key: "paceattack-pro",
    name: "PaceAttack Pro",
    category: "performance-training",
    dbSlug: "paceattack-pro",
    photo: "Photo — PaceAttack Pro",
    leadTime: "15 working days",
    desc: "Professional pace training with full app control — up to 160 km/h with swing variations.",
    cardPhoto: "/images/products/paceattack.jpeg",
    cardFit: "contain",
  },
 {
    key: "twister",
    name: "Twister",
    category: "performance-training",
    dbSlug: "twister",
    photo: "Photo — Twister",
    leadTime: "15 working days",
    desc: "Dedicated swing and spin machine — outswing, inswing, off-spin and leg-spin on demand.",
    comingSoon: true,
    cardPhoto: "/images/products/Twister.jpg",
  },
 {
    key: "cricket-balls",
    name: "Cricket Balls",
    category: "performance-training",
    photo: "Photo — Cricket Balls",
    leadTime: null,
        variants: [
      { label: "Box of 6", dbSlug: "cricket-balls-box-of-6" },
      { label: "Box of 12", dbSlug: "cricket-balls-box-of-12" },
    ],
    colors: [
      { label: "Red", hex: "#C0392B", weight: "145g" },
      { label: "Yellow", hex: "#E8B800", weight: "80g" },
    ],
    cardPhoto: "/images/products/ball.jpeg",
  },
 {
    key: "cricket-simulator",
    name: "Cricket Simulator",
    category: "entertainment",
    dbSlug: "cricket-simulator",
    photo: "Flagship photo — Cricket Simulator",
    leadTime: "15 working days",
   desc: "Full-lane cricket simulation, real bowling, autoscoring and big-screen gameplay that anchors an entire venue.",
    purchasable: false,
    cardPhoto: "/images/products/Cricket-sim.jpeg",
  },
    {
    key: "pixel-play",
    name: "Pixel Play",
    category: "entertainment",
    dbSlug: "pixel-play",
    photo: "Photo — Pixel Play",
    leadTime: "15 working days",
    purchasable: false,
    desc: "The compact cricket simulator — big-screen cricket in a smaller footprint.",
    comingSoon: true,
    cardPhoto: "/images/products/Pixel-simulator.webp",
  },
  {
    key: "subgoal-soccer",
    name: "SubGoal Soccer",
    category: "entertainment",
    dbSlug: "subgoal-soccer",
    photo: "Photo — SubGoal Soccer",
    leadTime: "15 working days",
    purchasable: false,
    desc: "Fast-paced tabletop football — social, competitive, endlessly replayable.",
    cardPhoto: "/images/products/Subgoal.jpeg",
  },
];

export function getByKey(key) {
  return catalog.find((p) => p.key === key);
}

export function getOthers(currentKey, limit = 5) {
  const current = catalog.find((p) => p.key === currentKey);
  const available = catalog.filter((p) => p.key !== currentKey && !p.comingSoon);

  // Same category first, then everything else.
  const sameCategory = available.filter((p) => p.category === current?.category);
  const otherCategory = available.filter((p) => p.category !== current?.category);

  return [...sameCategory, ...otherCategory].slice(0, limit);
}