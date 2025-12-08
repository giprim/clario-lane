import { CheckCircle2 } from 'lucide-react'
import { getQuestTypeConfig } from '@/lib/constants/quest.constants'
import { cn } from '@/lib'

type QuestHeaderProps = {
  type: string
  isCompleted: boolean
  isClaimed: boolean
}

export function QuestHeader({
  type,
  isCompleted,
  isClaimed,
}: QuestHeaderProps) {
  const config = getQuestTypeConfig(type)
  const Icon = config.icon

  return (
    <div className='flex items-center justify-between mb-3'>
      <div className='flex items-center gap-2'>
        <div className={cn('p-2 rounded-lg', config.bgColor)}>
          <Icon className={cn('w-4 h-4', config.iconColor)} />
        </div>
        <span
          className={cn(
            'text-xs font-semibold uppercase tracking-wide px-2 py-1 rounded-full',
            config.badgeColor
          )}>
          {type}
        </span>
      </div>

      {isCompleted && (
        <div className='flex items-center gap-1'>
          <CheckCircle2
            className={cn(
              'w-5 h-5',
              isClaimed
                ? 'text-green-600 dark:text-green-400'
                : 'text-yellow-600 dark:text-yellow-400'
            )}
          />
        </div>
      )}
    </div>
  )
}
