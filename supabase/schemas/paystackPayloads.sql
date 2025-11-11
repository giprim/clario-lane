create table if not exists paystack_payloads (
    id uuid primary key default gen_random_uuid(),
    user_id uuid null references users(id) on delete set null,
    payload jsonb not null default '{}'::jsonb,
    created_at timestamptz default now()
);

