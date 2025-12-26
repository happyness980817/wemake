BEGIN;

-- Fixed profile id (DO NOT seed profiles table)
-- Ensure this profile already exists in public.profiles before running this seed:
-- 38530e8e-de22-4d24-ba66-024568648419

-- =========================
-- categories (5)
-- =========================
INSERT INTO public.categories
  (category_id, name, description, created_at, updated_at)
OVERRIDING SYSTEM VALUE
VALUES
  (20001, 'Productivity', 'Tools to help you get more done.', now() - interval '10 days', now() - interval '1 day'),
  (20002, 'Developer Tools', 'Utilities for building and shipping software.', now() - interval '9 days',  now() - interval '1 day'),
  (20003, 'Design', 'Design resources, UI kits, and inspiration.', now() - interval '8 days',  now() - interval '1 day'),
  (20004, 'AI', 'AI-powered products and assistants.', now() - interval '7 days',  now() - interval '1 day'),
  (20005, 'Community', 'Community platforms and collaboration tools.', now() - interval '6 days', now() - interval '1 day');

-- =========================
-- topics (5)
-- =========================
INSERT INTO public.topics
  (topic_id, name, slug, created_at)
OVERRIDING SYSTEM VALUE
VALUES
  (30001, 'React', 'react', now() - interval '12 days'),
  (30002, 'Supabase', 'supabase', now() - interval '11 days'),
  (30003, 'TypeScript', 'typescript', now() - interval '10 days'),
  (30004, 'Design Systems', 'design-systems', now() - interval '9 days'),
  (30005, 'Startups', 'startups', now() - interval '8 days');

-- =========================
-- jobs (5)
-- =========================
INSERT INTO public.jobs
  (job_id, position, overview, responsibilities, qualifications, benefits, skills,
   company_name, company_logo_url, company_location, apply_url,
   job_type, job_location, salary_range, created_at, updated_at)
OVERRIDING SYSTEM VALUE
VALUES
  (50001, 'Frontend Engineer', 'Build user-facing features.', 'Ship UI, iterate quickly, and improve UX.', 'Strong React and TypeScript skills.', 'Remote-friendly team, learning budget.', 'React, TypeScript, CSS',
   'WeMake', 'https://example.com/logo1.png', 'Seoul, KR', 'https://example.com/apply/fe',
   'full-time', 'hybrid', '$50,000 - $100,000', now() - interval '5 days', now() - interval '1 day'),
  (50002, 'Backend Engineer', 'Own APIs and data.', 'Design schemas, optimize queries, and maintain reliability.', 'Postgres + Node.js experience.', 'Health benefits and growth.', 'Node.js, Postgres',
   'WeMake', 'https://example.com/logo2.png', 'Seoul, KR', 'https://example.com/apply/be',
   'full-time', 'on-site', '$100,000 - $200,000', now() - interval '4 days', now() - interval '1 day'),
  (50003, 'Product Designer', 'Craft delightful UX.', 'Prototype, test, and refine flows.', 'A strong portfolio and clear thinking.', 'Flexible hours.', 'Figma, UX research',
   'WeMake', 'https://example.com/logo3.png', 'Remote', 'https://example.com/apply/pd',
   'contract', 'remote', '$50,000 - $100,000', now() - interval '3 days', now() - interval '1 day'),
  (50004, 'Sales', 'Drive revenue.', 'Outbound, partnerships, and pipeline management.', 'B2B sales experience.', 'Commission and incentives.', 'CRM, negotiation',
   'WeMake', 'https://example.com/logo4.png', 'Singapore', 'https://example.com/apply/sales',
   'full-time', 'hybrid', '$100,000 - $200,000', now() - interval '2 days', now() - interval '1 day'),
  (50005, 'Intern', 'Learn by doing.', 'Support team initiatives and ship small improvements.', 'Eager to learn and communicate well.', 'Mentorship.', 'Communication, curiosity',
   'WeMake', 'https://example.com/logo5.png', 'Seoul, KR', 'https://example.com/apply/intern',
   'internship', 'on-site', '$0 - $50,000', now() - interval '1 day', now());

