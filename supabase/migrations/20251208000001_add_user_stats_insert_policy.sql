-- Migration: Add missing INSERT policy for user_stats
-- Created: 2025-12-08
-- Description: Allows users to insert their own stats row, which is required for upsert operations even if the row usually exists.

create policy "Users can insert their own stats"
  on public.user_stats for insert
  with check (auth.uid() = user_id);
