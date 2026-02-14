import { createClient } from "@/lib/supabase/server";
import { requireAdmin, isErrorResponse } from "@/lib/admin/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const auth = await requireAdmin();
  if (isErrorResponse(auth)) return auth;

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const auth = await requireAdmin();
  if (isErrorResponse(auth)) return auth;

  const body = await request.json();
  const { title, slug, content, excerpt, is_published, published_at } = body;

  if (!title || !slug) {
    return NextResponse.json(
      { error: "Titel und Slug sind Pflichtfelder." },
      { status: 400 }
    );
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .insert({
      title,
      slug,
      content: content ?? "",
      excerpt: excerpt ?? null,
      is_published: is_published ?? false,
      published_at: published_at ?? null,
      author_id: auth.user.id,
    })
    .select("id")
    .single();

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json(
        { error: "Ein Beitrag mit diesem Slug existiert bereits." },
        { status: 409 }
      );
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ id: data.id }, { status: 201 });
}
