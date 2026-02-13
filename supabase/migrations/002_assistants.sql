-- Migration 002: Assistants

CREATE TABLE public.assistants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  long_description TEXT,
  category TEXT NOT NULL CHECK (category IN ('unterricht', 'leadership', 'admin')),
  min_tier TEXT NOT NULL DEFAULT 'dawn' CHECK (min_tier IN ('dawn', 'light', 'beacon', 'pharos')),

  -- LLM configuration
  provider TEXT NOT NULL DEFAULT 'openai' CHECK (provider IN ('openai', 'anthropic')),
  model TEXT NOT NULL DEFAULT 'gpt-4o',
  system_prompt TEXT NOT NULL,
  temperature NUMERIC(3,2) NOT NULL DEFAULT 0.7,
  max_tokens INTEGER NOT NULL DEFAULT 4096,

  -- Knowledge Base
  knowledge_files TEXT[],
  knowledge_description TEXT,

  -- Status & Meta
  is_active BOOLEAN NOT NULL DEFAULT false,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  sort_order INTEGER NOT NULL DEFAULT 0,
  icon_name TEXT,

  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes
CREATE INDEX idx_assistants_category ON public.assistants(category);
CREATE INDEX idx_assistants_active ON public.assistants(is_active);

-- RLS
ALTER TABLE public.assistants ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active assistants"
  ON public.assistants FOR SELECT USING (is_active = true);
CREATE POLICY "Admin can do everything with assistants"
  ON public.assistants FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true)
  );
