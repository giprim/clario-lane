import type { UserStats } from "@/types";
import { queryOptions } from "@tanstack/react-query";
import { supabaseService } from "~supabase/clientServices";

export const fetchUserStatsKey = "user_stats";

export const fetchUserStats = (userId: string | undefined) =>
  queryOptions({
    queryKey: [fetchUserStatsKey, userId],
    queryFn: async () => {
      if (!userId) return null;
      const { data, error } = await supabaseService.sp
        .from("user_stats")
        .select("*")
        .eq("user_id", userId)
        .single();

      if (error) {
        // If no stats exist (shouldn't happen due to trigger, but safe fallback), return default
        if (error.code === "PGRST116") {
          return null;
        }
        throw error;
      }
      return data as UserStats;
    },
    enabled: !!userId,
  });
