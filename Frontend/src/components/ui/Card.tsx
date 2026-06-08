import { cn } from '@/lib/utils'
import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

interface MetricCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon: LucideIcon
  trend?: { value: string; positive: boolean }
  className?: string
}

export function MetricCard({ title, value, subtitle, icon: Icon, trend, className }: MetricCardProps) {
  return (
    <div
      className={cn(
        'rounded-xl border border-surface-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md',
        'dark:border-surface-800 dark:bg-surface-900 dark:hover:shadow-lg dark:hover:shadow-black/20',
        className,
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-surface-500 dark:text-surface-400">{title}</p>
          <p className="font-display text-2xl font-semibold tracking-tight text-surface-900 dark:text-white">{value}</p>
          {subtitle && <p className="text-xs text-surface-400">{subtitle}</p>}
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
      </div>
      {trend && (
        <p
          className={cn(
            'mt-3 text-xs font-medium',
            trend.positive ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400',
          )}
        >
          {trend.positive ? '↑' : '↓'} {trend.value}
        </p>
      )}
    </div>
  )
}

interface CardProps {
  title?: string
  description?: string
  action?: ReactNode
  children: ReactNode
  className?: string
}

export function Card({ title, description, action, children, className }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-xl border border-surface-200 bg-white shadow-sm dark:border-surface-800 dark:bg-surface-900',
        className,
      )}
    >
      {(title || action) && (
        <div className="flex items-start justify-between border-b border-surface-100 px-5 py-4 dark:border-surface-800">
          <div>
            {title && (
              <h3 className="font-display text-base font-semibold text-surface-900 dark:text-white">{title}</h3>
            )}
            {description && <p className="mt-0.5 text-sm text-surface-500 dark:text-surface-400">{description}</p>}
          </div>
          {action}
        </div>
      )}
      <div className="p-5">{children}</div>
    </div>
  )
}
