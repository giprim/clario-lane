alter table "public"."users" alter column "baseline_comprehension" set data type numeric using "baseline_comprehension"::numeric;

alter table "public"."users" alter column "baseline_wpm" set data type numeric using "baseline_wpm"::numeric;

alter table "public"."users" alter column "current_comprehension_score" set data type numeric using "current_comprehension_score"::numeric;

alter table "public"."users" alter column "current_wpm" set data type numeric using "current_wpm"::numeric;

alter table "public"."users" alter column "focus_score" set data type numeric using "focus_score"::numeric;

alter table "public"."users" alter column "level" set data type numeric using "level"::numeric;

alter table "public"."users" alter column "streak_days" set data type numeric using "streak_days"::numeric;

alter table "public"."users" alter column "total_sessions" set data type numeric using "total_sessions"::numeric;

alter table "public"."users" alter column "total_time_spent" set data type numeric using "total_time_spent"::numeric;

alter table "public"."users" alter column "xp_earned" set data type numeric using "xp_earned"::numeric;


