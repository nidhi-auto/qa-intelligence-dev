import { cn } from '@/lib/utils'

interface IntegrationLogoProps {
  label: string
  color: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizeClasses = {
  sm: 'h-9 w-9 text-xs',
  md: 'h-11 w-11 text-sm',
  lg: 'h-14 w-14 text-base',
}

export function IntegrationLogo({ label, color, size = 'md', className }: IntegrationLogoProps) {
  return (
    <div
      className={cn(
        'flex shrink-0 items-center justify-center rounded-xl font-semibold text-white shadow-sm',
        sizeClasses[size],
        className,
      )}
      style={{ backgroundColor: color }}
      aria-hidden="true"
    >
      {label}
    </div>
  )
}
