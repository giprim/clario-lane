import {
  NotificationsCard,
  ReadingPreferencesCard,
  SettingsLayout,
  SubscriptionCard,
  PasswordCard,
} from './'

export function SettingsPage() {
  return (
    <SettingsLayout>
      <SubscriptionCard />
      <PasswordCard />
      <ReadingPreferencesCard />
      <NotificationsCard />
    </SettingsLayout>
  )
}
