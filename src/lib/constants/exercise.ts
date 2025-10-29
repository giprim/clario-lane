import { Brain, Eye, Target, Zap } from "lucide-react";

export const EXERCISES = {
  SPEED_READING: 0,
  COMPREHENSION: 1,
  WORD_CHUNKING: 2,
  PERIPHERAL_VISION: 3,
} as const;
export type EXERCISES = (typeof EXERCISES)[keyof typeof EXERCISES];

export const ExerciseStep = {
  Reading: 0,
  Quiz: 1,
  Results: 2,
} as const;

export type ExerciseStep = (typeof ExerciseStep)[keyof typeof ExerciseStep];

export const EXERCISE_ICONS = {
  SPEED_READING: Zap,
  COMPREHENSION: Brain,
  WORD_CHUNKING: Target,
  PERIPHERAL_VISION: Eye,
} as const;

export type EXERCISE_ICONS =
  (typeof EXERCISE_ICONS)[keyof typeof EXERCISE_ICONS];

export const EXERCISE_COLORS = {
  SPEED_READING: "blue",
  COMPREHENSION: "green",
  WORD_CHUNKING: "yellow",
  PERIPHERAL_VISION: "red",
} as const;

export type EXERCISE_COLORS =
  (typeof EXERCISE_COLORS)[keyof typeof EXERCISE_COLORS];

export type ExerciseProps = {
  title: string;
  description: string;
  duration: string;
  difficulty: string;
  xp: number;
};

export const EXERCISE_CARDS_INFO: Record<
  keyof typeof EXERCISES,
  ExerciseProps
> = {
  SPEED_READING: {
    title: "Speed Reading",
    description: "Learn how to read faster and more efficiently.",
    duration: "10 minutes",
    difficulty: "Easy",
    xp: 100,
  },
  COMPREHENSION: {
    title: "Comprehension",
    description: "Improve your reading comprehension skills.",
    duration: "15 minutes",
    difficulty: "Medium",
    xp: 150,
  },
  WORD_CHUNKING: {
    title: "Word Chunking",
    description: "Learn how to read words faster by chunking them.",
    duration: "20 minutes",
    difficulty: "Medium",
    xp: 200,
  },
  PERIPHERAL_VISION: {
    title: "Peripheral Vision",
    description: "Improve your peripheral vision to read faster.",
    duration: "25 minutes",
    difficulty: "Hard",
    xp: 250,
  },
};

export const EXERCISE_ROUTES: Record<keyof typeof EXERCISES, string> = {
  SPEED_READING: "/dashboard/practice/speedreading",
  COMPREHENSION: "/dashboard/practice",
  WORD_CHUNKING: "/dashboard/practice",
  PERIPHERAL_VISION: "/dashboard/practice",
} as const;

export type EXERCISE_ROUTES =
  (typeof EXERCISE_ROUTES)[keyof typeof EXERCISE_ROUTES];