-- =========================
-- team (5)
-- =========================
INSERT INTO public.team
  (team_id, team_size, product_name, product_stage, product_description, equity, roles, created_at, updated_at)
OVERRIDING SYSTEM VALUE
VALUES
  (90001, 3, 'BuildBuddy', 'idea', 'A lightweight co-founder matching board.', 10, 'Frontend, Backend, Design', now() - interval '20 days', now() - interval '2 days'),
  (90002, 5, 'ShipFast', 'prototype', 'A template to launch quickly.', 15, 'Fullstack, Marketing', now() - interval '18 days', now() - interval '2 days'),
  (90003, 8, 'FeedbackLoop', 'mvp', 'Collect product feedback in minutes.', 20, 'Backend, Product, Customer Success', now() - interval '16 days', now() - interval '2 days'),
  (90004, 12, 'TeamSync', 'product', 'Async updates and team alignment.', 5, 'PM, Design, Fullstack', now() - interval '14 days', now() - interval '2 days'),
  (90005, 20, 'EnterpriseReady', 'enterprise', 'A compliance-first collaboration suite.', 2, 'Security, Platform, Sales', now() - interval '12 days', now() - interval '2 days');

-- =========================
-- message_rooms (5)
-- =========================
INSERT INTO public.message_rooms
  (message_room_id, created_at)
OVERRIDING SYSTEM VALUE
VALUES
  (100001, now() - interval '6 days'),
  (100002, now() - interval '5 days'),
  (100003, now() - interval '4 days'),
  (100004, now() - interval '3 days'),
  (100005, now() - interval '2 days');

-- =========================
-- products (5) (profile_id fixed)
-- =========================
INSERT INTO public.products
  (product_id, name, tagline, description, how_it_works, icon, url, stats, profile_id, category_id, created_at, updated_at)
OVERRIDING SYSTEM VALUE
VALUES
  (40001, 'PromptPad', 'Write better prompts faster.', 'A prompt library with versioning.', 'Save, tag, and reuse prompts.', 'memo', 'https://example.com/promptpad',
   '{"views":120,"reviews":2}'::jsonb, '38530e8e-de22-4d24-ba66-024568648419', 20004, now() - interval '15 days', now() - interval '1 day'),
  (40002, 'SprintNotes', 'Standups in 60 seconds.', 'Async standup summaries.', 'Collect updates and generate summaries.', 'pin', 'https://example.com/sprintnotes',
   '{"views":80,"reviews":1}'::jsonb, '38530e8e-de22-4d24-ba66-024568648419', 20005, now() - interval '14 days', now() - interval '1 day'),
  (40003, 'SchemaSketch', 'Design tables visually.', 'Schema diagrams and exports.', 'Draw an ERD, then export SQL.', 'puzzle', 'https://example.com/schemasketch',
   '{"views":200,"reviews":3}'::jsonb, '38530e8e-de22-4d24-ba66-024568648419', 20002, now() - interval '13 days', now() - interval '1 day'),
  (40004, 'PalettePilot', 'Pick colors confidently.', 'An accessible palette generator.', 'Generate palettes with contrast checks.', 'palette', 'https://example.com/palettepilot',
   '{"views":60,"reviews":0}'::jsonb, '38530e8e-de22-4d24-ba66-024568648419', 20003, now() - interval '12 days', now() - interval '1 day'),
  (40005, 'FocusFlow', 'Stay in the zone.', 'A minimal Pomodoro + tasks app.', 'Plan tasks, run timers, and review stats.', 'timer', 'https://example.com/focusflow',
   '{"views":150,"reviews":4}'::jsonb, '38530e8e-de22-4d24-ba66-024568648419', 20001, now() - interval '11 days', now() - interval '1 day');

-- =========================
-- posts (5) (profile_id fixed)
-- =========================
INSERT INTO public.posts
  (post_id, title, content, created_at, updated_at, topic_id, profile_id)
