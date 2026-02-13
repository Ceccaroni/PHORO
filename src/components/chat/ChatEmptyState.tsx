"use client";

import { ChatInput } from "./ChatInput";
import { useRouter } from "next/navigation";

interface ChatEmptyStateProps {
  displayName: string;
}

export function ChatEmptyState({ displayName }: ChatEmptyStateProps) {
  const router = useRouter();

  function handleSend(message: string) {
    // Phase 3 will handle creating a chat and sending the message
    // For now, this is a visual placeholder
    console.log("Message:", message);
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-1 flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-phoro-primary">
          Hallo {displayName}.
        </h1>
        <p className="mt-2 text-phoro-text/40">Was steht heute im Fokus?</p>
      </div>
      <ChatInput onSend={handleSend} />
    </div>
  );
}
