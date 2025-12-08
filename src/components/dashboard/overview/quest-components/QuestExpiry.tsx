import { Clock } from 'lucide-react'

type QuestExpiryProps = {
  expiresAt: string
}

export function QuestExpiry({ expiresAt }: QuestExpiryProps) {
  return (
    <div className='mt-2 text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1'>
      <Clock className='w-3 h-3' />
      <span>Expires {new Date(expiresAt).toLocaleDateString()}</span>
    </div>
  )
}
