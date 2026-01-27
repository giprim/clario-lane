import { Timer } from 'lucide-react'
import { usePracticeStore } from '@/store'

export function ReaderProgressHeader() {
  const formatTime = usePracticeStore((state) => state.formatTime)
  const elapsedTime = usePracticeStore((state) => state.elapsedTime)
  const words = usePracticeStore((state) => state.words)
  const currentIndex = usePracticeStore((state) => state.currentIndex)

  return (
    <div className='flex items-center justify-between w-full gap-4'>
      <div>
        <div className='text-sm text-muted-foreground'>Time</div>
        <div className='font-mono text-lg md:text-2xl flex items-center gap-1'>
          <span>{formatTime(elapsedTime)}</span>
          <Timer className='w-5 h-5 md:w-6 md:h-6' />
        </div>
      </div>
      <div className='h-full w-3 bg-amber-700' />
      <div className='text-right space-y-1'>
        <div className='text-sm text-muted-foreground'>Progress</div>
        <div className='font-mono text-lg md:text-2xl font-bold tabular-nums'>
          <span className='text-primary'>{currentIndex}</span> /{' '}
          <span>{words.length}</span>
        </div>
      </div>
    </div>
  )
}
