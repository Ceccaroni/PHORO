import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { AssistentGrid } from "@/components/marketplace/AssistentGrid";
import type { Assistant, Category, Profile } from "@/types/database";

const validCategories: Category[] = ["unterricht", "leadership", "admin"];

const categoryLabels: Record<Category, string> = {
  unterricht: "Unterricht",
  leadership: "Leadership",
  admin: "Admin",
};

export default async function MarketplacePage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  if (!validCategories.includes(category as Category)) {
    notFound();
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const [profileResult, assistantsResult] = await Promise.all([
    supabase
      .from("profiles")
      .select("tier")
      .eq("id", user!.id)
      .single<Pick<Profile, "tier">>(),
    supabase
      .from("assistants")
      .select("*")
      .eq("category", category)
      .eq("is_active", true)
      .order("sort_order")
      .returns<Assistant[]>(),
  ]);

  const userTier = profileResult.data?.tier ?? "dawn";
  const assistants = assistantsResult.data ?? [];

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <h2 className="mb-6 text-[11px] font-bold uppercase tracking-[0.2em] text-phoro-text/50">
        {categoryLabels[category as Category]}
      </h2>
      <AssistentGrid assistants={assistants} userTier={userTier} />
    </div>
  );
}
