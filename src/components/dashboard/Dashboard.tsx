import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components";
import { OverviewTab, PracticeTab, ProgressTab, ChallengesTab } from ".";
import { BookOpen, TrendingUp, Target, Trophy } from "lucide-react";
import { motion } from "motion/react";

export function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen ">
      {/* Header */}
      {/*<div className=" border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-600 rounded-lg p-2">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-indigo-900">SpeedRead</h1>
                <p className="text-sm text-gray-600">Welcome back!</p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-orange-500" />
                <div>
                  <div className="text-sm text-gray-600">Streak</div>
                  <div className="text-indigo-900">
                    {userProfile.streakDays} days
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-yellow-500" />
                <div>
                  <div className="text-sm text-gray-600">Level</div>
                  <div className="text-indigo-900">{userProfile.level}</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-indigo-600" />
                <div>
                  <div className="text-sm text-gray-600">XP</div>
                  <div className="text-indigo-900">{userProfile.xpEarned}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>*/}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4 mb-8">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="practice" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Practice</span>
            </TabsTrigger>
            <TabsTrigger value="progress" className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              <span className="hidden sm:inline">Progress</span>
            </TabsTrigger>
            <TabsTrigger value="challenges" className="flex items-center gap-2">
              <Trophy className="w-4 h-4" />
              <span className="hidden sm:inline">Challenges</span>
            </TabsTrigger>
          </TabsList>

          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <TabsContent value="overview" className="mt-0">
              <OverviewTab />
            </TabsContent>

            <TabsContent value="practice" className="mt-0">
              <PracticeTab />
            </TabsContent>

            <TabsContent value="progress" className="mt-0">
              <ProgressTab />
            </TabsContent>

            <TabsContent value="challenges" className="mt-0">
              <ChallengesTab />
            </TabsContent>
          </motion.div>
        </Tabs>
      </div>
    </div>
  );
}
