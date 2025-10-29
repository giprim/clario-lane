import { TrainingStep } from '../../../lib/constants'
import { useSpeedReadingStore } from './use-speed-reading-store'
import { RSVPReader } from './RSVPReader'
import { ComprehensionQuiz } from './ComprehensionQuiz'
import { Results } from './result'

const steps = {
  [TrainingStep.Reading]: <RSVPReader />,
  [TrainingStep.Quiz]: <ComprehensionQuiz />,
  [TrainingStep.Results]: <Results />,
}

export const SpeedReadingTraining = () => {
  const { currentStep } = useSpeedReadingStore()
  return <div>{steps[currentStep]}</div>
}
