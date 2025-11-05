create table if not exists challenges (
    id uuid primary key default gen_random_uuid(),
    challenge text unique not null,
    description text,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);