import type { Achievement, UserAchievement } from "@/types";
import { queryOptions } from "@tanstack/react-query";
import { supabaseService } from "~supabase/clientServices";

export const fetchAchievementsKey = "achievements";
export const fetchUserAchievementsKey = "user_achievements";

export const fetchAchievements = queryOptions({
  queryKey: [fetchAchievementsKey],
  queryFn: async () => {
    const { data, error } = await supabaseService.sp
      .from("achievements")
      .select("*");
    if (error) throw error;
    return data as Achievement[];
  },
  staleTime: 1000 * 60 * 60, // 1 hour
});

export const fetchUserAchievements = (userId: string | undefined) =>
  queryOptions({
    queryKey: [fetchUserAchievementsKey, userId],
    queryFn: async () => {
      if (!userId) return [];
      const { data, error } = await supabaseService.sp
        .from("user_achievements")
        .select("*")
        .eq("user_id", userId);
      if (error) throw error;
      return data as UserAchievement[];
    },
    enabled: !!userId,
  });
