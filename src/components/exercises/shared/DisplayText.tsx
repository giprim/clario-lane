import { useDisplaySettingsStore } from '@/store'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type DisplayTextProps = {
  children: ReactNode
  className?: string
}

export function DisplayText({ children, className = '' }: DisplayTextProps) {
  const { fontFamily, fontSize } = useDisplaySettingsStore()

  return (
    <span
      className={cn('text', className)}
      style={{
        fontFamily,
        fontSize: `${fontSize}em`,
      }}>
      {children}
    </span>
  )
}
