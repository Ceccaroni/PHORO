-- Migration 005: Update handle_new_user trigger to include organization fields
-- The existing trigger (migration 001) only copies display_name.
-- This update also propagates organization_name and organization_role from signup metadata.

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, display_name, organization_name, organization_role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1)),
    NEW.raw_user_meta_data->>'organization_name',
    NEW.raw_user_meta_data->>'organization_role'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
