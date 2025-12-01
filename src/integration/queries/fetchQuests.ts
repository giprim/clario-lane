import type { Quest, UserQuest } from "@/types";
import { queryOptions } from "@tanstack/react-query";
import { supabaseService } from "~supabase/clientServices";

export const fetchQuestsKey = "quests";
export const fetchUserQuestsKey = "user_quests";

export const fetchQuests = queryOptions({
  queryKey: [fetchQuestsKey],
  queryFn: async () => {
    const { data, error } = await supabaseService.sp
      .from("quests")
      .select("*")
      .gt("expires_at", new Date().toISOString()); // Only fetch active quests
    if (error) throw error;
    return data as Quest[];
  },
});

export const fetchUserQuests = (userId: string | undefined) =>
  queryOptions({
    queryKey: [fetchUserQuestsKey, userId],
    queryFn: async () => {
      if (!userId) return [];
      const { data, error } = await supabaseService.sp
        .from("user_quests")
        .select("*")
        .eq("user_id", userId);
      if (error) throw error;
      return data as UserQuest[];
    },
    enabled: !!userId,
  });
