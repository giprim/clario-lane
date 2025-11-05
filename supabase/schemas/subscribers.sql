create table if not exists subscribers (
    id uuid primary key default gen_random_uuid(),
    user_id uuid null references users(id) on delete set null,
    reference_id text unique not null,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);