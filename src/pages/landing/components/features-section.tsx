import { motion } from 'motion/react'
import { Award, BookOpen, Brain, Target, TrendingUp } from 'lucide-react'

export function FeaturesSection() {
  return (
    <section className='py-32 px-4 relative'>
      <div className='container mx-auto max-w-6xl'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className='text-center mb-20 space-y-4'>
          <h2 className='text-4xl md:text-5xl font-bold tracking-tight'>
            Engineered for{' '}
            <span className='text-primary decoration-wavy underline decoration-primary/30'>
              Peak Performance
            </span>
          </h2>
          <p className='text-xl text-muted-foreground max-w-2xl mx-auto'>
            Everything you need to transform your reading habits, packed into a
            beautiful, distraction-free interface.
          </p>
        </motion.div>

        <div className='grid md:grid-cols-3 gap-6 auto-rows-[250px]'>
          {/* Main Large Card */}
          <div className='md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-3xl bg-card border border-border/50 p-8 flex flex-col justify-between hover:shadow-2xl transition-all duration-500'>
            <div className='absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity' />
            <div>
              <div className='p-3 bg-primary/10 w-fit rounded-xl mb-6'>
                <Brain className='w-8 h-8 text-primary' />
              </div>
              <h3 className='text-3xl font-bold mb-4'>AI-Powered Coaching</h3>
              <p className='text-xl text-muted-foreground w-3/4'>
                Our adaptive algorithms analyze your reading patterns in
                real-time to generate personalized training sessions that target
                your specific weaknesses.
              </p>
            </div>
            <div className='absolute right-0 bottom-0 w-1/2 h-1/2 bg-linear-to-tl from-primary/20 to-transparent blur-3xl opacity-50 group-hover:opacity-80 transition-opacity' />
          </div>

          {/* Smaller Cards */}
          <FeatureBentoCard
            icon={<TrendingUp />}
            title='Analytics'
            description='Visualize your growth with detailed charts.'
          />
          <FeatureBentoCard
            icon={<Award />}
            title='Gamification'
            description='Earn XP and unlock achievements.'
          />
          <FeatureBentoCard
            icon={<Target />}
            title='Daily Goals'
            description='Build a streak and stay consistent.'
          />
          <FeatureBentoCard
            icon={<BookOpen />}
            title='RSVP Tech'
            description='Rapid Serial Visual Presentation technology.'
          />
        </div>
      </div>
    </section>
  )
}

function FeatureBentoCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className='bg-card border border-border/50 rounded-3xl p-8 flex flex-col justify-center hover:bg-accent/50 transition-colors group'>
      <div className='mb-4 p-3 bg-primary/10 w-fit rounded-xl text-primary group-hover:scale-110 transition-transform'>
        {icon}
      </div>
      <h3 className='text-xl font-bold mb-2'>{title}</h3>
      <p className='text-muted-foreground text-sm'>{description}</p>
    </div>
  )
}
