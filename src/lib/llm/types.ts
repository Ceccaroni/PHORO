import type { Provider } from "@/types/database";

export interface LLMConfig {
  provider: Provider;
  model: string;
  systemPrompt: string;
  temperature: number;
  maxTokens: number;
}

export interface ChatMessageInput {
  role: "user" | "assistant" | "system";
  content: string;
}
