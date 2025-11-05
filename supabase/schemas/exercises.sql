create table if not exists exercises (
    id uuid primary key default gen_random_uuid(),
    exercise text unique not null,
    description text,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);