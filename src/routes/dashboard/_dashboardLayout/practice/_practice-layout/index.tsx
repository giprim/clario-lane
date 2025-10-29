import { StartPracticeCard } from "@/components";
import { EXERCISES } from "@/lib";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";

export const Route = createFileRoute(
  "/dashboard/_dashboardLayout/practice/_practice-layout/",
)({
  component: RouteComponent,
});

export function RouteComponent() {
  const exerciseIds = Object.keys(EXERCISES);

  return (
    <motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {exerciseIds.map((id, index) => (
          <StartPracticeCard key={id} delay={index} exerciseId={id} />
        ))}
      </div>
    </motion.div>
  );
}
