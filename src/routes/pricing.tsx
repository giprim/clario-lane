import Billing from '@/components/onboarding/billing'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { BillingPendingPage } from '@/components'
import { useSubscription } from '@/hooks'

export const Route = createFileRoute('/pricing')({
  component: RouteComponent,
  pendingComponent: BillingPendingPage,
  loader: async ({ context }) => {
    const { user } = context
    if (user?.is_subscribed) {
      throw redirect({ to: '/dashboard' })
    }
  },
})

function RouteComponent() {
  const { onSubscribe } = useSubscription()

  return (
    <div className='py-10 px-4 pt-28 nd:pt-24'>
      <Billing onSubscribe={onSubscribe} />
    </div>
  )
}
