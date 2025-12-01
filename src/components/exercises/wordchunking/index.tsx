import { usePracticeStore } from '../../../store/practice/practiceStore'
import { WordChunkingReader } from './WordChunkingReader'
import { ComprehensionQuiz, Results } from '../shared'
import { PracticeStep } from '@/lib'
import type { ReactNode } from 'react'

const steps: Record<PracticeStep, ReactNode> = {
  Reading: <WordChunkingReader />,
  Quiz: <ComprehensionQuiz />,
  Results: <Results />,
}

export const WordChunkingTraining = () => {
  const { currentStep } = usePracticeStore()

  return <div>{steps[currentStep]}</div>
}
