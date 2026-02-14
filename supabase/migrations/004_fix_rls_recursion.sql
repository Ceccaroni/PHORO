-- Fix: infinite recursion in profiles RLS policy
-- The "Admin can view all profiles" policy queries profiles from within
-- a profiles policy, causing infinite recursion. Fix: use a SECURITY DEFINER
-- function that bypasses RLS for the admin check.

-- 1. Create helper function (bypasses RLS via SECURITY DEFINER)
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND is_admin = true
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- 2. Fix profiles policies
DROP POLICY IF EXISTS "Admin can view all profiles" ON public.profiles;

CREATE POLICY "Admin can view all profiles"
  ON public.profiles FOR SELECT USING (public.is_admin());

-- 3. Fix assistants admin policy
DROP POLICY IF EXISTS "Admin can do everything with assistants" ON public.assistants;

CREATE POLICY "Admin can do everything with assistants"
  ON public.assistants FOR ALL USING (public.is_admin());
