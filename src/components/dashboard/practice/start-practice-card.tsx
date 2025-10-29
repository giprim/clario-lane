import { Badge, Button, Card, CardContent } from "@/components";

type StartPracticeCardProps = {
  title: string;
  description: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  difficulty: string;
  duration: string;
  xp: number;
  onStartExercise: () => void;
  delay?: number;
  iconColor?: string;
};

export const StartPracticeCard = (exercise: StartPracticeCardProps) => {
  return (
    <Card
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: exercise.delay! / 5 || 0.1 }}
    >
      <CardContent>
        <div className="space-y-4">
          <div className={`p-1 rounded-lg `}>
            <exercise.icon className={`w-6 h-6 text-${exercise.iconColor} `} />
          </div>
          <div>
            <h3 className="mb-1">{exercise.title}</h3>
            <p className="text-sm  mb-3">{exercise.description}</p>
            <div className="flex items-center gap-3 mb-3">
              <Badge variant="secondary" className="text-xs">
                {exercise.difficulty}
              </Badge>
              <span className="text-sm ">{exercise.duration}</span>
              <span className="text-sm text-primary">+{exercise.xp} XP</span>
            </div>
            <Button
              variant="default"
              size="sm"
              className={`w-full font-semibold bg-${exercise.iconColor}`}
              onClick={exercise.onStartExercise}
            >
              Start
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
