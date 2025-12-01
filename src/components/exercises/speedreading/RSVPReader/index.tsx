import { SpeedReadingPending } from '../speed-reading-pending'
import { useRSVPReader, type RSVPReaderProps } from './useRSVPReader'
import {
  DisplayText,
  useSyncDisplaySettings,
  ReaderControls,
} from '../../shared'
import { usePracticeStore } from '@/store'

export function RSVPReader({ onPause }: RSVPReaderProps) {
  useSyncDisplaySettings()
  useRSVPReader({ onPause })

  const loading = usePracticeStore((state) => state.loading)
  const words = usePracticeStore((state) => state.words)
  const currentIndex = usePracticeStore((state) => state.currentIndex)
  const formatTime = usePracticeStore((state) => state.formatTime)
  const elapsedTime = usePracticeStore((state) => state.elapsedTime)

  if (loading) {
    return <SpeedReadingPending />
  }

  return (
    <div className='w-full mx-auto space-y-6'>
      {/* Word Display */}
      <div className='bg-card border border-border rounded-lg p-12 min-h-[240px] h-[45svh] flex items-center justify-center'>
        <div className='text-center'>
          {words.length > 0 && currentIndex < words.length ? (
            <DisplayText>{words[currentIndex]}</DisplayText>
          ) : words.length > 0 ? (
            <DisplayText className='text-muted-foreground'>
              Complete!
            </DisplayText>
          ) : (
            <DisplayText className='text-muted-foreground'>
              Loading...
            </DisplayText>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className='w-full bg-secondary rounded-full h-2'>
        <div
          className='bg-primary h-2 rounded-full transition-all duration-200'
          style={{ width: `${(currentIndex / words.length) * 100}%` }}
        />
      </div>

      <ReaderControls
        canComplete={currentIndex >= words.length}
        canReset={currentIndex > 0}>
        <div className='text-right space-y-1'>
          <div className='text-sm text-muted-foreground'>Time</div>
          <div className='text-2xl tabular-nums'>{formatTime(elapsedTime)}</div>
        </div>

        <div className='text-right space-y-1'>
          <div className='text-sm text-muted-foreground'>Progress</div>
          <div className='text-2xl tabular-nums'>
            {currentIndex} / {words.length}
          </div>
        </div>
      </ReaderControls>
    </div>
  )
}
