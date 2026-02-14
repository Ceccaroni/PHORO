import { createClient } from "@/lib/supabase/server";
import { requireAdmin, isErrorResponse } from "@/lib/admin/auth";
import { NextResponse } from "next/server";

const VALID_TIERS = ["dawn", "light", "beacon", "pharos"];

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdmin();
  if (isErrorResponse(auth)) return auth;

  const { id } = await params;
  const { tier } = (await request.json()) as { tier: string };

  if (!tier || !VALID_TIERS.includes(tier)) {
    return NextResponse.json(
      { error: "Ungültiger Tier-Wert." },
      { status: 400 }
    );
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("profiles")
    .update({ tier, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
