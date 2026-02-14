import { createClient } from "@/lib/supabase/server";
import { requireAdmin, isErrorResponse } from "@/lib/admin/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const auth = await requireAdmin();
  if (isErrorResponse(auth)) return auth;

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("assistants")
    .select("*")
    .order("category")
    .order("sort_order");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const auth = await requireAdmin();
  if (isErrorResponse(auth)) return auth;

  const body = await request.json();
  const {
    name,
    slug,
    description,
    long_description,
    category,
    min_tier,
    icon_name,
    sort_order,
    is_active,
    is_featured,
    provider,
    model,
    temperature,
    max_tokens,
    system_prompt,
  } = body;

  if (!name || !slug || !description || !system_prompt) {
    return NextResponse.json(
      { error: "Name, Slug, Beschreibung und Systemprompt sind Pflichtfelder." },
      { status: 400 }
    );
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("assistants")
    .insert({
      name,
      slug,
      description,
      long_description: long_description ?? null,
      category: category ?? "unterricht",
      min_tier: min_tier ?? "dawn",
      icon_name: icon_name ?? null,
      sort_order: sort_order ?? 0,
      is_active: is_active ?? false,
      is_featured: is_featured ?? false,
      provider: provider ?? "openai",
      model: model ?? "gpt-4o",
      temperature: temperature ?? 0.7,
      max_tokens: max_tokens ?? 4096,
      system_prompt,
    })
    .select("id")
    .single();

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json(
        { error: "Ein Assistent mit diesem Slug existiert bereits." },
        { status: 409 }
      );
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ id: data.id }, { status: 201 });
}
