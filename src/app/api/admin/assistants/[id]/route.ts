import { createClient } from "@/lib/supabase/server";
import { requireAdmin, isErrorResponse } from "@/lib/admin/auth";
import { NextResponse } from "next/server";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdmin();
  if (isErrorResponse(auth)) return auth;

  const { id } = await params;
  const body = await request.json();

  const updates: Record<string, unknown> = {
    updated_at: new Date().toISOString(),
  };

  const allowedFields = [
    "name",
    "slug",
    "description",
    "long_description",
    "category",
    "min_tier",
    "icon_name",
    "sort_order",
    "is_active",
    "is_featured",
    "provider",
    "model",
    "temperature",
    "max_tokens",
    "system_prompt",
    "knowledge_files",
    "knowledge_description",
  ];

  for (const field of allowedFields) {
    if (field in body) {
      updates[field] = body[field];
    }
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("assistants")
    .update(updates)
    .eq("id", id);

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json(
        { error: "Ein Assistent mit diesem Slug existiert bereits." },
        { status: 409 }
      );
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdmin();
  if (isErrorResponse(auth)) return auth;

  const { id } = await params;

  const supabase = await createClient();
  const { error } = await supabase.from("assistants").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
