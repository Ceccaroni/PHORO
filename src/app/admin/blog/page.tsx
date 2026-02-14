import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Plus } from "lucide-react";
import { StatusBadge } from "@/components/admin/StatusBadge";
import type { BlogPost } from "@/types/database";

export default async function AdminBlogPage() {
  const supabase = await createClient();

  const { data: posts } = await supabase
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false })
    .returns<BlogPost[]>();

  const blogPosts = posts ?? [];

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-phoro-primary">Blog</h1>
          <p className="mt-1 text-sm text-phoro-text/60">{blogPosts.length} Beiträge</p>
        </div>
        <Link
          href="/admin/blog/new"
          className="flex items-center gap-2 rounded-lg bg-phoro-cta px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-phoro-cta/90"
        >
          <Plus size={16} />
          Neuer Beitrag
        </Link>
      </div>

      <div className="mt-6 overflow-x-auto rounded-xl border border-phoro-divider bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-phoro-divider">
              <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-[0.15em] text-phoro-text/50">Titel</th>
              <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-[0.15em] text-phoro-text/50">Status</th>
              <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-[0.15em] text-phoro-text/50">Erstellt</th>
            </tr>
          </thead>
          <tbody>
            {blogPosts.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-4 py-8 text-center text-phoro-text/50">Noch keine Blog-Beiträge.</td>
              </tr>
            ) : (
              blogPosts.map((post) => (
                <tr key={post.id} className="border-b border-phoro-divider/50 last:border-0 hover:bg-phoro-bg/50">
                  <td className="px-4 py-3">
                    <Link href={`/admin/blog/${post.id}`} className="font-medium text-phoro-primary hover:text-phoro-accent">
                      {post.title}
                    </Link>
                    <p className="text-xs text-phoro-text/40">/blog/{post.slug}</p>
                  </td>
                  <td className="px-4 py-3"><StatusBadge active={post.is_published} /></td>
                  <td className="px-4 py-3 text-phoro-text/50">{new Date(post.created_at).toLocaleDateString("de-CH")}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
