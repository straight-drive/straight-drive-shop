export default function sitemap() {
  const base = "https://straightdrivesports.com";
  const now = new Date();

  const routes = [
    "",
    "/about",
    "/contact",
    "/faq",
    "/book-demo",
    "/performance-training",
    "/performance-training/paceattack-pro",
    "/performance-training/twister",
    "/performance-training/cricket-balls",
    "/entertainment",
    "/entertainment/cricket-simulator",
    "/entertainment/subgoal-soccer",
    "/entertainment/pixel-play",
    "/legal/privacy-policy",
    "/legal/terms-and-conditions",
    "/legal/shipping-policy",
    "/legal/refund-and-cancellation-policy",
  ];

  return routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route.split("/").length === 2 ? 0.8 : 0.6,
  }));
}