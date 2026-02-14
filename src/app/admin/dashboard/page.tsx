import { createClient } from "@/lib/supabase/server";
import type { Tier } from "@/types/database";
import { tierLabel } from "@/lib/utils/tier";

const tierOrder: Tier[] = ["dawn", "light", "beacon", "pharos"];

const tierColors: Record<Tier, string> = {
  dawn: "text-[#E07A5F]",
  light: "text-[#1A3550]",
  beacon: "text-[#6B9080]",
  pharos: "text-[#C9A227]",
};

function StatCard({
  label,
  value,
  sub,
}: {
  label: string;
  value: string | number;
  sub?: string;
}) {
  return (
    <div className="rounded-2xl border border-phoro-divider bg-white p-6">
      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-phoro-text/50">
        {label}
      </p>
      <p className="mt-2 text-3xl font-bold text-phoro-primary">{value}</p>
      {sub && <p className="mt-1 text-sm text-phoro-text/50">{sub}</p>}
    </div>
  );
}

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [profilesResult, chatsCountResult, chatsTodayResult, chatsResult, assistantsResult] =
    await Promise.all([
      supabase.from("profiles").select("tier"),
      supabase.from("chats").select("*", { count: "exact", head: true }),
      supabase
        .from("chats")
        .select("*", { count: "exact", head: true })
        .gte("created_at", today.toISOString()),
      supabase.from("chats").select("assistant_id"),
      supabase.from("assistants").select("id, name"),
    ]);

  const profiles = profilesResult.data ?? [];
  const tierCounts: Record<Tier, number> = { dawn: 0, light: 0, beacon: 0, pharos: 0 };
  for (const p of profiles) {
    const t = p.tier as Tier;
    if (t in tierCounts) tierCounts[t]++;
  }

  const totalChats = chatsCountResult.count ?? 0;
  const todayChats = chatsTodayResult.count ?? 0;

  const chats = chatsResult.data ?? [];
  const assistants = assistantsResult.data ?? [];
  const assistantMap = new Map(assistants.map((a) => [a.id, a.name]));

  const assistantCounts = new Map<string, number>();
  for (const c of chats) {
    assistantCounts.set(c.assistant_id, (assistantCounts.get(c.assistant_id) ?? 0) + 1);
  }

  const topAssistants = [...assistantCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([id, count]) => ({
      name: assistantMap.get(id) ?? "Unbekannt",
      count,
    }));

  return (
    <div>
      <h1 className="text-2xl font-bold text-phoro-primary">Dashboard</h1>
      <p className="mt-1 text-sm text-phoro-text/60">
        Überblick über die PHORO-Plattform
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Benutzer gesamt" value={profiles.length} />
        <StatCard label="Chats gesamt" value={totalChats} />
        <StatCard label="Chats heute" value={todayChats} />
        <StatCard label="Assistenten" value={assistants.length} />
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-semibold text-phoro-primary">Benutzer nach Tier</h2>
        <div className="mt-3 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {tierOrder.map((tier) => (
            <div key={tier} className="rounded-xl border border-phoro-divider bg-white p-4">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-phoro-text/50">
                {tierLabel(tier)}
              </p>
              <p className={`mt-1 text-2xl font-bold ${tierColors[tier]}`}>{tierCounts[tier]}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-semibold text-phoro-primary">Beliebteste Assistenten</h2>
        {topAssistants.length === 0 ? (
          <p className="mt-3 text-sm text-phoro-text/50">Noch keine Chats vorhanden.</p>
        ) : (
          <div className="mt-3 space-y-2">
            {topAssistants.map((a, i) => (
              <div key={i} className="flex items-center justify-between rounded-xl border border-phoro-divider bg-white px-4 py-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-phoro-primary/10 text-xs font-bold text-phoro-primary">{i + 1}</span>
                  <span className="text-sm font-medium text-phoro-text">{a.name}</span>
                </div>
                <span className="text-sm font-semibold text-phoro-primary">
                  {a.count} {a.count === 1 ? "Chat" : "Chats"}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
