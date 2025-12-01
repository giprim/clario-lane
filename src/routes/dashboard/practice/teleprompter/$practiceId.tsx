import { TeleprompterTraining } from '@/components/exercises'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/dashboard/practice/teleprompter/$practiceId'
)({
  component: TeleprompterPractice,
})

function TeleprompterPractice() {
  return (
    <div className='container mx-auto p-6'>
      <TeleprompterTraining />
    </div>
  )
}
