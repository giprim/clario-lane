type CustomProgressProps = {
  currentIndex: number
  words: string[]
}

export function CustomProgress({ currentIndex, words }: CustomProgressProps) {
  return (
    <div className='w-full bg-secondary rounded-full h-3'>
      <div
        className='bg-linear-to-r from-primary to-primary/50 h-3 rounded-full transition-all duration-200'
        style={{ width: `${(currentIndex / words.length) * 100}%` }}
      />
    </div>
  )
}
