export const TrainingStep = {
  Reading: 0,
  Quiz: 1,
  Results: 2,
} as const

export type TrainingStep = (typeof TrainingStep)[keyof typeof TrainingStep]

export const EXERCISES = {
  SPEED_READING: 0,
  COMPREHENSION: 1,
  WORD_CHUNKING: 2,
  PERIPHERAL_VISION: 3,
  NONE: 4,
} as const

export type EXERCISES = (typeof EXERCISES)[keyof typeof EXERCISES]
