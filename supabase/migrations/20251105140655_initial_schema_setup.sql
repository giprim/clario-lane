
  create table "public"."challenges" (
    "id" uuid not null default gen_random_uuid(),
    "challenge" text not null,
    "description" text,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
      );



  create table "public"."content_types" (
    "id" uuid not null default gen_random_uuid(),
    "content" text not null,
    "description" text,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
      );



  create table "public"."exercises" (
    "id" uuid not null default gen_random_uuid(),
    "exercise" text not null,
    "description" text,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
      );



  create table "public"."goals" (
    "id" uuid not null default gen_random_uuid(),
    "goal" text not null,
    "description" text,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
      );



  create table "public"."passages" (
    "id" uuid not null default gen_random_uuid(),
    "content_type_id" uuid,
    "passage" text not null,
    "title" text not null,
    "difficulty" integer default 1,
    "questions" text default '{}'::text,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
      );



  create table "public"."practice_sessions" (
    "id" uuid not null default gen_random_uuid(),
    "user_id" uuid,
    "passage_id" uuid,
    "exercise_id" uuid,
    "wpm" integer not null,
    "comprehensionscore" integer not null,
    "timespent" integer not null,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
      );



  create table "public"."subscribers" (
    "id" uuid not null default gen_random_uuid(),
    "user_id" uuid,
    "reference_id" text not null,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
      );



  create table "public"."users" (
    "id" uuid not null default gen_random_uuid(),
    "email" text not null,
    "name" text not null,
    "baselinewpm" integer default 0,
    "baselinecomprehension" integer default 0,
    "currentwpm" integer default 0,
    "currentcomprehension" integer default 0,
    "totalsessions" integer default 0,
    "totaltimespent" integer default 0,
    "goals" text default '{}'::text,
    "contenttype" text default 'mixed'::text,
    "challenges" text default '{}'::text,
    "currentcomprehensionscore" integer default 0,
    "onboardingcompleted" boolean default false,
    "achievements" text default '{}'::text,
    "badges" text default '{}'::text,
    "dailyreminder" boolean default true,
    "remindertime" time without time zone default '09:00:00'::time without time zone,
    "weeklysummary" boolean default true,
    "streakdays" integer default 0,
    "lastactivedate" timestamp with time zone default now(),
    "xpearned" integer default 0,
    "level" integer default 1,
    "focusscore" integer default 0,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
      );


CREATE UNIQUE INDEX challenges_challenge_key ON public.challenges USING btree (challenge);

CREATE UNIQUE INDEX challenges_pkey ON public.challenges USING btree (id);

CREATE UNIQUE INDEX content_types_content_key ON public.content_types USING btree (content);

CREATE UNIQUE INDEX content_types_pkey ON public.content_types USING btree (id);

CREATE UNIQUE INDEX exercises_exercise_key ON public.exercises USING btree (exercise);

CREATE UNIQUE INDEX exercises_pkey ON public.exercises USING btree (id);

CREATE UNIQUE INDEX goals_goal_key ON public.goals USING btree (goal);

CREATE UNIQUE INDEX goals_pkey ON public.goals USING btree (id);

CREATE UNIQUE INDEX passages_pkey ON public.passages USING btree (id);

CREATE UNIQUE INDEX practice_sessions_pkey ON public.practice_sessions USING btree (id);

CREATE UNIQUE INDEX subscribers_pkey ON public.subscribers USING btree (id);

CREATE UNIQUE INDEX subscribers_reference_id_key ON public.subscribers USING btree (reference_id);

CREATE UNIQUE INDEX users_email_key ON public.users USING btree (email);

CREATE UNIQUE INDEX users_pkey ON public.users USING btree (id);

alter table "public"."challenges" add constraint "challenges_pkey" PRIMARY KEY using index "challenges_pkey";

alter table "public"."content_types" add constraint "content_types_pkey" PRIMARY KEY using index "content_types_pkey";

alter table "public"."exercises" add constraint "exercises_pkey" PRIMARY KEY using index "exercises_pkey";

alter table "public"."goals" add constraint "goals_pkey" PRIMARY KEY using index "goals_pkey";

alter table "public"."passages" add constraint "passages_pkey" PRIMARY KEY using index "passages_pkey";

alter table "public"."practice_sessions" add constraint "practice_sessions_pkey" PRIMARY KEY using index "practice_sessions_pkey";

alter table "public"."subscribers" add constraint "subscribers_pkey" PRIMARY KEY using index "subscribers_pkey";

alter table "public"."users" add constraint "users_pkey" PRIMARY KEY using index "users_pkey";

alter table "public"."challenges" add constraint "challenges_challenge_key" UNIQUE using index "challenges_challenge_key";

alter table "public"."content_types" add constraint "content_types_content_key" UNIQUE using index "content_types_content_key";

alter table "public"."exercises" add constraint "exercises_exercise_key" UNIQUE using index "exercises_exercise_key";

alter table "public"."goals" add constraint "goals_goal_key" UNIQUE using index "goals_goal_key";

