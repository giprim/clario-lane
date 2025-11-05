create table if not exists goals (
    id uuid primary key default gen_random_uuid(),
    goal text unique not null,
    description text,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);