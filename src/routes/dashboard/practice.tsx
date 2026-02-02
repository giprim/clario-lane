import { SpeedReadingPending } from '@/components'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/practice')({
  component: RouteComponent,
  pendingComponent: SpeedReadingPending,
})

function RouteComponent() {
  return (
    <div>
      <Outlet />
    </div>
  )
}
