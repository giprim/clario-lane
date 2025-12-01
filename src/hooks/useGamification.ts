import { useQuery } from "@tanstack/react-query";
import { fetchUserStats } from "@/integration/queries/fetchUserStats";
import {
  fetchAchievements,
  fetchUserAchievements,
} from "@/integration/queries/fetchAchievements";
import {
  fetchQuests,
  fetchUserQuests,
} from "@/integration/queries/fetchQuests";
import { supabaseService } from "~supabase/clientServices";
import { useEffect, useState } from "react";

export function useGamification() {
  const [userId, setUserId] = useState<string | undefined>(undefined);

  useEffect(() => {
    supabaseService.getSession().then((session) => {
      setUserId(session?.user?.id);
    });
  }, []);

  const { data: stats, isLoading: isLoadingStats } = useQuery(
    fetchUserStats(userId),
  );

  const { data: allAchievements, isLoading: isLoadingAllAchievements } =
    useQuery(fetchAchievements);
  const { data: userAchievements, isLoading: isLoadingUserAchievements } =
    useQuery(fetchUserAchievements(userId));

  const { data: allQuests, isLoading: isLoadingAllQuests } = useQuery(
    fetchQuests,
  );
  const { data: userQuests, isLoading: isLoadingUserQuests } = useQuery(
    fetchUserQuests(userId),
  );

  // Helper to check if an achievement is unlocked
  const isAchievementUnlocked = (achievementId: string) => {
    return userAchievements?.some((ua) =>
      ua.achievement_id === achievementId
    ) ?? false;
  };

  // Helper to get quest progress
  const getQuestProgress = (questId: string) => {
    return userQuests?.find((uq) => uq.quest_id === questId);
  };

  return {
    stats,
    achievements: {
      all: allAchievements,
      unlocked: userAchievements,
      isUnlocked: isAchievementUnlocked,
    },
    quests: {
      all: allQuests,
      userProgress: userQuests,
      getProgress: getQuestProgress,
    },
    isLoading: isLoadingStats || isLoadingAllAchievements ||
      isLoadingUserAchievements || isLoadingAllQuests || isLoadingUserQuests,
  };
}
