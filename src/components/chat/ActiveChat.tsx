"use client";

import { useRef, useEffect, useMemo } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import type { ChatMessage as ChatMessageType } from "@/types/database";

interface ActiveChatProps {
  chatId: string;
  assistantId: string;
  assistantName: string;
  initialMessages: ChatMessageType[];
}

export function ActiveChat({
  chatId,
  assistantId,
  assistantName,
  initialMessages,
}: ActiveChatProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: "/api/chat",
        body: { chatId, assistantId },
      }),
    [chatId, assistantId]
  );

  const { messages, sendMessage, status } = useChat({
    transport,
    messages: initialMessages.map((m) => ({
      id: m.id,
      role: m.role as "user" | "assistant",
      content: m.content,
      parts: [{ type: "text" as const, text: m.content }],
    })),
  });

  const isLoading = status === "streaming" || status === "submitted";

  // Scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  function handleSend(message: string) {
    sendMessage({ text: message });
  }

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      {/* Assistant name header */}
      <div className="shrink-0 border-b border-phoro-divider px-6 py-3">
        <p className="text-sm font-medium text-phoro-primary">
          {assistantName}
        </p>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 py-4">
        <div className="mx-auto max-w-3xl space-y-4">
          {messages.map((m) => (
            <ChatMessage
              key={m.id}
              role={m.role}
              content={
                m.parts
                  ?.filter(
                    (p): p is { type: "text"; text: string } =>
                      p.type === "text"
                  )
                  .map((p) => p.text)
                  .join("") ?? m.content
              }
            />
          ))}
        </div>
      </div>

      {/* Input */}
      <ChatInput onSend={handleSend} disabled={isLoading} />
    </div>
  );
}
