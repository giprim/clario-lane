import { useState } from "react";
import { useOnboardingFlow, useOnboardingStore } from "@/store";
import { PASSAGE } from "./passage";

export function useOnboardingReadingTest() {
  const [answers, setAnswers] = useState<number[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const { updateProfile, xp_earned } = useOnboardingStore();
  const { update, start_time, reading_time } = useOnboardingFlow();

  const handleStartReading = () => {
    update({ reading_test_stage: "reading", start_time: Date.now() });
  };

  const handleFinishReading = () => {
    const endTime = Date.now();
    update({
      reading_test_stage: "questions",
      reading_time: (endTime - start_time) / 1000,
    });
  };

  const handleAnswerQuestion = (answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < PASSAGE.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResults();
    }
  };

  const calculateResults = () => {
    const correctAnswers = answers.filter(
      (answer, index) => answer === PASSAGE.questions[index].correct,
    ).length;
    const baseline_comprehension = Math.round(
      (correctAnswers / PASSAGE.questions.length) * 100,
    );
    const baseline_wpm = Math.round((PASSAGE.wordCount / reading_time) * 60);

    updateProfile({
      baseline_comprehension,
      baseline_wpm,
      focus_score: 92,
      xp_earned: xp_earned ? xp_earned + 150 : 150,
    });
    update({
      reading_test_stage: "results",
    });
  };

  return {
    calculateResults,
    handleAnswerQuestion,
    handleNextQuestion,
    handleFinishReading,
    handleStartReading,
    currentQuestion,
    answers,
  };
}
