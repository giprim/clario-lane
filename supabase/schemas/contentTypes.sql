create table if not exists content_types (
    id uuid primary key default gen_random_uuid(),
    content text unique not null,
    description text,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