OVERRIDING SYSTEM VALUE
VALUES
  (70001, 'React Router data APIs', 'Sharing patterns for loaders/actions in v7.', now() - interval '7 days', now() - interval '2 days', 30001, '38530e8e-de22-4d24-ba66-024568648419'),
  (70002, 'Supabase auth + profiles', 'Trigger-based profile creation strategies.', now() - interval '6 days', now() - interval '2 days', 30002, '38530e8e-de22-4d24-ba66-024568648419'),
  (70003, 'TypeScript ergonomics', 'Small TypeScript patterns that reduce bugs.', now() - interval '5 days', now() - interval '2 days', 30003, '38530e8e-de22-4d24-ba66-024568648419'),
  (70004, 'Design systems: tokens', 'How to structure tokens for scale.', now() - interval '4 days', now() - interval '2 days', 30004, '38530e8e-de22-4d24-ba66-024568648419'),
  (70005, 'Shipping startup MVPs', 'Rules of thumb for scoping an MVP.', now() - interval '3 days', now() - interval '2 days', 30005, '38530e8e-de22-4d24-ba66-024568648419');

-- =========================
-- ideas (5) (claimed_by optional, using fixed profile for some)
-- =========================
INSERT INTO public.ideas
  (idea_id, idea, views, claimed_at, claimed_by, created_at)
OVERRIDING SYSTEM VALUE
VALUES
  (60001, 'A tiny CLI to safely clean up git branches', 12, NULL, NULL, now() - interval '30 days'),
  (60002, 'A weekly AI product teardown newsletter', 44, now() - interval '9 days', '38530e8e-de22-4d24-ba66-024568648419', now() - interval '28 days'),
  (60003, 'A browser extension to summarize long PRs', 31, NULL, NULL, now() - interval '26 days'),
  (60004, 'A template repo for React Router + Supabase + Drizzle', 80, now() - interval '7 days', '38530e8e-de22-4d24-ba66-024568648419', now() - interval '24 days'),
  (60005, 'A UI accessibility checklist before launch', 25, NULL, NULL, now() - interval '22 days');

-- =========================
-- post_replies (5) (includes parent chain)
-- =========================
INSERT INTO public.post_replies
  (post_reply_id, post_id, parent_id, profile_id, reply, created_at, updated_at)
OVERRIDING SYSTEM VALUE
VALUES
  (71001, 70001, NULL,  '38530e8e-de22-4d24-ba66-024568648419', 'Great write-up. The loader/action patterns were especially helpful.', now() - interval '2 days', now() - interval '2 days'),
  (71002, 70001, 71001, '38530e8e-de22-4d24-ba66-024568648419', 'If you have time, an example for error handling (status + data) would be awesome.', now() - interval '2 days' + interval '10 minutes', now() - interval '2 days' + interval '10 minutes'),
  (71003, 70002, NULL,  '38530e8e-de22-4d24-ba66-024568648419', 'The trigger-based profiles approach looks clean.', now() - interval '1 day', now() - interval '1 day'),
  (71004, 70003, NULL,  '38530e8e-de22-4d24-ba66-024568648419', 'Could you share more tips about narrowing types in TS?', now() - interval '20 hours', now() - interval '20 hours'),
  (71005, 70005, NULL,  '38530e8e-de22-4d24-ba66-024568648419', 'The MVP scoping advice felt very practical. Thanks!', now() - interval '12 hours', now() - interval '12 hours');

-- =========================
-- reviews (5) (rating check 1..5)
-- =========================
INSERT INTO public.reviews
  (review_id, product_id, profile_id, rating, review, created_at, updated_at)
