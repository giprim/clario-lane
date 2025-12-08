import { CardTitle } from '@/components'
import { Trophy } from 'lucide-react'

type QuestCardHeaderProps = {
  count: number
}

export function QuestCardHeader({ count }: QuestCardHeaderProps) {
  return (
    <div className='flex items-center justify-between'>
      <CardTitle className='flex items-center gap-2'>
        <Trophy className='w-5 h-5 text-indigo-600 dark:text-indigo-400' />
        Daily Quests
      </CardTitle>
      <div className='px-3 py-1 bg-indigo-100 dark:bg-indigo-950/50 rounded-full'>
        <span className='text-xs font-semibold text-indigo-700 dark:text-indigo-300'>
          {count} Active
        </span>
      </div>
    </div>
  )
}
