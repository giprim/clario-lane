import { Route } from '@/routes/__root'
import { HeroSection } from './landing/components/hero-section'
import { FeaturesSection } from './landing/components/features-section'
import { StatsSection } from './landing/components/stats-section'
import { TestimonialsSection } from './landing/components/testimonials-section'
import { FooterCTA } from './landing/components/footer-cta'
import { SeoHead } from '@/components/shared'

export function LandingPage() {
  const { session } = Route.useRouteContext()

  return (
    <div className='overflow-hidden'>
      <SeoHead
        title='Speed Reading & Retention'
        description='Train your brain to read faster and retain more with ClarioLane.'
      />
      <HeroSection session={session} />
      <FeaturesSection />
      <StatsSection />
      <TestimonialsSection />
      <FooterCTA session={session} />
    </div>
  )
}