alter table "public"."passages" add constraint "passages_content_type_id_fkey" FOREIGN KEY (content_type_id) REFERENCES public.content_types(id) ON DELETE SET NULL not valid;

alter table "public"."passages" validate constraint "passages_content_type_id_fkey";

alter table "public"."practice_sessions" add constraint "practice_sessions_exercise_id_fkey" FOREIGN KEY (exercise_id) REFERENCES public.exercises(id) ON DELETE SET NULL not valid;

alter table "public"."practice_sessions" validate constraint "practice_sessions_exercise_id_fkey";

alter table "public"."practice_sessions" add constraint "practice_sessions_passage_id_fkey" FOREIGN KEY (passage_id) REFERENCES public.passages(id) ON DELETE SET NULL not valid;

alter table "public"."practice_sessions" validate constraint "practice_sessions_passage_id_fkey";

alter table "public"."practice_sessions" add constraint "practice_sessions_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE not valid;

alter table "public"."practice_sessions" validate constraint "practice_sessions_user_id_fkey";

alter table "public"."subscribers" add constraint "subscribers_reference_id_key" UNIQUE using index "subscribers_reference_id_key";

alter table "public"."subscribers" add constraint "subscribers_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE SET NULL not valid;

alter table "public"."subscribers" validate constraint "subscribers_user_id_fkey";

alter table "public"."users" add constraint "users_email_key" UNIQUE using index "users_email_key";

grant delete on table "public"."challenges" to "anon";

grant insert on table "public"."challenges" to "anon";

grant references on table "public"."challenges" to "anon";

grant select on table "public"."challenges" to "anon";

grant trigger on table "public"."challenges" to "anon";

grant truncate on table "public"."challenges" to "anon";

grant update on table "public"."challenges" to "anon";

grant delete on table "public"."challenges" to "authenticated";

grant insert on table "public"."challenges" to "authenticated";

grant references on table "public"."challenges" to "authenticated";

grant select on table "public"."challenges" to "authenticated";

grant trigger on table "public"."challenges" to "authenticated";

grant truncate on table "public"."challenges" to "authenticated";

grant update on table "public"."challenges" to "authenticated";

grant delete on table "public"."challenges" to "service_role";

grant insert on table "public"."challenges" to "service_role";

grant references on table "public"."challenges" to "service_role";

grant select on table "public"."challenges" to "service_role";

grant trigger on table "public"."challenges" to "service_role";

grant truncate on table "public"."challenges" to "service_role";

grant update on table "public"."challenges" to "service_role";

grant delete on table "public"."content_types" to "anon";

grant insert on table "public"."content_types" to "anon";

grant references on table "public"."content_types" to "anon";

grant select on table "public"."content_types" to "anon";

grant trigger on table "public"."content_types" to "anon";

grant truncate on table "public"."content_types" to "anon";

grant update on table "public"."content_types" to "anon";

grant delete on table "public"."content_types" to "authenticated";

grant insert on table "public"."content_types" to "authenticated";

grant references on table "public"."content_types" to "authenticated";

grant select on table "public"."content_types" to "authenticated";

grant trigger on table "public"."content_types" to "authenticated";

grant truncate on table "public"."content_types" to "authenticated";

grant update on table "public"."content_types" to "authenticated";

grant delete on table "public"."content_types" to "service_role";

grant insert on table "public"."content_types" to "service_role";

grant references on table "public"."content_types" to "service_role";

grant select on table "public"."content_types" to "service_role";

grant trigger on table "public"."content_types" to "service_role";

grant truncate on table "public"."content_types" to "service_role";

grant update on table "public"."content_types" to "service_role";

grant delete on table "public"."exercises" to "anon";

grant insert on table "public"."exercises" to "anon";

grant references on table "public"."exercises" to "anon";

grant select on table "public"."exercises" to "anon";

grant trigger on table "public"."exercises" to "anon";

grant truncate on table "public"."exercises" to "anon";

grant update on table "public"."exercises" to "anon";

grant delete on table "public"."exercises" to "authenticated";

grant insert on table "public"."exercises" to "authenticated";

grant references on table "public"."exercises" to "authenticated";

grant select on table "public"."exercises" to "authenticated";

grant trigger on table "public"."exercises" to "authenticated";

grant truncate on table "public"."exercises" to "authenticated";

grant update on table "public"."exercises" to "authenticated";

grant delete on table "public"."exercises" to "service_role";

grant insert on table "public"."exercises" to "service_role";

grant references on table "public"."exercises" to "service_role";

grant select on table "public"."exercises" to "service_role";

grant trigger on table "public"."exercises" to "service_role";

grant truncate on table "public"."exercises" to "service_role";

grant update on table "public"."exercises" to "service_role";

grant delete on table "public"."goals" to "anon";

grant insert on table "public"."goals" to "anon";

grant references on table "public"."goals" to "anon";

grant select on table "public"."goals" to "anon";

grant trigger on table "public"."goals" to "anon";

grant truncate on table "public"."goals" to "anon";

grant update on table "public"."goals" to "anon";

grant delete on table "public"."goals" to "authenticated";

grant insert on table "public"."goals" to "authenticated";

