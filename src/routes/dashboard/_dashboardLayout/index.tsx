import {
  OverviewStats,
  ProgressChart,
  GoalTrackerCard,
  DailyPracticeCard,
  OverviewPending,
} from '@/components'

import {
  createFileRoute,
  redirect,
  useRouteContext,
} from '@tanstack/react-router'
import { motion } from 'motion/react'

export const Route = createFileRoute('/dashboard/_dashboardLayout/')({
  component: RouteComponent,
  pendingComponent: OverviewPending,
})

export function RouteComponent() {
  // const userProfile = useUserProfileStore()
  const userProfile = useRouteContext({ from: '__root__' }).user

  if (!userProfile) {
    throw redirect({ to: '/auth' })
  }

  // Mock data for the chart
  const progressData = [
    { day: 'Day 1', wpm: userProfile.baseline_wpm! },
    { day: 'Day 2', wpm: userProfile.baseline_wpm! + 10 },
    { day: 'Day 3', wpm: userProfile.baseline_wpm! + 15 },
    { day: 'Day 4', wpm: userProfile.baseline_wpm! + 25 },
    { day: 'Day 5', wpm: userProfile.baseline_wpm! + 30 },
    { day: 'Day 6', wpm: userProfile.baseline_wpm! + 40 },
    { day: 'Today', wpm: userProfile.current_wpm! },
  ]

  const goalWPM = Math.round(userProfile.baseline_wpm! * 1.5)
  const progressPercent = Math.round(
    ((userProfile.current_wpm! - userProfile.baseline_wpm!) /
      (goalWPM - userProfile.baseline_wpm!)) *
      100
  )
  const improvement = userProfile.current_wpm! - userProfile.baseline_wpm!

  const todaysTasks = [
    {
      id: 1,
      title: 'Complete daily reading exercise',
      completed: false,
      xp: 25,
    },
    { id: 2, title: 'Practice word chunking drill', completed: true, xp: 20 },
    { id: 3, title: 'Take comprehension quiz', completed: false, xp: 30 },
  ]

  return (
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -40, opacity: 0 }}
      transition={{ type: 'spring' }}
      className='space-y-6'
      key='overview'>
      {/* Quick Stats */}
      <OverviewStats
        comprehension={{
          score: userProfile.current_comprehension_score!,
          baseline: userProfile.baseline_comprehension!,
        }}
        currentSpeed={{
          wpm: userProfile.current_wpm!,
          baseline: userProfile.baseline_wpm!,
          improvement,
        }}
        progress={{
          percentage: progressPercent,
          target: goalWPM - userProfile.current_wpm!,
        }}
        session={{
          streak: userProfile.streak_days!,
          total: userProfile.total_sessions!,
        }}
      />

      {/* Progress Chart */}
      <ProgressChart progressData={progressData} />

      <div className='grid md:grid-cols-2 gap-6'>
        {/* Today's Tasks */}
        {todaysTasks.length ? (
          <DailyPracticeCard todaysTasks={todaysTasks} />
        ) : null}

        {/* Goal Tracker */}
        <GoalTrackerCard
          current_wpm={userProfile.current_wpm || 0}
          goalWPM={goalWPM}
          progressPercent={progressPercent}
          badges={userProfile.badges ? [...userProfile.badges] : undefined}
          baseline_wpm={userProfile.baseline_wpm || 0}
          level={userProfile.level || 0}
          streak_days={userProfile.streak_days || 0}
          total_sessions={userProfile.total_sessions || 0}
        />
      </div>
    </motion.div>
  )
}
