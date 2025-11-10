import { useOnboardingFlow } from '@/store'
import { ReadingTestIntro } from './intro'
import { Questions } from './questions'
import { Reading } from './reading'
import { Results } from './results'

const stages = {
  intro: <ReadingTestIntro />,
  reading: <Reading />,
  questions: <Questions />,
  results: <Results />,
}

export function OnboardingReadingTest() {
  const { reading_test_stage } = useOnboardingFlow()
  return stages[reading_test_stage]
}
