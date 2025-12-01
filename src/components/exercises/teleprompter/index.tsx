import { usePracticeStore } from '../../../store/practice/practiceStore'
import { TeleprompterReader } from './TeleprompterReader'
import { ComprehensionQuiz, Results } from '../shared'
import { PracticeStep } from '@/lib'
import type { ReactNode } from 'react'

const steps: Record<PracticeStep, ReactNode> = {
  Reading: <TeleprompterReader />,
  Quiz: <ComprehensionQuiz />,
  Results: <Results />,
}

export const TeleprompterTraining = () => {
  const { currentStep } = usePracticeStore()

  return <div>{steps[currentStep]}</div>
}
