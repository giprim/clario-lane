export type OnboardingType = {
  name?: string;
  email?: string;
  baseLineWPM?: number;
  baselineComprehension?: number;
  goals: string[];
  contentTypes: string[];
  challenges: string[];
  currentComprehensionScore: number;
  onboardingComplete: boolean;
  currentWPM?: number;
  achievements: boolean;
  badges?: string[];

  dateOfBirth?: string | Date;
  focusScore?: number;
  dailyReminder: boolean;
  weeklyProgress: boolean;
  streakDays?: number;
  xpEarned?: number;
  level?: number;

  isSubmitting: boolean;
  currentStep: number;
  readingTestStage: "intro" | "reading" | "questions" | "results";
  readingTime: number;
  startTime: number;
  totalSessions?: number;
  totalSteps: number;
  // readingGoal?: string;
  // dailyTime?: string;
  // baselineWPM?: number;
  // exercisesCompleted?: number;
};

export type OnboardingContextType = {
  updateProfile: (updates: Partial<OnboardingType>) => void;
};
