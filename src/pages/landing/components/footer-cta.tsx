import { Button } from '@/components'
import { Link } from '@tanstack/react-router'
import type { Session } from '@supabase/supabase-js'

interface FooterCTAProps {
  session: Session | null
}

export function FooterCTA({ session }: FooterCTAProps) {
  return (
    <section className='py-32 px-4 text-center'>
      <h2 className='text-5xl font-bold mb-8 tracking-tight'>
        Ready to unlock your <span className='text-primary'>potential?</span>
      </h2>
      {session ? (
        <Button size='xl' className='rounded-full h-16 px-12 text-xl' asChild>
          <Link to='/dashboard'>Go to Dashboard</Link>
        </Button>
      ) : (
        <Button size='xl' className='rounded-full h-16 px-12 text-xl' asChild>
          <Link to='/auth'>Get Started</Link>
        </Button>
      )}
    </section>
  )
}
