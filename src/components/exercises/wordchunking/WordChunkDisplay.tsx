import { usePracticeStore } from '@/store'
import { DisplayText } from '../shared'

export function WordChunkDisplay() {
  const words = usePracticeStore((state) => state.words)
  const currentIndex = usePracticeStore((state) => state.currentIndex)
  const chunkSize = usePracticeStore((state) => state.chunkSize)

  // Get the current chunk of words to display
  const chunkStart = currentIndex
  const chunkEnd = Math.min(words.length, currentIndex + chunkSize)
  const currentChunk = words.slice(chunkStart, chunkEnd)

  // Calculate middle position(s) for highlighting
  const middleIndex = Math.floor(currentChunk.length / 2)

  if (words.length === 0) {
    return (
      <div className='bg-card border border-border rounded-lg p-12 min-h-[240px] h-[45svh] flex items-center justify-center'>
        <DisplayText className='text-muted-foreground'>Loading...</DisplayText>
      </div>
    )
  }

  if (currentIndex >= words.length) {
    return (
      <div className='bg-card border border-border rounded-lg p-12 min-h-[240px] h-[45svh] flex items-center justify-center'>
        <DisplayText className='text-muted-foreground'>Complete!</DisplayText>
      </div>
    )
  }

  return (
    <div className='bg-card border border-border rounded-lg p-12 min-h-[240px] h-[45svh] flex items-center justify-center'>
      <div className='flex items-center gap-4 flex-wrap justify-center max-w-4xl'>
        {currentChunk.map((word, index) => (
          <DisplayText
            key={chunkStart + index}
            className={
              index === middleIndex
                ? 'text-primary font-semibold text-4xl transition-all'
                : 'text-foreground text-2xl transition-all'
            }>
            {word}
          </DisplayText>
        ))}
      </div>
    </div>
  )
}
