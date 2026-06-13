// components/ui/progress.tsx — barre de progression simple animée.
'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Valeur 0–100 */
  value: number
  indicatorClassName?: string
}

export function Progress({ value, className, indicatorClassName, ...props }: ProgressProps) {
  const clamped = Math.min(100, Math.max(0, value))
  return (
    <div
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn(
        'relative h-3 w-full overflow-hidden rounded-full bg-forest-100 dark:bg-forest-700/50',
        className,
      )}
      {...props}
    >
      <div
        className={cn('h-full rounded-full bg-forest-500 transition-[width] duration-700 ease-out', indicatorClassName)}
        style={{ width: `${clamped}%` }}
      />
    </div>
  )
}
