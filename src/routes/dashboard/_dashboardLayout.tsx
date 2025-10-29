import { Tabs, TabsList, TabsTrigger } from "@/components";
import { useUserProfileStore } from "@/store";
import {
  createFileRoute,
  Link,
  Outlet,
  redirect,
  useLocation,
} from "@tanstack/react-router";
import { BookOpen, Target, TrendingUp, Trophy } from "lucide-react";
import { AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/dashboard/_dashboardLayout")({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    if (!context.session) {
      throw redirect({ to: "/auth" });
    }

    const { onboardingComplete } = useUserProfileStore.getState();
    if (!onboardingComplete) {
      throw redirect({ to: "/onboarding" });
    }
  },
});

const PrimaryDashboardPaths = [
  "dashboard",
  "practice",
  "challenges",
  "progress",
];

function RouteComponent() {
  const pathsArray = useLocation().pathname.split("/");
  const currentPath = pathsArray[pathsArray.length - 1];

  const [activePathname, setActivePathname] = useState(currentPath);

  useEffect(() => {
    setActivePathname(currentPath);
    if (PrimaryDashboardPaths.includes(currentPath)) {
      setActivePathname(currentPath);
    } else {
      let newPath = "";
      PrimaryDashboardPaths.forEach((path) => {
        if (pathsArray.includes(path)) newPath = path;
      });
      setActivePathname(newPath);
    }
  }, [activePathname, currentPath, pathsArray]);

  return (
    <div className="min-h-screen ">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <Tabs value={activePathname} className="w-full">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4 mb-8">
            <TabsTrigger
              asChild
              value="dashboard"
              className="flex items-center gap-2"
            >
              <Link to="/dashboard">
                <TrendingUp className="w-4 h-4" />
                <span className="hidden sm:inline">Overview</span>
              </Link>
            </TabsTrigger>

            <TabsTrigger
              asChild
              value="practice"
              className="flex items-center gap-2"
            >
              <Link to="/dashboard/practice">
                <BookOpen className="w-4 h-4" />
                <span className="hidden sm:inline">Practice</span>
              </Link>
            </TabsTrigger>

            <TabsTrigger
              asChild
              value="progress"
              className="flex items-center gap-2"
            >
              <Link to="/dashboard/progress">
                <Target className="w-4 h-4" />
                <span className="hidden sm:inline">Progress</span>
              </Link>
            </TabsTrigger>
            <TabsTrigger
              asChild
              value="challenges"
              className="flex items-center gap-2"
            >
              <Link to="/dashboard/challenges">
                <Trophy className="w-4 h-4" />
                <span className="hidden sm:inline">Challenges</span>
              </Link>
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <AnimatePresence mode="wait">
          <Outlet />
        </AnimatePresence>
      </div>
    </div>
  );
}
