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
  const { currentStep, passage } = useSpeedReadingStore();
  console.log({ passage, currentStep });
  return <div>{steps[currentStep]}</div>;
};
