import { useMemo } from "react";
import type { Quest, UserQuest } from "@/types";

export type QuestProgressData = {
  currentValue: number;
  progressPercent: number;
  isCompleted: boolean;
  isClaimed: boolean;
};

export function useQuestProgress(
  quest: Quest,
  progress?: UserQuest,
): QuestProgressData {
  return useMemo(() => {
    const currentValue = progress?.current_value || 0;
    const progressPercent = Math.min(
      (currentValue / quest.target_value) * 100,
      100,
    );
    const isCompleted = progress?.is_completed || false;
    const isClaimed = !!progress?.claimed_at;

    return {
      currentValue,
      progressPercent,
      isCompleted,
      isClaimed,
    };
  }, [quest.target_value, progress]);
}