OVERRIDING SYSTEM VALUE
VALUES
  (80001, 40001, '38530e8e-de22-4d24-ba66-024568648419', 5, 'Prompt management is so much easier now.', now() - interval '6 days', now() - interval '1 day'),
  (80002, 40002, '38530e8e-de22-4d24-ba66-024568648419', 4, 'Standups are simpler and it fits our team well.', now() - interval '5 days', now() - interval '1 day'),
  (80003, 40003, '38530e8e-de22-4d24-ba66-024568648419', 5, 'Great flow from ERD to SQL export.', now() - interval '4 days', now() - interval '1 day'),
  (80004, 40004, '38530e8e-de22-4d24-ba66-024568648419', 3, 'Nice idea, but palette suggestions can feel a bit conservative.', now() - interval '3 days', now() - interval '1 day'),
  (80005, 40005, '38530e8e-de22-4d24-ba66-024568648419', 4, 'A solid minimal focus tool. I like it.', now() - interval '2 days', now() - interval '1 day');

-- =========================
-- messages (5)
-- =========================
INSERT INTO public.messages
  (message_id, message_room_id, sender_id, content, created_at)
OVERRIDING SYSTEM VALUE
VALUES
  (101001, 100001, '38530e8e-de22-4d24-ba66-024568648419', 'Hi! May I ask a quick question about your product?', now() - interval '2 days'),
  (101002, 100002, '38530e8e-de22-4d24-ba66-024568648419', 'Nice idea. Could you share an update when you have one?', now() - interval '36 hours'),
  (101003, 100003, '38530e8e-de22-4d24-ba66-024568648419', 'Thanks for the design tokens reference. Super helpful.', now() - interval '30 hours'),
  (101004, 100004, '38530e8e-de22-4d24-ba66-024568648419', 'The MVP scoping tips helped a lot. Appreciate it!', now() - interval '24 hours'),
  (101005, 100005, '38530e8e-de22-4d24-ba66-024568648419', 'Left a review—please take a look when you can!', now() - interval '18 hours');

-- =========================
-- notifications (5)
-- =========================
INSERT INTO public.notifications
  (notification_id, source_id, product_id, post_id, target_id, type, message, created_at)
OVERRIDING SYSTEM VALUE
VALUES
  (102001, '38530e8e-de22-4d24-ba66-024568648419', 40001, NULL,  '38530e8e-de22-4d24-ba66-024568648419', 'review',  'A new review was posted.', now() - interval '6 days'),
  (102002, '38530e8e-de22-4d24-ba66-024568648419', NULL,  70001, '38530e8e-de22-4d24-ba66-024568648419', 'reply',   'You have a new reply.', now() - interval '2 days'),
  (102003, '38530e8e-de22-4d24-ba66-024568648419', 40003, NULL,  '38530e8e-de22-4d24-ba66-024568648419', 'mention', 'You were mentioned in a post.', now() - interval '30 hours'),
  (102004, '38530e8e-de22-4d24-ba66-024568648419', NULL,  70003, '38530e8e-de22-4d24-ba66-024568648419', 'reply',   'Someone replied to your post.', now() - interval '20 hours'),
  (102005, '38530e8e-de22-4d24-ba66-024568648419', NULL,  NULL,  '38530e8e-de22-4d24-ba66-024568648419', 'follow',  'You have a new follower.', now() - interval '10 hours');

-- =========================
-- composite PK tables (5 each)
-- =========================

-- product_likes: PK(product_id, profile_id)
INSERT INTO public.product_likes (product_id, profile_id)
VALUES
  (40001, '38530e8e-de22-4d24-ba66-024568648419'),
  (40002, '38530e8e-de22-4d24-ba66-024568648419'),
  (40003, '38530e8e-de22-4d24-ba66-024568648419'),
  (40004, '38530e8e-de22-4d24-ba66-024568648419'),
  (40005, '38530e8e-de22-4d24-ba66-024568648419')
ON CONFLICT DO NOTHING;

-- ideas_likes: PK(idea_id, profile_id)
INSERT INTO public.ideas_likes (idea_id, profile_id)
VALUES
  (60001, '38530e8e-de22-4d24-ba66-024568648419'),
  (60002, '38530e8e-de22-4d24-ba66-024568648419'),
  (60003, '38530e8e-de22-4d24-ba66-024568648419'),
  (60004, '38530e8e-de22-4d24-ba66-024568648419'),
  (60005, '38530e8e-de22-4d24-ba66-024568648419')
