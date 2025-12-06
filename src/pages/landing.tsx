import { Route } from '@/routes/__root'
import { HeroSection } from './landing/components/hero-section'
import { FeaturesSection } from './landing/components/features-section'
import { StatsSection } from './landing/components/stats-section'
import { TestimonialsSection } from './landing/components/testimonials-section'
import { FooterCTA } from './landing/components/footer-cta'

export function LandingPage() {
  const { session } = Route.useRouteContext()

  return (
    <div className='overflow-hidden'>
      <HeroSection session={session} />
      <FeaturesSection />
      <StatsSection />
      <TestimonialsSection />
      <FooterCTA session={session} />
    </div>
  )
}
