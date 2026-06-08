import { cn, getProgressColor } from '@/lib/utils'

interface ProgressBarProps {
  value: number
  label?: string
  showValue?: boolean
  className?: string
}

export function ProgressBar({ value, label, showValue = true, className }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value))

  return (
    <div className={cn('space-y-1.5', className)}>
      {(label || showValue) && (
        <div className="flex items-center justify-between text-sm">
          {label && <span className="text-surface-600 dark:text-surface-400">{label}</span>}
          {showValue && <span className="font-medium text-surface-900 dark:text-white">{clamped}%</span>}
        </div>
      )}
      <div className="h-2 w-full overflow-hidden rounded-full bg-surface-100 dark:bg-surface-800">
        <div
          className={cn('h-full rounded-full transition-all duration-500', getProgressColor(clamped))}
          style={{ width: `${clamped}%` }}
          role="progressbar"
          aria-valuenow={clamped}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  )
}
