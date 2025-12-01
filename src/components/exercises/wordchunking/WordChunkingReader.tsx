import { SpeedReadingPending } from '../speedreading/speed-reading-pending'
import { useWordChunkingReader } from './useWordChunkingReader'
import { useSyncDisplaySettings, ReaderControls } from '../shared'
import { WordChunkDisplay } from './WordChunkDisplay'
import { ChunkSizeSlider } from './ChunkSizeSlider'
import { usePracticeStore } from '@/store'

export function WordChunkingReader() {
  useSyncDisplaySettings()
  useWordChunkingReader({})

  const loading = usePracticeStore((state) => state.loading)
  const formatTime = usePracticeStore((state) => state.formatTime)
  const elapsedTime = usePracticeStore((state) => state.elapsedTime)
  const words = usePracticeStore((state) => state.words)
  const currentIndex = usePracticeStore((state) => state.currentIndex)

  if (loading) {
    return <SpeedReadingPending />
  }

  return (
    <div className='w-full mx-auto space-y-6'>
      {/* Word Display */}
      <WordChunkDisplay />

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

      {/* Chunk Size Slider */}
      <ChunkSizeSlider />
    </div>
  )
}
