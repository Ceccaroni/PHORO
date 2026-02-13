import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import { anthropic } from "@ai-sdk/anthropic";
import type { LLMConfig, ChatMessageInput } from "./types";

function getModel(config: LLMConfig) {
  switch (config.provider) {
    case "openai":
      return openai(config.model);
    case "anthropic":
      return anthropic(config.model);
    default:
      throw new Error(`Unknown provider: ${config.provider}`);
  }
}

export function streamLLMResponse(
  config: LLMConfig,
  messages: ChatMessageInput[]
) {
  return streamText({
    model: getModel(config),
    system: config.systemPrompt,
    messages,
    temperature: config.temperature,
    maxTokens: config.maxTokens,
  });
}

export async function generateChatTitle(
  firstUserMessage: string,
  firstAssistantMessage: string
) {
  const result = await streamText({
    model: openai("gpt-4o-mini"),
    messages: [
      {
        role: "user",
        content: `Fasse diese Konversation in 4–6 Wörtern auf Deutsch zusammen. Antworte NUR mit dem Titel, ohne Anführungszeichen.\n\nUser: ${firstUserMessage}\nAssistant: ${firstAssistantMessage}`,
      },
    ],
    temperature: 0.3,
    maxTokens: 30,
  });

  let title = "";
  for await (const chunk of result.textStream) {
    title += chunk;
  }
  return title.trim();
}
