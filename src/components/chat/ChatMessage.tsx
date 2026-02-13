import type { MessageRole } from "@/types/database";

interface ChatMessageProps {
  role: MessageRole;
  content: string;
}

export function ChatMessage({ role, content }: ChatMessageProps) {
  if (role === "system") return null;

  const isUser = role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
          isUser
            ? "bg-phoro-primary text-white"
            : "bg-white text-phoro-text"
        }`}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap">{content}</p>
        ) : (
          <div
            className="prose prose-sm max-w-none prose-headings:text-phoro-primary prose-a:text-phoro-accent prose-strong:text-phoro-text prose-code:rounded prose-code:bg-phoro-bg prose-code:px-1 prose-code:py-0.5 prose-code:text-sm"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
          />
        )}
      </div>
    </div>
  );
}

function renderMarkdown(text: string): string {
  return (
    text
      // Code blocks
      .replace(
        /```(\w*)\n([\s\S]*?)```/g,
        '<pre class="rounded-lg bg-phoro-bg p-3 overflow-x-auto"><code>$2</code></pre>'
      )
      // Inline code
      .replace(/`([^`]+)`/g, "<code>$1</code>")
      // Bold
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      // Italic
      .replace(/\*(.+?)\*/g, "<em>$1</em>")
      // Headers
      .replace(/^### (.+)$/gm, '<h3 class="font-semibold mt-3 mb-1">$1</h3>')
      .replace(/^## (.+)$/gm, '<h2 class="font-semibold mt-4 mb-2 text-lg">$1</h2>')
      .replace(/^# (.+)$/gm, '<h1 class="font-bold mt-4 mb-2 text-xl">$1</h1>')
      // Unordered lists
      .replace(/^- (.+)$/gm, "<li>$1</li>")
      .replace(/(<li>.*<\/li>\n?)+/g, '<ul class="list-disc pl-4 my-2">$&</ul>')
      // Ordered lists
      .replace(/^\d+\. (.+)$/gm, "<li>$1</li>")
      // Line breaks
      .replace(/\n\n/g, "</p><p>")
      .replace(/\n/g, "<br>")
  );
}
