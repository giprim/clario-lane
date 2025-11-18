alter table "public"."practice_sessions" alter column "comprehension" set data type numeric using "comprehension"::numeric;

alter table "public"."practice_sessions" alter column "correct_answers" set data type numeric using "correct_answers"::numeric;

alter table "public"."practice_sessions" alter column "duration" set data type numeric using "duration"::numeric;

alter table "public"."practice_sessions" alter column "elapsed_time" set data type numeric using "elapsed_time"::numeric;

alter table "public"."practice_sessions" alter column "start_time" set data type numeric using "start_time"::numeric;

alter table "public"."practice_sessions" alter column "total_questions" set data type numeric using "total_questions"::numeric;

alter table "public"."practice_sessions" alter column "total_words" set data type numeric using "total_words"::numeric;

alter table "public"."practice_sessions" alter column "wpm" set data type numeric using "wpm"::numeric;


