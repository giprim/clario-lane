import { Button, Card } from '@/components'
import { usePracticeStore } from '@/store'
import { BookOpen } from 'lucide-react'

export function WordChunkingReader() {
  const { setStep } = usePracticeStore()

  const handleContinue = () => {
    setStep('Quiz')
  }

  return (
    <div className='w-full mx-auto space-y-6'>
      <Card className='p-12 min-h-[60vh] flex items-center justify-center'>
        <div className='text-center space-y-6 max-w-md'>
          <div className='flex justify-center'>
            <div className='bg-primary/10 p-6 rounded-full'>
              <BookOpen className='h-12 w-12 text-primary' />
            </div>
          </div>

          <div className='space-y-2'>
            <h2 className='text-2xl font-semibold'>Word Chunking Reader</h2>
            <p className='text-muted-foreground'>
              This reading exercise is coming soon. For now, you can continue to
              the comprehension quiz to test your understanding.
            </p>
          </div>

          <Button onClick={handleContinue} size='lg' className='mt-4'>
            Continue to Quiz
          </Button>
        </div>
      </Card>
    </div>
  )
}
