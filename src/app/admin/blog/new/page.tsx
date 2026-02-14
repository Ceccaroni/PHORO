import { BlogPostForm } from "@/components/admin/BlogPostForm";

export default function NewBlogPostPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-phoro-primary">Neuer Beitrag</h1>
      <p className="mt-1 text-sm text-phoro-text/60">Neuen Blog-Beitrag verfassen</p>
      <div className="mt-6">
        <BlogPostForm mode="create" />
      </div>
    </div>
  );
}
