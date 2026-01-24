CREATE OR REPLACE VIEW ideas_view AS
SELECT
  ideas.idea_id,
  CASE WHEN ideas.claimed_at IS NULL THEN ideas.idea ELSE 
  'THIS IDEA IS ALREADY CLAIMED. THIS IDEA IS ALREADY CLAIMED. THIS IDEA IS ALREADY CLAIMED. THIS IDEA IS ALREADY CLAIMED. THIS IDEA IS ALREADY CLAIMED.' END AS idea,
  ideas.views,
  CASE WHEN ideas.claimed_at IS NULL THEN FALSE ELSE TRUE END AS claimed,
  COUNT(ideas_likes.idea_id) AS likes,
  ideas.created_at,
  ideas.claimed_by
FROM public.ideas
LEFT JOIN public.ideas_likes USING (idea_id)
GROUP BY ideas.idea_id;
