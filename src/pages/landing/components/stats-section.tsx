export function StatsSection() {
  return (
    <section className='py-20'>
      <div className='container mx-auto px-4'>
        <div className='rounded-3xl bg-primary text-primary-foreground p-12 md:p-20 relative overflow-hidden'>
          <div className='absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.1)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.1)_50%,rgba(255,255,255,0.1)_75%,transparent_75%,transparent)] bg-size-[64px_64px] opacity-10' />
          <div className='relative z-10 grid md:grid-cols-3 gap-12 text-center'>
            <StatsItem number='3X' label='Faster Reading Speed' />
            <StatsItem number='85%' label='Better Retention' />
            <StatsItem number='20M+' label='Words Read' />
          </div>
        </div>
      </div>
    </section>
  )
}

function StatsItem({ number, label }: { number: string; label: string }) {
  return (
    <div>
      <div className='text-6xl md:text-7xl font-bold mb-4 tracking-tighter'>
        {number}
      </div>
      <div className='text-lg opacity-80 font-medium uppercase tracking-widest'>
        {label}
      </div>
    </div>
  )
}
