import { usePracticeStore } from '../../../store/practice/practiceStore'
import { RSVPReader } from './RSVPReader'
import { ComprehensionQuiz } from './ComprehensionQuiz'
import { Results } from './result'
import { PracticeStep } from '@/lib'
import type { ReactNode } from 'react'

const steps: Record<PracticeStep, ReactNode> = {
  Reading: <RSVPReader />,
  Quiz: <ComprehensionQuiz />,
  Results: <Results />,
}

export const SpeedReadingTraining = () => {
  const { currentStep } = usePracticeStore()

  return <div>{steps[currentStep]}</div>
}
