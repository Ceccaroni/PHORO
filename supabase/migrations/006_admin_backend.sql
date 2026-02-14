-- Migration 006: Admin Backend Support
-- Phase 5: Blog posts table, admin RLS policies, storage bucket

-- =========================================================
-- 1. Blog Posts table
-- =========================================================
CREATE TABLE public.blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL DEFAULT '',
  excerpt TEXT,
  is_published BOOLEAN NOT NULL DEFAULT false,
  published_at TIMESTAMPTZ,
  author_id UUID NOT NULL REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_blog_posts_slug ON public.blog_posts(slug);
CREATE INDEX idx_blog_posts_published ON public.blog_posts(is_published, published_at DESC);

ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Public can read published posts
CREATE POLICY "Anyone can view published blog posts"
  ON public.blog_posts FOR SELECT
  USING (is_published = true);

-- Admin can do everything with blog posts
CREATE POLICY "Admin can manage blog posts"
  ON public.blog_posts FOR ALL
  USING (public.is_admin());

-- =========================================================
-- 2. Admin RLS on chats (for dashboard stats)
-- =========================================================
CREATE POLICY "Admin can view all chats"
  ON public.chats FOR SELECT
  USING (public.is_admin());

CREATE POLICY "Admin can view all chat messages"
  ON public.chat_messages FOR SELECT
  USING (public.is_admin());

-- =========================================================
-- 3. Admin UPDATE policy on profiles (for tier changes)
-- =========================================================
CREATE POLICY "Admin can update all profiles"
  ON public.profiles FOR UPDATE
  USING (public.is_admin());

-- =========================================================
-- 4. Storage bucket for knowledge files
-- =========================================================
-- NOTE: Create the 'knowledge' bucket manually in Supabase Dashboard:
-- Storage > New Bucket > Name: "knowledge" > Private (not public)
--
-- Then run these storage policies in the SQL Editor:
--
-- CREATE POLICY "Admin can upload knowledge files"
--   ON storage.objects FOR INSERT
--   WITH CHECK (bucket_id = 'knowledge' AND public.is_admin());
--
-- CREATE POLICY "Admin can read knowledge files"
--   ON storage.objects FOR SELECT
--   USING (bucket_id = 'knowledge' AND public.is_admin());
--
-- CREATE POLICY "Admin can delete knowledge files"
--   ON storage.objects FOR DELETE
--   USING (bucket_id = 'knowledge' AND public.is_admin());
