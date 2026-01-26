import { SpeedReadingPending } from '../speed-reading-pending'
import { useRSVPReader, type RSVPReaderProps } from './useRSVPReader'
import {
  DisplayText,
  useSyncDisplaySettings,
  ReaderControls,
} from '../../shared'
import { usePracticeStore } from '@/store'
import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Maximize2, Minimize2 } from 'lucide-react'
import { Button } from '@/components'
import { cn } from '@/lib/utils'

export function RSVPReader({ onPause }: RSVPReaderProps) {
  useSyncDisplaySettings()
  useRSVPReader({ onPause })
  const [isMaximized, setIsMaximized] = useState(false)

  const loading = usePracticeStore((state) => state.loading)
  const words = usePracticeStore((state) => state.words)
  const currentIndex = usePracticeStore((state) => state.currentIndex)
  const formatTime = usePracticeStore((state) => state.formatTime)
  const elapsedTime = usePracticeStore((state) => state.elapsedTime)

  // Handle ESC key to exit full screen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMaximized(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  if (loading) {
    return <SpeedReadingPending />
  }

  const toggleMaximize = () => setIsMaximized(!isMaximized)

  return (
    <div className='relative w-full mx-auto'>
      <AnimatePresence mode='wait'>
        <motion.div
          layoutId='rsvp-container'
          className={cn(
            'transition-all duration-500 ease-in-out',
            isMaximized
              ? 'fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/95 backdrop-blur-xl p-4 md:p-8'
              : 'relative w-full space-y-6',
          )}>
          {/* Main Display Card */}
          <motion.div
            layout='position'
            className={cn(
              'relative overflow-hidden group',
              isMaximized
                ? 'w-full max-w-5xl h-[70vh] rounded-3xl border border-border/50 bg-card/30 shadow-2xl backdrop-blur-md'
                : 'w-full bg-card border border-border rounded-2xl h-[45svh] min-h-[300px] shadow-sm',
            )}>
            {/* Subtle Gradient Background */}
            <div className='absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-primary/5 opacity-50 pointer-events-none' />

            {/* Maximize Toggle Button */}
            <div className='absolute top-4 hidden right-4 z-20'>
              <Button
                variant='ghost'
                size='icon'
                onClick={toggleMaximize}
                className='hover:bg-primary/10 hover:text-primary transition-colors rounded-full'>
                {isMaximized ? (
                  <Minimize2 className='w-5 h-5' />
                ) : (
                  <Maximize2 className='w-5 h-5' />
                )}
              </Button>
            </div>

            {/* Word Display Area */}
            <div className='absolute inset-0 flex items-center justify-center p-8'>
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0.8, scale: 0.98, filter: 'blur(4px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                transition={{ duration: 0.1 }}
                className='text-center w-full max-w-4xl'>
                {words.length > 0 && currentIndex < words.length ? (
                  <DisplayText>{words[currentIndex]}</DisplayText>
                ) : words.length > 0 ? (
                  <DisplayText className='text-muted-foreground font-light'>
                    Complete!
                  </DisplayText>
                ) : (
                  <DisplayText className='text-muted-foreground font-light'>
                    Loading...
                  </DisplayText>
                )}
              </motion.div>
            </div>
          </motion.div>

          {/* Controls Section */}
          <motion.div
            layout='position'
            className={cn('w-full', isMaximized ? 'max-w-3xl mt-8' : 'mt-6')}>
            {/* Progress Bar */}
            <div className='w-full bg-secondary/50 rounded-full h-1.5 mb-6 overflow-hidden'>
              <motion.div
                className='bg-primary h-full rounded-full'
                initial={{ width: 0 }}
                animate={{ width: `${(currentIndex / words.length) * 100}%` }}
                transition={{ duration: 0.2 }}
              />
            </div>

            {/* Controls */}
            <div
              className={cn(
                'rounded-2xl border border-border/50 p-4 backdrop-blur-sm transition-colors',
                isMaximized ? 'bg-card/40 shadow-lg' : 'bg-card/50',
              )}>
              <ReaderControls
                canComplete={currentIndex >= words.length}
                canReset={currentIndex > 0}>
                <div className='hidden md:block w-px h-8 bg-border/50 mx-4' />

                <div className='flex items-center gap-6 text-sm tabular-nums'>
                  <div className='flex flex-col items-end'>
                    <span className='text-xs text-muted-foreground uppercase tracking-wider font-medium'>
                      Time
                    </span>
                    <span className='font-semibold'>
                      {formatTime(elapsedTime)}
                    </span>
                  </div>
                  <div className='flex flex-col items-end'>
                    <span className='text-xs text-muted-foreground uppercase tracking-wider font-medium'>
                      Progress
                    </span>
                    <span className='font-semibold'>
                      {currentIndex}{' '}
                      <span className='text-muted-foreground'>/</span>{' '}
                      {words.length}
                    </span>
                  </div>
                </div>
              </ReaderControls>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Overlay to dim background when maximized */}
      {isMaximized && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='fixed inset-0 bg-background/80 backdrop-blur-xs z-40'
          onClick={() => setIsMaximized(false)}
        />
      )}
    </div>
  )
}
