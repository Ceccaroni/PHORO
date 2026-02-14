export function StatusBadge({ active }: { active: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${
        active
          ? "bg-phoro-success/15 text-phoro-success"
          : "bg-phoro-text/10 text-phoro-text/50"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          active ? "bg-phoro-success" : "bg-phoro-text/40"
        }`}
      />
      {active ? "Aktiv" : "Inaktiv"}
    </span>
  );
}
