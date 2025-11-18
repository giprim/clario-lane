alter table "public"."practice_sessions" drop column "timespent";

alter table "public"."practice_sessions" add column "correct_answers" integer;

alter table "public"."practice_sessions" add column "duration" integer;

alter table "public"."practice_sessions" add column "elapsed_time" integer;

alter table "public"."practice_sessions" add column "start_time" integer;

alter table "public"."practice_sessions" add column "total_questions" integer;

alter table "public"."practice_sessions" add column "total_words" integer;


