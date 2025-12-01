import { Play, Pause, RotateCcw } from 'lucide-react'
import { Button, Slider } from '@/components'
import { DisplaySettings } from './DisplaySettings'
import { usePracticeStore } from '@/store'
import type { ReactNode } from 'react'

type ReaderControlsProps = {
  children?: ReactNode
  canComplete?: boolean
  canReset?: boolean
}

export function ReaderControls({
  children,
  canComplete,
  canReset,
}: ReaderControlsProps) {
  const {
    isPlaying,
    progress,
    wpm,
    setWpm,
    handlePlayPause,
    handleReset,
    handleComplete,
  } = usePracticeStore()

  const shouldShowComplete = canComplete ?? progress >= 100
  const shouldAllowReset = canReset ?? progress > 0

  return (
    <div className='space-y-6'>
      {/* Controls */}
      <div className='flex items-center flex-wrap gap-4 bg-card border border-border p-4 rounded-lg'>
        <Button
          onClick={handlePlayPause}
          disabled={progress >= 100 && !isPlaying}
          size='lg'>
          {isPlaying ? (
            <>
              <Pause className='mr-2 h-4 w-4' />
              Pause
            </>
          ) : (
            <>
              <Play className='mr-2 h-4 w-4' />
              {progress > 0 && progress < 100 ? 'Resume' : 'Start'}
            </>
          )}
        </Button>

        <Button
          onClick={handleReset}
          variant='outline'
          size='lg'
          disabled={!shouldAllowReset}>
          <RotateCcw className='mr-2 h-4 w-4' />
          Reset
        </Button>

        <div className='flex-1' />

        {shouldShowComplete && (
          <Button onClick={handleComplete} variant='default' size='lg'>
            Continue to Quiz
          </Button>
        )}

        {!shouldShowComplete && <div className='flex-1' />}

        {children}
      </div>

      {/* WPM Slider */}
      <div className='space-y-2 bg-card border border-border p-4 rounded-lg'>
        <div className='flex justify-between items-center'>
          <label className='text-sm font-medium'>Reading Speed</label>
          <div className='flex items-center gap-2'>
            <span className='text-sm tabular-nums'>{wpm} WPM</span>
            <DisplaySettings />
          </div>
        </div>
        <Slider
          value={[wpm]}
          onValueChange={(value) => setWpm(value[0])}
          min={100}
          max={1000}
          step={10}
          disabled={isPlaying}
          className='w-full'
        />
        <div className='flex justify-between text-xs text-muted-foreground'>
          <span>100 WPM</span>
          <span>1000 WPM</span>
        </div>
      </div>
    </div>
  )
}
