import { Badge, Button, Card, CardContent } from "@/components";
import {
  EXERCISE_CARDS_INFO,
  EXERCISE_COLORS,
  EXERCISE_ICONS,
  EXERCISE_ROUTES,
  EXERCISES,
} from "@/lib";
import { useNavigate } from "@tanstack/react-router";

type StartPracticeCardProps = {
  delay?: number;
  exerciseId: string;
};

export const StartPracticeCard = ({
  delay,
  exerciseId,
}: StartPracticeCardProps) => {
  const id = exerciseId as unknown as keyof typeof EXERCISES;
  const navigate = useNavigate();

  const Icon = EXERCISE_ICONS[id];
  const color = EXERCISE_COLORS[id];
  const info = EXERCISE_CARDS_INFO[id];
  const route = EXERCISE_ROUTES[id];

  return (
    <Card
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay! / 5 || 0.1 }}
    >
      <CardContent>
        <div className="space-y-4">
          <div className={`p-1 rounded-lg `}>
            <Icon className={`w-6 h-6 text-${color}-500`} />
          </div>
          <div>
            <h3 className="mb-1">{info.title}</h3>
            <p className="text-sm  mb-3">{info.description}</p>
            <div className="flex items-center gap-3 mb-3">
              <Badge variant="secondary" className="text-xs">
                {info.difficulty}
              </Badge>
              <span className="text-sm ">{info.duration}</span>
              <span className="text-sm text-primary">+{info.xp} XP</span>
            </div>
            <Button
              size="sm"
              variant="outline"
              className={`w-full font-semibold `}
              onClick={() => navigate({ to: route })}
            >
              Start
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
