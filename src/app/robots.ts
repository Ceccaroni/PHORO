import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/chat/", "/marketplace/", "/admin/", "/api/"],
    },
    sitemap: "https://phoro.ch/sitemap.xml",
  };
}
