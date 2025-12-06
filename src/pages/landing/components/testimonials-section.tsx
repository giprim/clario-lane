import { TestimonialCard } from '@/components'

export function TestimonialsSection() {
  return (
    <section className='py-32 px-4'>
      <div className='container mx-auto max-w-6xl'>
        <h2 className='text-4xl font-bold text-center mb-16'>
          Loved by{' '}
          <span className='bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-purple-600'>
            Avid Readers
          </span>
        </h2>
        <div className='grid md:grid-cols-2 gap-8'>
          <TestimonialCard
            name='Sarah Chen'
            department='Researcher'
            text='I went from 250 WPM to 600 WPM in just 3 weeks. This platform transformed how I consume academic papers.'
            rating={5}
            improvement='2.4x faster'
          />
          <TestimonialCard
            name='Michael Rodriguez'
            department='Product Manager'
            text="The focus drills helped eliminate my subvocalization habit. I'm reading reports 3x faster now with better retention."
            rating={5}
            improvement='3x faster'
          />
        </div>
      </div>
    </section>
  )
}
