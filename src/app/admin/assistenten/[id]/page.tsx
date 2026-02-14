import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { AssistantForm } from "@/components/admin/AssistantForm";
import type { Assistant } from "@/types/database";

export default async function EditAssistantPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: assistant } = await supabase
    .from("assistants")
    .select("*")
    .eq("id", id)
    .single<Assistant>();

  if (!assistant) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-phoro-primary">
        {assistant.name} bearbeiten
      </h1>
      <p className="mt-1 text-sm text-phoro-text/60">
        Assistent konfigurieren und Änderungen speichern
      </p>
      <div className="mt-6">
        <AssistantForm assistant={assistant} mode="edit" />
      </div>
    </div>
  );
}
