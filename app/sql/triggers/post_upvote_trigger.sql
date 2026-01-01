CREATE FUNCTION public.handle_post_upvote() 
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY definer
SET search_path = ''
AS $$
BEGIN
  UPDATE public.posts SET upvotes = upvotes + 1 WHERE post_id = NEW.post_id;
  RETURN NEW; -- NEW 키워드로 새로 생성된 row 에 접근 
END;
$$;

CREATE TRIGGER post_upvote_trigger
AFTER INSERT ON public.post_upvotes
FOR EACH ROW
EXECUTE FUNCTION public.handle_post_upvote();

CREATE FUNCTION public.handle_post_unvote() 
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY definer
SET search_path = ''
AS $$
BEGIN
  UPDATE public.posts SET upvotes = upvotes - 1 WHERE post_id = OLD.post_id;
  RETURN OLD;
END;
$$;

CREATE TRIGGER post_unvote_trigger
AFTER DELETE ON public.post_upvotes
FOR EACH ROW
EXECUTE FUNCTION public.handle_post_unvote();