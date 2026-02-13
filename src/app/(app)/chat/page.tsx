import { createClient } from "@/lib/supabase/server";

export default async function ChatPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("display_name")
    .eq("id", user!.id)
    .single();

  const displayName = profile?.display_name ?? "dort";

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-phoro-bg">
      <h1 className="text-4xl font-bold text-phoro-primary">
        Hallo {displayName}.
      </h1>
      <p className="mt-2 text-phoro-text/40">Was steht heute im Fokus?</p>
    </div>
  );
}
