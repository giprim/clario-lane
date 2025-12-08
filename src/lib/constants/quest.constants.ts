import { Calendar, Clock, Target } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type QuestTypeKey = "daily" | "weekly" | "special";

export type QuestTypeConfig = {
  icon: LucideIcon;
  bgColor: string;
  iconColor: string;
  badgeColor: string;
};

export const QUEST_TYPE_CONFIG: Record<QuestTypeKey, QuestTypeConfig> = {
  daily: {
    icon: Calendar,
    bgColor: "bg-blue-100 dark:bg-blue-950/50",
    iconColor: "text-blue-600 dark:text-blue-400",
    badgeColor:
      "bg-blue-100 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300",
  },
  weekly: {
    icon: Clock,
    bgColor: "bg-purple-100 dark:bg-purple-950/50",
    iconColor: "text-purple-600 dark:text-purple-400",
    badgeColor:
      "bg-purple-100 text-purple-700 dark:bg-purple-950/50 dark:text-purple-300",
  },
  special: {
    icon: Target,
    bgColor: "bg-amber-100 dark:bg-amber-950/50",
    iconColor: "text-amber-600 dark:text-amber-400",
    badgeColor:
      "bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300",
  },
};

export function getQuestTypeConfig(type: string): QuestTypeConfig {
  return QUEST_TYPE_CONFIG[type as QuestTypeKey] || QUEST_TYPE_CONFIG.daily;
}
