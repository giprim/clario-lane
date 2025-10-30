import {
  OverviewStats,
  ProgressChart,
  GoalTrackerCard,
  DailyPracticeCard,
  OverviewPending,
} from '@/components'

import { useUserProfileStore } from '@/store'
import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'motion/react'

export const Route = createFileRoute('/dashboard/_dashboardLayout/')({
  component: RouteComponent,
  pendingComponent: OverviewPending,
})

export function RouteComponent() {
  const userProfile = useUserProfileStore()

  // Mock data for the chart
  const progressData = [
    { day: 'Day 1', wpm: userProfile.baseLineWPM },
    { day: 'Day 2', wpm: userProfile.baseLineWPM! + 10 },
    { day: 'Day 3', wpm: userProfile.baseLineWPM! + 15 },
    { day: 'Day 4', wpm: userProfile.baseLineWPM! + 25 },
    { day: 'Day 5', wpm: userProfile.baseLineWPM! + 30 },
    { day: 'Day 6', wpm: userProfile.baseLineWPM! + 40 },
    { day: 'Today', wpm: userProfile.currentWPM },
  ]

  const goalWPM = Math.round(userProfile.baseLineWPM! * 1.5)
  const progressPercent = Math.round(
    ((userProfile.currentWPM! - userProfile.baseLineWPM!) /
      (goalWPM - userProfile.baseLineWPM!)) *
      100
  )
  const improvement = userProfile.currentWPM! - userProfile.baseLineWPM!

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
          score: userProfile.currentComprehensionScore!,
          baseline: userProfile.baselineComprehension!,
        }}
        currentSpeed={{
          wpm: userProfile.currentWPM!,
          baseline: userProfile.baseLineWPM!,
          improvement,
        }}
        progress={{
          percentage: progressPercent,
          target: goalWPM - userProfile.currentWPM,
        }}
        session={{
          streak: userProfile.streakDays!,
          total: userProfile.totalSessions!,
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
          currentWPM={userProfile.currentWPM}
          goalWPM={goalWPM}
          progressPercent={progressPercent}
          badges={userProfile.badges}
          baseLineWPM={userProfile.baseLineWPM}
          level={userProfile.level}
          streakDays={userProfile.streakDays}
          totalSessions={userProfile.totalSessions}
        />
      </div>
    </motion.div>
  )
}
