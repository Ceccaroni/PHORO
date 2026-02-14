import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function PATCH(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const body = await request.json();
  const { display_name, organization_name, organization_role } = body as {
    display_name?: string;
    organization_name?: string;
    organization_role?: string;
  };

  const updates: Record<string, string | null> = {
    updated_at: new Date().toISOString(),
  };

  if (display_name !== undefined) updates.display_name = display_name || null;
  if (organization_name !== undefined)
    updates.organization_name = organization_name || null;
  if (organization_role !== undefined)
    updates.organization_role = organization_role || null;

  const { error } = await supabase
    .from("profiles")
    .update(updates)
    .eq("id", user.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
