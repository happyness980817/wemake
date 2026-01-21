drop function if exists public.handle_new_user() cascade;

CREATE FUNCTION public.handle_new_user()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY definer
SET search_path = ''
AS $$
BEGIN
  -- Create an anonymous profile whenever a new user is created
  IF NEW.raw_app_meta_data IS NOT NULL THEN
    IF NEW.raw_app_meta_data ? 'provider' AND NEW.raw_app_meta_data->>'provider' = 'email' THEN
      IF NEW.raw_user_meta_data ? 'name' and NEW.raw_user_meta_data ? 'username' THEN
        INSERT INTO public.profiles (profile_id, name, username, role)
        VALUES (NEW.id, NEW.raw_user_meta_data->>'name', NEW.raw_user_meta_data->>'username', 'developer');
      ELSE
        INSERT INTO public.profiles (profile_id, name, username, role)
        VALUES (NEW.id, 'Anonymous', 'user' || substr(md5(random()::text), 1, 8), 'developer');
      END IF;
    END IF;
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER user_to_profile_trigger
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.handle_new_user(); 