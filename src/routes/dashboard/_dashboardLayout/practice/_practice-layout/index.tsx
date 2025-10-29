import { StartPracticeCard } from "@/components";
import { EXERCISES } from "@/lib";

import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Brain, Eye, Target, Zap } from "lucide-react";
import { motion } from "motion/react";

export const Route = createFileRoute(
  "/dashboard/_dashboardLayout/practice/_practice-layout/",
)({
  component: RouteComponent,
});

const exercises = [
  {
    id: EXERCISES.SPEED_READING,
    title: "Speed Reading Practice",
    description: "Read passages at increasing speeds to build reading velocity",
    icon: Zap,
    difficulty: "Medium",
    duration: "10 min",
    xp: 50,
    iconColor: "blue-500",
    route: "/dashboard/practice/speedreading",
  },
  {
    id: EXERCISES.COMPREHENSION,
    title: "Comprehension Training",
    description: "Focus on understanding and retaining what you read",
    icon: Brain,
    difficulty: "Medium",
    duration: "15 min",
    xp: 60,
    iconColor: "purple-500",
    route: "/dashboard/practice",
  },
  {
    id: EXERCISES.PERIPHERAL_VISION,
    title: "Peripheral Vision Expansion",
    description: "Train your eyes to see more words at once",
    icon: Eye,
    difficulty: "Easy",
    duration: "5 min",
    xp: 30,
    iconColor: "green-500",
    route: "/dashboard/practice",
  },
  {
    id: EXERCISES.WORD_CHUNKING,
    title: "Word Chunking Drill",
    description: "Practice reading groups of words together",
    icon: Target,
    difficulty: "Easy",
    duration: "8 min",
    xp: 40,
    iconColor: "yellow-500",
    route: "/dashboard/practice",
  },
];

export function RouteComponent() {
  // const { setActiveExercise } = useAppStore();
  const navigate = useNavigate();

  return (
    <motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {exercises.map((exercise, index) => (
          <StartPracticeCard
            key={exercise.id}
            title={exercise.title}
            description={exercise.description}
            icon={exercise.icon}
            difficulty={exercise.difficulty}
            duration={exercise.duration}
            xp={exercise.xp}
            onStartExercise={() => navigate({ to: exercise.route })}
            delay={index}
            iconColor={exercise.iconColor}
          />
        ))}
      </div>
    </motion.div>
  );
}
