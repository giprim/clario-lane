import { SpeedReadingTraining } from '@/components'
import { fetchPassage } from '@/integration'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/dashboard/_dashboardLayout/practice/_practice-layout/speedreading/$practiceId'
)({
  component: RouteComponent,
  loader: async ({ context }) => {
    context.queryClient.fetchQuery(fetchPassage)
  },
})

function RouteComponent() {
  return <SpeedReadingTraining />
}
