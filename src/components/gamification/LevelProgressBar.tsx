import { Card, CardContent, Progress } from '@/components'
import { Trophy } from 'lucide-react'
import { motion } from 'motion/react'

interface LevelProgressBarProps {
  currentXP: number
  level: number
}

export function LevelProgressBar({ currentXP, level }: LevelProgressBarProps) {
  // Calculate XP needed for current level and next level
  // Using formula: Level = sqrt(Total XP / 100)
  // So: Total XP needed for level N = N^2 * 100
  const xpForCurrentLevel = level * level * 100
  const xpForNextLevel = (level + 1) * (level + 1) * 100
  const xpIntoCurrentLevel = currentXP - xpForCurrentLevel
  const xpNeededForNextLevel = xpForNextLevel - xpForCurrentLevel
  const progressPercent = Math.min(
    (xpIntoCurrentLevel / xpNeededForNextLevel) * 100,
    100
  )

  return (
    <Card className='bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-100'>
      <CardContent className='p-6'>
        <div className='flex items-center justify-between mb-3'>
          <div className='flex items-center gap-2'>
            <Trophy className='w-5 h-5 text-indigo-600' />
            <span className='text-sm font-medium text-gray-700'>
              Level {level}
            </span>
          </div>
          <span className='text-xs text-gray-600'>
            {xpIntoCurrentLevel.toLocaleString()} /{' '}
            {xpNeededForNextLevel.toLocaleString()} XP
          </span>
        </div>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 0.5 }}>
          <Progress value={progressPercent} className='h-3' />
        </motion.div>
        <p className='text-xs text-gray-500 mt-2 text-center'>
          {progressPercent >= 100
            ? 'Ready to level up! 🎉'
            : `${Math.round(xpNeededForNextLevel - xpIntoCurrentLevel).toLocaleString()} XP to level ${level + 1}`}
        </p>
      </CardContent>
    </Card>
  )
}
