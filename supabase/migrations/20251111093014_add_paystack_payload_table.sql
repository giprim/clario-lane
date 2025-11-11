revoke delete on table "public"."subscribers" from "anon";

revoke insert on table "public"."subscribers" from "anon";

revoke references on table "public"."subscribers" from "anon";

revoke select on table "public"."subscribers" from "anon";

revoke trigger on table "public"."subscribers" from "anon";

revoke truncate on table "public"."subscribers" from "anon";

revoke update on table "public"."subscribers" from "anon";

revoke delete on table "public"."subscribers" from "authenticated";

revoke insert on table "public"."subscribers" from "authenticated";

revoke references on table "public"."subscribers" from "authenticated";

revoke select on table "public"."subscribers" from "authenticated";

revoke trigger on table "public"."subscribers" from "authenticated";

revoke truncate on table "public"."subscribers" from "authenticated";

revoke update on table "public"."subscribers" from "authenticated";

revoke delete on table "public"."subscribers" from "service_role";

revoke insert on table "public"."subscribers" from "service_role";

revoke references on table "public"."subscribers" from "service_role";

revoke select on table "public"."subscribers" from "service_role";

revoke trigger on table "public"."subscribers" from "service_role";

revoke truncate on table "public"."subscribers" from "service_role";

revoke update on table "public"."subscribers" from "service_role";

alter table "public"."subscribers" drop constraint "subscribers_reference_id_key";

alter table "public"."subscribers" drop constraint "subscribers_user_id_fkey";

alter table "public"."subscribers" drop constraint "subscribers_pkey";

drop index if exists "public"."subscribers_pkey";

drop index if exists "public"."subscribers_reference_id_key";

drop table "public"."subscribers";


  create table "public"."paystack_payloads" (
    "id" uuid not null default gen_random_uuid(),
    "user_id" uuid,
    "payload" jsonb not null default '{}'::jsonb,
    "created_at" timestamp with time zone default now()
      );


CREATE UNIQUE INDEX paystack_payloads_pkey ON public.paystack_payloads USING btree (id);

alter table "public"."paystack_payloads" add constraint "paystack_payloads_pkey" PRIMARY KEY using index "paystack_payloads_pkey";

alter table "public"."paystack_payloads" add constraint "paystack_payloads_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE SET NULL not valid;

alter table "public"."paystack_payloads" validate constraint "paystack_payloads_user_id_fkey";

grant delete on table "public"."paystack_payloads" to "anon";

grant insert on table "public"."paystack_payloads" to "anon";

grant references on table "public"."paystack_payloads" to "anon";

grant select on table "public"."paystack_payloads" to "anon";

grant trigger on table "public"."paystack_payloads" to "anon";

grant truncate on table "public"."paystack_payloads" to "anon";

grant update on table "public"."paystack_payloads" to "anon";

grant delete on table "public"."paystack_payloads" to "authenticated";

grant insert on table "public"."paystack_payloads" to "authenticated";

grant references on table "public"."paystack_payloads" to "authenticated";

grant select on table "public"."paystack_payloads" to "authenticated";

grant trigger on table "public"."paystack_payloads" to "authenticated";

grant truncate on table "public"."paystack_payloads" to "authenticated";

grant update on table "public"."paystack_payloads" to "authenticated";

grant delete on table "public"."paystack_payloads" to "service_role";

grant insert on table "public"."paystack_payloads" to "service_role";

grant references on table "public"."paystack_payloads" to "service_role";

grant select on table "public"."paystack_payloads" to "service_role";

grant trigger on table "public"."paystack_payloads" to "service_role";

grant truncate on table "public"."paystack_payloads" to "service_role";

grant update on table "public"."paystack_payloads" to "service_role";