grant references on table "public"."goals" to "authenticated";

grant select on table "public"."goals" to "authenticated";

grant trigger on table "public"."goals" to "authenticated";

grant truncate on table "public"."goals" to "authenticated";

grant update on table "public"."goals" to "authenticated";

grant delete on table "public"."goals" to "service_role";

grant insert on table "public"."goals" to "service_role";

grant references on table "public"."goals" to "service_role";

grant select on table "public"."goals" to "service_role";

grant trigger on table "public"."goals" to "service_role";

grant truncate on table "public"."goals" to "service_role";

grant update on table "public"."goals" to "service_role";

grant delete on table "public"."passages" to "anon";

grant insert on table "public"."passages" to "anon";

grant references on table "public"."passages" to "anon";

grant select on table "public"."passages" to "anon";

grant trigger on table "public"."passages" to "anon";

grant truncate on table "public"."passages" to "anon";

grant update on table "public"."passages" to "anon";

grant delete on table "public"."passages" to "authenticated";

grant insert on table "public"."passages" to "authenticated";

grant references on table "public"."passages" to "authenticated";

grant select on table "public"."passages" to "authenticated";

grant trigger on table "public"."passages" to "authenticated";

grant truncate on table "public"."passages" to "authenticated";

grant update on table "public"."passages" to "authenticated";

grant delete on table "public"."passages" to "service_role";

grant insert on table "public"."passages" to "service_role";

grant references on table "public"."passages" to "service_role";

grant select on table "public"."passages" to "service_role";

grant trigger on table "public"."passages" to "service_role";

grant truncate on table "public"."passages" to "service_role";

grant update on table "public"."passages" to "service_role";

grant delete on table "public"."practice_sessions" to "anon";

grant insert on table "public"."practice_sessions" to "anon";

grant references on table "public"."practice_sessions" to "anon";

grant select on table "public"."practice_sessions" to "anon";

grant trigger on table "public"."practice_sessions" to "anon";

grant truncate on table "public"."practice_sessions" to "anon";

grant update on table "public"."practice_sessions" to "anon";

grant delete on table "public"."practice_sessions" to "authenticated";

grant insert on table "public"."practice_sessions" to "authenticated";

grant references on table "public"."practice_sessions" to "authenticated";

grant select on table "public"."practice_sessions" to "authenticated";

grant trigger on table "public"."practice_sessions" to "authenticated";

grant truncate on table "public"."practice_sessions" to "authenticated";

grant update on table "public"."practice_sessions" to "authenticated";

grant delete on table "public"."practice_sessions" to "service_role";

grant insert on table "public"."practice_sessions" to "service_role";

grant references on table "public"."practice_sessions" to "service_role";

grant select on table "public"."practice_sessions" to "service_role";

grant trigger on table "public"."practice_sessions" to "service_role";

grant truncate on table "public"."practice_sessions" to "service_role";

grant update on table "public"."practice_sessions" to "service_role";

grant delete on table "public"."subscribers" to "anon";

grant insert on table "public"."subscribers" to "anon";

grant references on table "public"."subscribers" to "anon";

grant select on table "public"."subscribers" to "anon";

grant trigger on table "public"."subscribers" to "anon";

grant truncate on table "public"."subscribers" to "anon";

grant update on table "public"."subscribers" to "anon";

grant delete on table "public"."subscribers" to "authenticated";

grant insert on table "public"."subscribers" to "authenticated";

grant references on table "public"."subscribers" to "authenticated";

grant select on table "public"."subscribers" to "authenticated";

grant trigger on table "public"."subscribers" to "authenticated";

grant truncate on table "public"."subscribers" to "authenticated";

grant update on table "public"."subscribers" to "authenticated";

grant delete on table "public"."subscribers" to "service_role";

grant insert on table "public"."subscribers" to "service_role";

grant references on table "public"."subscribers" to "service_role";

grant select on table "public"."subscribers" to "service_role";

grant trigger on table "public"."subscribers" to "service_role";

grant truncate on table "public"."subscribers" to "service_role";

grant update on table "public"."subscribers" to "service_role";

grant delete on table "public"."users" to "anon";

grant insert on table "public"."users" to "anon";

grant references on table "public"."users" to "anon";

grant select on table "public"."users" to "anon";

grant trigger on table "public"."users" to "anon";

grant truncate on table "public"."users" to "anon";

grant update on table "public"."users" to "anon";

grant delete on table "public"."users" to "authenticated";

grant insert on table "public"."users" to "authenticated";

grant references on table "public"."users" to "authenticated";

grant select on table "public"."users" to "authenticated";

grant trigger on table "public"."users" to "authenticated";

grant truncate on table "public"."users" to "authenticated";

grant update on table "public"."users" to "authenticated";

grant delete on table "public"."users" to "service_role";

grant insert on table "public"."users" to "service_role";

grant references on table "public"."users" to "service_role";

grant select on table "public"."users" to "service_role";

grant trigger on table "public"."users" to "service_role";

grant truncate on table "public"."users" to "service_role";

grant update on table "public"."users" to "service_role";


