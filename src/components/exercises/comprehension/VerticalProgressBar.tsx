import { usePracticeStore } from '@/store'

export function VerticalProgressBar() {
  const progress = usePracticeStore((state) => state.progress)

  return (
    <div className='h-full py-4 flex flex-col items-center gap-2'>
      <div className='flex-1 bg-secondary rounded-full w-2 relative'>
        <div
          className='absolute top-0 left-0 w-full bg-primary rounded-full transition-all duration-200'
          style={{ height: `${progress}%` }}
        />
      </div>
      <span className='text-xs text-muted-foreground font-mono'>
        {Math.round(progress)}%
      </span>
    </div>
  )
}
