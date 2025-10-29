import { TrainingStep } from '@/lib'
import { create } from 'zustand'

export type Question = {
  id: string
  question: string
  options: string[]
  correctIndex: number
}

export type Passage = {
  id: string
  text: string
  title: string
  questions: Question[]
}

export type SpeedReadingStore = {
  text: string
  currentStep: TrainingStep
  wordsRead?: number
  duration?: number
  wpm: number

  correctAnswers: number
  totalQuestions: number
  comprehension: number
  passage: Passage | null
  loading: boolean
}

type SpeedReadingStoreActions = {
  setStep: (step: TrainingStep) => void
  setCompleted: (
    values: Pick<SpeedReadingStore, 'wordsRead' | 'duration' | 'wpm'>
  ) => void
  setText: (text: string) => void
  setWpm: (wpm: number) => void
  updateStore: (values: Partial<SpeedReadingStore>) => void
}

export const useSpeedReadingStore = create<
  SpeedReadingStore & SpeedReadingStoreActions
>((set) => ({
  text: '',
  wpm: 200,
  currentStep: TrainingStep.Reading,
  correctAnswers: 0,
  totalQuestions: 0,
  comprehension: 0,
  passage: null,
  loading: false,

  setStep: (step: TrainingStep) => set({ currentStep: step }),
  setCompleted: (
    values: Pick<SpeedReadingStore, 'wordsRead' | 'duration' | 'wpm'>
  ) => set(values),
  setText: (text: string) => set({ text }),
  setWpm: (wpm: number) => set({ wpm }),
  updateStore: (values: Partial<SpeedReadingStore>) => set(values),
}))
