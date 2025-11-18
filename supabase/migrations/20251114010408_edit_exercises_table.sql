alter table "public"."exercises" add column "difficulty" text;

alter table "public"."exercises" add column "title" text;

alter table "public"."exercises" add column "xp" integer default 10;

alter table "public"."users" drop column "subscriptions";


