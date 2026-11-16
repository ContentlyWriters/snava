// app/sitemap/route.js
export async function generateSitemap() {
  const baseUrl = "https://www.snava.in";

  // lastmod = the date each page's content last changed. Update the date
  // when you change a page. /track and the cart are noindex, so not listed.
  const staticUrls = [
    { loc: "/", lastmod: "2026-11-16", priority: 1.0 },
    { loc: "/labreport", lastmod: "2026-11-02", priority: 0.7 },
    { loc: "/policy/shipping-policy", lastmod: "2026-07-12", priority: 0.4 },
    { loc: "/policy/refund-cancellation-policy", lastmod: "2026-07-12", priority: 0.4 },
    { loc: "/policy/privacy-policy", lastmod: "2026-07-12", priority: 0.3 },
    { loc: "/policy/terms-conditions", lastmod: "2026-07-12", priority: 0.3 },
  ];

  const dynamicUrls = [
    { loc: "/products/earth-crunch", lastmod: "2026-11-16", priority: 0.9 },
    { loc: "/products/smoked-cacao", lastmod: "2026-11-16", priority: 0.9 },
    { loc: "/products/desert-cacao", lastmod: "2026-11-16", priority: 0.9 },
    { loc: "/products/snava-gift-box", lastmod: "2026-11-16", priority: 0.9 },
    { loc: "/products/chocoholic-box", lastmod: "2026-11-16", priority: 0.9 },
  ];

  const urls = [...staticUrls, ...dynamicUrls];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls
    .map(
      ({ loc, lastmod, priority }) => `
    <url>
      <loc>${baseUrl}${loc}</loc>
      <lastmod>${lastmod}</lastmod>
      <priority>${priority}</priority>
    </url>
  `
    )
    .join("")}
</urlset>`;
}

export async function GET() {
  const sitemap = await generateSitemap();

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
