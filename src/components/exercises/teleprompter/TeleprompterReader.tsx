import { SpeedReadingPending } from '../speedreading/speed-reading-pending'
import { useTeleprompterReader } from './useTeleprompterReader'
import { useSyncDisplaySettings, ReaderControls } from '../shared'
import { VerticalProgressBar } from './VerticalProgressBar'
import { ScrollingTextDisplay } from './ScrollingTextDisplay'
import { usePracticeStore } from '@/store'

export function TeleprompterReader() {
  useSyncDisplaySettings()
  useTeleprompterReader({})

  const loading = usePracticeStore((state) => state.loading)
  const formatTime = usePracticeStore((state) => state.formatTime)
  const elapsedTime = usePracticeStore((state) => state.elapsedTime)
  const estimatedDuration = usePracticeStore((state) => state.estimatedDuration)

  if (loading) {
    return <SpeedReadingPending />
  }

  return (
    <div className='w-full mx-auto space-y-6'>
      <div className='flex gap-6 h-[60vh]'>
        <VerticalProgressBar />
        <ScrollingTextDisplay />
      </div>

      <ReaderControls>
        <div className='text-right space-y-1 min-w-[100px]'>
          <div className='text-sm text-muted-foreground'>Time</div>
          <div className='text-2xl tabular-nums'>
            {formatTime(elapsedTime)} / {formatTime(estimatedDuration)}
          </div>
        </div>
      </ReaderControls>
    </div>
  )
}
