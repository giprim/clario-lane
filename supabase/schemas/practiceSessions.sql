create table if not exists practice_sessions (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references users(id) on delete cascade,
    passage_id uuid null references passages(id) on delete set null,
    exercise_id uuid null references exercises(id) on delete set null,
    wpm numeric not null,
    comprehension numeric not null,
    duration numeric,
    total_words numeric,
    correct_answers numeric,
    total_questions numeric,
    start_time numeric,
    elapsed_time numeric,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);