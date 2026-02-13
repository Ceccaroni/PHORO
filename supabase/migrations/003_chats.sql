-- Migration 003: Chats & Messages

CREATE TABLE public.chats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  assistant_id UUID NOT NULL REFERENCES public.assistants(id),
  title TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chat_id UUID NOT NULL REFERENCES public.chats(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content TEXT NOT NULL,
  token_count INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes
CREATE INDEX idx_chats_user ON public.chats(user_id);
CREATE INDEX idx_chats_updated ON public.chats(updated_at DESC);
CREATE INDEX idx_messages_chat ON public.chat_messages(chat_id);
CREATE INDEX idx_messages_created ON public.chat_messages(created_at);

-- RLS
ALTER TABLE public.chats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own chats"
  ON public.chats FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own chats"
  ON public.chats FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own chats"
  ON public.chats FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view messages of own chats"
  ON public.chat_messages FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.chats WHERE id = chat_id AND user_id = auth.uid())
  );
CREATE POLICY "Users can insert messages in own chats"
  ON public.chat_messages FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.chats WHERE id = chat_id AND user_id = auth.uid())
  );
