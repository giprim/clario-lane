import { SettingsPage, SettingsPending } from '@/components'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/settings')({
  component: SettingsPage,
  pendingComponent: SettingsPending,
})
