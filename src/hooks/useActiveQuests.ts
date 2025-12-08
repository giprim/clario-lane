import { useMemo } from "react";
import type { Quest, UserQuest } from "@/types";

export function useActiveQuests(
  quests: Quest[],
  getProgress: (id: string) => UserQuest | undefined,
): Quest[] {
  return useMemo(() => {
    return quests.filter((quest) => {
      const progress = getProgress(quest.id);
      return !progress?.claimed_at;
    });
  }, [quests, getProgress]);
}
