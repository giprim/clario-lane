create table if not exists passages (
    id uuid primary key default gen_random_uuid(),
    content_type_id uuid null references content_types(id) on delete set null,
    passage text not null,
    title text not null,
    difficulty integer default 1, -- e.g., 1 (easy), 2 (medium), 3 (hard)
    questions text default '{}', -- JSON array of questions
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);