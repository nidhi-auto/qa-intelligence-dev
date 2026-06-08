import { cn } from '@/lib/utils'

type RateVariant = 'execution' | 'pass' | 'failure'

interface RateTrend {
  change: string
  improved: boolean
}

interface TestRateKpiCardProps {
  label: string
  value: string
  trend: RateTrend
  variant: RateVariant
}

const variantStyles: Record<
  RateVariant,
  { value: string; trendGood: string; trendBad: string }
> = {
  execution: {
    value: 'text-brand-600 dark:text-brand-400',
    trendGood: 'text-brand-600 dark:text-brand-400',
    trendBad: 'text-red-600 dark:text-red-400',
  },
  pass: {
    value: 'text-emerald-600 dark:text-emerald-400',
    trendGood: 'text-emerald-600 dark:text-emerald-400',
    trendBad: 'text-red-600 dark:text-red-400',
  },
  failure: {
    value: 'text-red-600 dark:text-red-400',
    trendGood: 'text-emerald-600 dark:text-emerald-400',
    trendBad: 'text-red-600 dark:text-red-400',
  },
}

export function TestRateKpiCard({ label, value, trend, variant }: TestRateKpiCardProps) {
  const styles = variantStyles[variant]
  const trendClass = trend.improved ? styles.trendGood : styles.trendBad

  return (
    <div
      className={cn(
        'rounded-xl border border-surface-200 bg-white p-5 text-center shadow-sm transition-shadow hover:shadow-md',
        'dark:border-surface-800 dark:bg-surface-900 dark:hover:shadow-lg dark:hover:shadow-black/20',
      )}
    >
      <p className="text-sm font-medium text-surface-500 dark:text-surface-400">{label}</p>
      <p className={cn('mt-2 font-display text-3xl font-semibold tracking-tight', styles.value)}>
        {value}
      </p>
      <p className={cn('mt-2 text-xs font-medium', trendClass)}>
        {trend.improved ? '↑' : '↓'} {trend.change}
      </p>
    </div>
  )
}
