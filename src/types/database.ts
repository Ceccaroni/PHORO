export type Tier = "dawn" | "light" | "beacon" | "pharos";
export type Category = "unterricht" | "leadership" | "admin";
export type Provider = "openai" | "anthropic";
export type MessageRole = "user" | "assistant" | "system";

export interface Profile {
  id: string;
  email: string;
  display_name: string | null;
  tier: Tier;
  organization_name: string | null;
  organization_role: string | null;
  is_admin: boolean;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface Assistant {
  id: string;
  name: string;
  slug: string;
  description: string;
  long_description: string | null;
  category: Category;
  min_tier: Tier;
  provider: Provider;
  model: string;
  system_prompt: string;
  temperature: number;
  max_tokens: number;
  knowledge_files: string[] | null;
  knowledge_description: string | null;
  is_active: boolean;
  is_featured: boolean;
  sort_order: number;
  icon_name: string | null;
  created_at: string;
  updated_at: string;
}

export interface Chat {
  id: string;
  user_id: string;
  assistant_id: string;
  title: string | null;
  created_at: string;
  updated_at: string;
}

export interface ChatMessage {
  id: string;
  chat_id: string;
  role: MessageRole;
  content: string;
  token_count: number | null;
  created_at: string;
}
