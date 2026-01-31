import * as React from 'react'
import {
  Outlet,
  createRootRouteWithContext,
  useLocation,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { QueryClient } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import Navbar from '@/components/navbar'

import {
  // Footer,
  PendingPage,
  SettingsProvider,
  FloatingActionButton,
  Copyright,
} from '@/components'
import type { Session } from '@supabase/supabase-js'
import { supabaseService } from '~supabase/clientServices'
import type { UserTable } from '@/types'
import {
  useOnboardingFlow,
  useOnboardingStore,
  type OnboardingType,
} from '@/store'

type RootRouteContext = {
  queryClient: QueryClient
  session: Session | null
  user: UserTable | undefined
}

export const Route = createRootRouteWithContext<RootRouteContext>()({
  component: RootComponent,
  pendingComponent: PendingPage,
  beforeLoad: async ({ context }) => {
    const session = await supabaseService.getSession()
    const user = await supabaseService.getUser()
    if (user) {
      useOnboardingStore.setState({
        ...(user as unknown as Partial<OnboardingType>),
      })
      if (user?.onboarding_completed) {
        useOnboardingFlow.setState({ current_step: 6 })
      } else {
        useOnboardingFlow.setState({ current_step: 5 })
      }
    }
    return { ...context, session, user }
  },
})

// Create a persister
// const persister = createSyncStoragePersister({
//   storage: window.localStorage,
// })

// import { clientEnv } from '@/config/env'
// import { useEffect } from 'react'

function RootComponent() {
  const pathname = useLocation().pathname

  // useEffect(() => {
  //   const gaKey = clientEnv.VITE_GOOGLE_ANALYTICS_KEY
  //   if (!gaKey) return

  //   // Inject generic script
  //   const script1 = document.createElement('script')
  //   script1.async = true
  //   script1.src = `https://www.googletagmanager.com/gtag/js?id=${gaKey}`
  //   document.head.appendChild(script1)

  //   const script2 = document.createElement('script')
  //   script2.innerHTML = `
  //     window.dataLayer = window.dataLayer || [];
  //     function gtag(){dataLayer.push(arguments);}
  //     gtag('js', new Date());
  //     gtag('config', '${gaKey}');
  //   `
  //   document.head.appendChild(script2)
  // }, [])

  // useEffect(() => {
  //   const gaKey = clientEnv.VITE_GOOGLE_ANALYTICS_KEY
  //   if (typeof window !== 'undefined' && (window as any).gtag && gaKey) {
  //     ;(window as any).gtag('config', gaKey, {
  //       page_path: pathname,
  //     })
  //   }
  // }, [pathname])

  return (
    <React.Fragment>
      <SettingsProvider>
        <Navbar />
        <Outlet />
        {pathname.includes('/dashboard/practice') ? null : (
          <>
            <FloatingActionButton />
            <Copyright />
          </>
        )}
        <Toaster position='top-center' richColors />
        <TanStackRouterDevtools position='bottom-left' />
        <ReactQueryDevtools position='bottom' initialIsOpen={false} />
      </SettingsProvider>
    </React.Fragment>
  )
}
