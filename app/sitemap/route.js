// app/sitemap/route.js
export async function generateSitemap() {
  const baseUrl = "https://snava.in";
  
  const staticUrls = [
    { loc: "/", lastmod: "2024-11-26", priority: 1.0 },
    { loc: "/policy/", lastmod: "2024-11-26", priority: 0.6 },
   
  ];

  const dynamicUrls = [
      { loc: "/blog", lastmod: "2024-11-26", priority: 0.9 },
    { loc: "/blog/", lastmod: "2024-11-26", priority: 0.9 },
    { loc: "/products/smoked-cacao", lastmod: "2024-11-25", priority: 0.9 },
     { loc: "/products/earth-crunch", lastmod: "2024-11-25", priority: 0.9 },
   
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
