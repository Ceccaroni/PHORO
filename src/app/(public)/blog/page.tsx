import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import type { Metadata } from "next";
import type { BlogPost } from "@/types/database";
import { format, parseISO } from "date-fns";
import { de } from "date-fns/locale";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Neuigkeiten und Einblicke rund um PHORO und KI in der Bildung.",
};

export default async function BlogPage() {
  const supabase = await createClient();
  const { data: posts } = await supabase
    .from("blog_posts")
    .select("id, title, slug, excerpt, published_at")
    .eq("is_published", true)
    .order("published_at", { ascending: false })
    .returns<
      Pick<BlogPost, "id" | "title" | "slug" | "excerpt" | "published_at">[]
    >();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="mb-8 text-3xl font-bold text-phoro-primary">Blog</h1>

      {!posts || posts.length === 0 ? (
        <p className="py-12 text-center text-sm text-phoro-text/40">
          Noch keine Beiträge veröffentlicht.
        </p>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="block rounded-2xl border border-phoro-divider bg-white p-6 transition-all duration-200 hover:shadow-md"
            >
              {post.published_at && (
                <time className="text-xs text-phoro-text/40">
                  {format(parseISO(post.published_at), "d. MMMM yyyy", {
                    locale: de,
                  })}
                </time>
              )}
              <h2 className="mt-1 text-lg font-semibold text-phoro-primary">
                {post.title}
              </h2>
              {post.excerpt && (
                <p className="mt-2 text-sm leading-relaxed text-phoro-text/60">
                  {post.excerpt}
                </p>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