ON CONFLICT DO NOTHING;

-- post_upvotes: PK(post_id, profile_id)
INSERT INTO public.post_upvotes (post_id, profile_id)
VALUES
  (70001, '38530e8e-de22-4d24-ba66-024568648419'),
  (70002, '38530e8e-de22-4d24-ba66-024568648419'),
  (70003, '38530e8e-de22-4d24-ba66-024568648419'),
  (70004, '38530e8e-de22-4d24-ba66-024568648419'),
  (70005, '38530e8e-de22-4d24-ba66-024568648419')
ON CONFLICT DO NOTHING;

-- message_room_members: PK(message_room_id, profile_id)
INSERT INTO public.message_room_members (message_room_id, profile_id, created_at)
VALUES
  (100001, '38530e8e-de22-4d24-ba66-024568648419', now() - interval '6 days'),
  (100002, '38530e8e-de22-4d24-ba66-024568648419', now() - interval '5 days'),
  (100003, '38530e8e-de22-4d24-ba66-024568648419', now() - interval '4 days'),
  (100004, '38530e8e-de22-4d24-ba66-024568648419', now() - interval '3 days'),
  (100005, '38530e8e-de22-4d24-ba66-024568648419', now() - interval '2 days')
ON CONFLICT DO NOTHING;

-- =========================
-- follows (5)
-- =========================
INSERT INTO public.follows (follower_id, following_id, created_at)
VALUES
  ('38530e8e-de22-4d24-ba66-024568648419', '38530e8e-de22-4d24-ba66-024568648419', now() - interval '5 days'),
  ('38530e8e-de22-4d24-ba66-024568648419', '38530e8e-de22-4d24-ba66-024568648419', now() - interval '4 days'),
  ('38530e8e-de22-4d24-ba66-024568648419', '38530e8e-de22-4d24-ba66-024568648419', now() - interval '3 days'),
  ('38530e8e-de22-4d24-ba66-024568648419', '38530e8e-de22-4d24-ba66-024568648419', now() - interval '2 days'),
  ('38530e8e-de22-4d24-ba66-024568648419', '38530e8e-de22-4d24-ba66-024568648419', now() - interval '1 day');

-- =========================
-- Keep identity sequences in sync (important when overriding identity values)
-- =========================
SELECT setval('public.categories_category_id_seq',   (SELECT COALESCE(MAX(category_id), 1)   FROM public.categories));
SELECT setval('public.topics_topic_id_seq',          (SELECT COALESCE(MAX(topic_id), 1)      FROM public.topics));
SELECT setval('public.jobs_job_id_seq',              (SELECT COALESCE(MAX(job_id), 1)        FROM public.jobs));
SELECT setval('public.products_product_id_seq',      (SELECT COALESCE(MAX(product_id), 1)    FROM public.products));
SELECT setval('public.reviews_review_id_seq',        (SELECT COALESCE(MAX(review_id), 1)     FROM public.reviews));
SELECT setval('public.ideas_idea_id_seq',            (SELECT COALESCE(MAX(idea_id), 1)       FROM public.ideas));
SELECT setval('public.posts_post_id_seq',            (SELECT COALESCE(MAX(post_id), 1)       FROM public.posts));
SELECT setval('public.post_replies_post_reply_id_seq',(SELECT COALESCE(MAX(post_reply_id), 1) FROM public.post_replies));
SELECT setval('public.team_team_id_seq',             (SELECT COALESCE(MAX(team_id), 1)       FROM public.team));
SELECT setval('public.message_rooms_message_room_id_seq', (SELECT COALESCE(MAX(message_room_id), 1) FROM public.message_rooms));
SELECT setval('public.messages_message_id_seq',      (SELECT COALESCE(MAX(message_id), 1)    FROM public.messages));
SELECT setval('public.notifications_notification_id_seq', (SELECT COALESCE(MAX(notification_id), 1) FROM public.notifications));

COMMIT;

