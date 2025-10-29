import { EXERCISES } from '@/lib'
import { create } from 'zustand'

type AppStore = {
  activeExercise: EXERCISES
}

type AppStoreActions = {
  setActiveExercise: (exerciseId: EXERCISES) => void
}

export const useAppStore = create<AppStore & AppStoreActions>((set) => ({
  activeExercise: EXERCISES.NONE,
  setActiveExercise: (exerciseId) => set({ activeExercise: exerciseId }),
}))
