import { create } from "zustand";
import type {
  OnboardingContextType,
  OnboardingFlowActionType,
  OnboardingFlowType,
  OnboardingType,
} from "./onboarding-store-type";

export const useOnboardingStore = create<
  OnboardingType & OnboardingContextType
>((set) => ({
  updateProfile: (update) => set((state) => ({ ...state, ...update })),
  goals: [],
  onboarding_completed: false,
  content_type: [],
  challenges: [],
  daily_reminder: true,
  weekly_summary: true,
  achievements: true,
  current_comprehension_score: 0,
  baseline_comprehension: 0,
  baseline_wpm: 0,
  email: "",
  name: "",
}));

export const useOnboardingFlow = create<
  OnboardingFlowType & OnboardingFlowActionType
>((set) => ({
  current_step: 0,
  total_steps: 7,
  reading_test_stage: "intro",
  reading_time: 0,
  start_time: 0,
  update: (update) => set((state) => ({ ...state, ...update })),
}));
