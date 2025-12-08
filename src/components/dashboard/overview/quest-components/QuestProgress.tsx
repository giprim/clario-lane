import { Progress } from '@/components'

type QuestProgressProps = {
  currentValue: number
  targetValue: number
  metric: string
  progressPercent: number
}

export function QuestProgress({
  currentValue,
  targetValue,
  metric,
  progressPercent,
}: QuestProgressProps) {
  return (
    <div className='space-y-2 mb-3'>
      <div className='flex items-center justify-between text-xs'>
        <span className='text-gray-600 dark:text-gray-400'>
          {currentValue.toLocaleString()} / {targetValue.toLocaleString()}{' '}
          {metric}
        </span>
        <span className='font-semibold text-primary'>
          {Math.round(progressPercent)}%
        </span>
      </div>
      <Progress value={progressPercent} className='h-2' />
    </div>
  )
}
