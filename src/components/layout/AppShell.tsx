"use client";

import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { RightPanel } from "./RightPanel";
import { Header } from "./Header";
import { useFavicon } from "@/hooks/useFavicon";
import { useStreamingStore } from "@/stores/streamingStore";
import type { Profile, Assistant, Chat } from "@/types/database";

interface AppShellProps {
  profile: Profile;
  chats: (Chat & { assistant_name?: string })[];
  featuredAssistants: Assistant[];
  children: React.ReactNode;
}

export function AppShell({
  profile,
  chats,
  featuredAssistants,
  children,
}: AppShellProps) {
  const [leftOpen, setLeftOpen] = useState(false);
  const [rightOpen, setRightOpen] = useState(false);
  const isStreaming = useStreamingStore((s) => s.isStreaming);
  useFavicon(profile.tier, isStreaming);

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-phoro-bg">
      {/* Mobile header */}
      <Header
        onToggleLeftSidebar={() => setLeftOpen((o) => !o)}
        onToggleRightSidebar={() => setRightOpen((o) => !o)}
      />

      <div className="flex flex-1 overflow-hidden">
        {/* Left sidebar */}
        <Sidebar
          chats={chats}
          tier={profile.tier}
          open={leftOpen}
          onClose={() => setLeftOpen(false)}
        />

        {/* Center content */}
        <main className="flex flex-1 flex-col overflow-hidden">
          {children}
        </main>

        {/* Right sidebar */}
        <RightPanel
          profile={profile}
          featuredAssistants={featuredAssistants}
          open={rightOpen}
          onClose={() => setRightOpen(false)}
        />
      </div>
    </div>
  );
}
