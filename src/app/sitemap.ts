import type { MetadataRoute } from "next";
import { createClient } from "@/lib/supabase/server";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient();
  const { data: posts } = await supabase
    .from("blog_posts")
    .select("slug, updated_at")
    .eq("is_published", true);

  const blogEntries = (posts ?? []).map((post) => ({
    url: `https://phoro.ch/blog/${post.slug}`,
    lastModified: post.updated_at,
  }));

  return [
    { url: "https://phoro.ch", lastModified: new Date() },
    { url: "https://phoro.ch/pricing", lastModified: new Date() },
    { url: "https://phoro.ch/about", lastModified: new Date() },
    { url: "https://phoro.ch/contact", lastModified: new Date() },
    { url: "https://phoro.ch/blog", lastModified: new Date() },
    { url: "https://phoro.ch/datenschutz", lastModified: new Date() },
    { url: "https://phoro.ch/impressum", lastModified: new Date() },
    ...blogEntries,
  ];
}
