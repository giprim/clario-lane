import { Card, CardContent, CardHeader } from '@/components'
import type { Quest, UserQuest } from '@/types'
import { useActiveQuests } from '@/hooks/useActiveQuests'
import { QuestEmptyState } from './quest-components/QuestEmptyState'
import { QuestCardHeader } from './quest-components/QuestCardHeader'
import { QuestItem } from './quest-components/QuestItem'

type Props = {
  todaysTasks: {
    all?: Quest[]
    userProgress?: UserQuest[]
    getProgress: (questId: string) => UserQuest | undefined
  }
  onClaimQuest?: (questId: string) => void
}

export const QuestCard = ({ todaysTasks, onClaimQuest }: Props) => {
  const activeQuests = useActiveQuests(
    todaysTasks.all || [],
    todaysTasks.getProgress
  )

  if (activeQuests.length === 0) {
    return <QuestEmptyState />
  }

  return (
    <Card className='bg-linear-to-br from-white to-indigo-50/30 dark:from-zinc-900 dark:to-indigo-950/10 border-indigo-100 dark:border-indigo-900/30'>
      <CardHeader>
        <QuestCardHeader count={activeQuests.length} />
      </CardHeader>
      <CardContent className='space-y-2'>
        {activeQuests.map((quest) => {
          const progress = todaysTasks.getProgress(quest.id)
          return (
            <QuestItem
              key={quest.id}
              quest={quest}
              progress={progress}
              onClaim={onClaimQuest}
            />
          )
        })}
      </CardContent>
    </Card>
  )
}
