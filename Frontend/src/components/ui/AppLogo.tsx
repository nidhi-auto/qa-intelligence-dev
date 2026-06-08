import { cn } from '@/lib/utils'

type AppLogoSize = 'xs' | 'sm' | 'md' | 'lg'

const iconSizes: Record<AppLogoSize, string> = {
  xs: 'h-4 w-4',
  sm: 'h-5 w-5',
  md: 'h-6 w-6',
  lg: 'h-8 w-8',
}

const containerSizes: Record<AppLogoSize, string> = {
  xs: 'h-7 w-7 rounded-lg',
  sm: 'h-9 w-9 rounded-lg',
  md: 'h-10 w-10 rounded-xl',
  lg: 'h-12 w-12 rounded-xl',
}

/** QA Vision portfolio mark — radar sweep monitoring multiple project signals. */
function QaVisionPortfolioMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="5.25" stroke="currentColor" strokeWidth="1.25" opacity="0.55" />
      <path
        d="M12 12V3.75A8.25 8.25 0 0 1 18.1 7.35L12 12Z"
        fill="currentColor"
        opacity="0.2"
      />
      <path
        d="M12 12L18.1 7.35"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="8.25" cy="9.25" r="1.2" fill="currentColor" />
      <circle cx="15.75" cy="8.5" r="1.2" fill="currentColor" />
      <circle cx="16.5" cy="15.25" r="1.2" fill="currentColor" />
      <circle cx="7.75" cy="14.75" r="1.2" fill="currentColor" />
      <circle cx="12" cy="12" r="1.75" fill="currentColor" />
    </svg>
  )
}

interface AppLogoProps {
  size?: AppLogoSize
  showContainer?: boolean
  className?: string
  containerClassName?: string
}

export function AppLogo({
  size = 'md',
  showContainer = true,
  className,
  containerClassName,
}: AppLogoProps) {
  if (!showContainer) {
    return (
      <QaVisionPortfolioMark
        className={cn(iconSizes[size], 'text-brand-600 dark:text-brand-400', className)}
      />
    )
  }

  return (
    <div
      className={cn(
        'flex shrink-0 items-center justify-center bg-brand-500 text-white dark:bg-brand-600',
        containerSizes[size],
        containerClassName,
      )}
    >
      <QaVisionPortfolioMark className={cn(iconSizes[size], className)} />
    </div>
  )
}
