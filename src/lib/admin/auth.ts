import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import type { Profile } from "@/types/database";

interface AdminAuth {
  user: { id: string; email: string };
  profile: Profile;
}

/**
 * Verifies the request is from an authenticated admin user.
 * Returns { user, profile } on success, or a NextResponse error.
 */
export async function requireAdmin(): Promise<
  AdminAuth | NextResponse
> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single<Profile>();

  if (!profile?.is_admin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  return {
    user: { id: user.id, email: user.email ?? "" },
    profile,
  };
}

/** Type guard to check if requireAdmin returned an error response */
export function isErrorResponse(
  result: AdminAuth | NextResponse
): result is NextResponse {
  return result instanceof NextResponse;
}
