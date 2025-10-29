import { Button, Card, CardContent, CardHeader, CardTitle } from "@/components";
import { CheckCircle2, Zap } from "lucide-react";

type Props = {
  todaysTasks: {
    id: number;
    title: string;
    completed: boolean;
    xp: number;
  }[];
};

export const DailyPracticeCard = ({ todaysTasks }: Props) => {
  return (
    <Card
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <CardHeader>
        <CardTitle>Today's Practice Plan</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {todaysTasks.map((task) => (
          <div
            key={task.id}
            className={`flex items-center justify-between p-3 rounded-lg border-2 ${
              task.completed
                ? "bg-green-50 border-green-200"
                : "bg-white border-gray-200"
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  task.completed
                    ? "bg-green-500 border-green-500"
                    : "border-gray-300"
                }`}
              >
                {task.completed && (
                  <CheckCircle2 className="w-3 h-3 text-white" />
                )}
              </div>
              <span
                className={
                  task.completed
                    ? "line-through text-gray-500"
                    : "text-gray-900"
                }
              >
                {task.title}
              </span>
            </div>
            <span className="text-sm text-indigo-600">+{task.xp} XP</span>
          </div>
        ))}
        <Button className="w-full mt-4">
          <Zap className="w-4 h-4 mr-2" />
          Start Practice Session
        </Button>
      </CardContent>
    </Card>
  );
};
