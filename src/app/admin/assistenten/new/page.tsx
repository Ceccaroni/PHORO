import { AssistantForm } from "@/components/admin/AssistantForm";

export default function NewAssistantPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-phoro-primary">Neuer Assistent</h1>
      <p className="mt-1 text-sm text-phoro-text/60">
        Neuen Assistenten erstellen und konfigurieren
      </p>
      <div className="mt-6">
        <AssistantForm mode="create" />
      </div>
    </div>
  );
}
