-- Seed Achievements
insert into public.achievements (id, title, description, icon_url, category, condition_type, condition_value, xp_reward) values
('early_bird', 'Early Bird', 'Complete a reading session before 8 AM', 'sunrise', 'habit', 'time_of_day', 800, 50),
('marathoner_1', 'Marathoner I', 'Read for 30 minutes in a single session', 'flame', 'endurance', 'session_time', 30, 200),
('speed_demon_1', 'Speed Demon I', 'Reach 400 WPM with >80% comprehension', 'zap', 'speed', 'wpm', 400, 150),
('scholar_1', 'Scholar I', 'Read 10,000 words total', 'book', 'volume', 'total_words', 10000, 300),
('streak_master_1', 'Streak Master I', 'Maintain a 7-day reading streak', 'calendar', 'streak', 'streak_days', 7, 500)
on conflict (id) do nothing;

-- Seed Quests (Examples)
-- Note: In a real app, these might be generated dynamically or rotated.
insert into public.quests (type, description, target_metric, target_value, xp_reward, expires_at) values
('daily', 'Read 500 words', 'words', 500, 50, now() + interval '1 day'),
('daily', 'Complete 1 Speed Reading Session', 'sessions', 1, 50, now() + interval '1 day'),
('weekly', 'Read for 60 minutes total', 'minutes', 60, 200, now() + interval '1 week')
on conflict do nothing;
