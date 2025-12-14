import AuthPage from '@/pages/auth/auth-page'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <AuthPage />
}
