import { createFileRoute } from '@tanstack/react-router'
import { WordChunkingTraining } from '@/components/exercises'

export const Route = createFileRoute(
  '/dashboard/practice/wordchunking/$practiceId'
)({
  component: WordChunkingPractice,
})

function WordChunkingPractice() {
  return (
    <div className='container mx-auto p-6'>
      <WordChunkingTraining />
    </div>
  )
}
