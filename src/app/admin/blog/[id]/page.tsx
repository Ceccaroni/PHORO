import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { BlogPostForm } from "@/components/admin/BlogPostForm";
import type { BlogPost } from "@/types/database";

export default async function EditBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: post } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("id", id)
    .single<BlogPost>();

  if (!post) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-phoro-primary">
        {post.title} bearbeiten
      </h1>
      <p className="mt-1 text-sm text-phoro-text/60">
        Blog-Beitrag bearbeiten und Änderungen speichern
      </p>
      <div className="mt-6">
        <BlogPostForm post={post} mode="edit" />
      </div>
    </div>
  );
}
