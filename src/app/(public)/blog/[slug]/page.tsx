import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import type { Metadata } from "next";
import type { BlogPost } from "@/types/database";
import { format, parseISO } from "date-fns";
import { de } from "date-fns/locale";
import { ArrowLeft } from "lucide-react";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: post } = await supabase
    .from("blog_posts")
    .select("title, excerpt")
    .eq("slug", slug)
    .eq("is_published", true)
    .single<Pick<BlogPost, "title" | "excerpt">>();

  if (!post) return { title: "Nicht gefunden" };

  return {
    title: post.title,
    description: post.excerpt ?? `${post.title} – PHORO Blog`,
    openGraph: {
      title: post.title,
      description: post.excerpt ?? "",
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: post } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .single<BlogPost>();

  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <Link
        href="/blog"
        className="mb-8 inline-flex items-center gap-1 text-sm text-phoro-text/50 transition-colors hover:text-phoro-primary"
      >
        <ArrowLeft size={14} />
        Zurück zum Blog
      </Link>

      <header className="mb-8">
        {post.published_at && (
          <time className="text-xs text-phoro-text/40">
            {format(parseISO(post.published_at), "d. MMMM yyyy", {
              locale: de,
            })}
          </time>
        )}
        <h1 className="mt-2 text-3xl font-bold leading-tight text-phoro-primary">
          {post.title}
        </h1>
      </header>

      <div className="prose prose-sm max-w-none text-phoro-text prose-headings:text-phoro-primary prose-a:text-phoro-accent prose-strong:text-phoro-text prose-code:rounded prose-code:bg-phoro-sidebar prose-code:px-1 prose-code:py-0.5 prose-code:text-phoro-primary prose-pre:bg-phoro-sidebar">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {post.content}
        </ReactMarkdown>
      </div>
    </article>
  );
}
