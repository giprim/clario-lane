create table if not exists users (
    id uuid primary key default gen_random_uuid(),
    email text unique not null,
    name text not null,
    baselineWPM integer default 0,
    baselineComprehension integer default 0,
    currentWPM integer default 0,
    currentComprehension integer default 0,
    totalSessions integer default 0,
    totalTimeSpent integer default 0, -- in seconds
    goals text default '{}',
    contentType text default 'mixed', -- e.g., 'fiction', 'non-fiction', 'mixed'
    challenges text default '{}', -- JSON array of challenge IDs
    currentComprehensionScore integer default 0,
    onboardingCompleted boolean default false,
    achievements text default '{}', -- JSON array of achievement IDs
    badges text default '{}', -- JSON array of badge IDs
    dailyReminder boolean default true,
    reminderTime time default '09:00:00',
    weeklySummary boolean default true,
    streakDays integer default 0,
    lastActiveDate timestamptz default now(),
    xpEarned integer default 0,
    level integer default 1,
    focusScore integer default 0,

    created_at timestamptz default now(),
    updated_at timestamptz default now()
);