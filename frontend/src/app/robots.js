export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/dashboard", "/checkout", "/cart"],
    },
    sitemap: "https://straightdrivesports.com/sitemap.xml",
  };
}