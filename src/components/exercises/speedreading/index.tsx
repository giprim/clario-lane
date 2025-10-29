import { useSpeedReadingStore } from "./use-speed-reading-store";
import { RSVPReader } from "./RSVPReader";
import { ComprehensionQuiz } from "./ComprehensionQuiz";
import { Results } from "./result";
import { ExerciseStep } from "@/lib";

const steps = {
  [ExerciseStep.Reading]: <RSVPReader />,
  [ExerciseStep.Quiz]: <ComprehensionQuiz />,
  [ExerciseStep.Results]: <Results />,
};

export const SpeedReadingTraining = () => {
  const { currentStep } = useSpeedReadingStore();

  return <div>{steps[currentStep]}</div>;
};
