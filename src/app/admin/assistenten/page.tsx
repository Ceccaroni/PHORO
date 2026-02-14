import { createClient } from "@/lib/supabase/server";
import { AssistantsTable } from "@/components/admin/AssistantsTable";
import type { Assistant } from "@/types/database";

export default async function AdminAssistantsPage() {
  const supabase = await createClient();

  const { data: assistants } = await supabase
    .from("assistants")
    .select("*")
    .order("category")
    .order("sort_order")
    .returns<Assistant[]>();

  return (
    <div>
      <h1 className="text-2xl font-bold text-phoro-primary">Assistenten</h1>
      <p className="mt-1 text-sm text-phoro-text/60">
        Assistenten erstellen, bearbeiten und verwalten
      </p>
      <div className="mt-6">
        <AssistantsTable assistants={assistants ?? []} />
      </div>
    </div>
  );
}
