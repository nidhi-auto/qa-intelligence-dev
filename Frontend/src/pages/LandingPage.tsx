import { Link } from 'react-router-dom'
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Shield,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react'
import { AppLogo } from '@/components/ui/AppLogo'
import { Button } from '@/components/ui/Button'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { useAsyncResource } from '@/hooks/useAsyncResource'
import { fetchPortfolioSummary } from '@/api/resources'
import { portfolioSummary as mockPortfolioSummary } from '@/data/mockData'

export function LandingPage() {
  const { data: portfolioSummary } = useAsyncResource(fetchPortfolioSummary, [])
  const summary = portfolioSummary ?? mockPortfolioSummary

  return <LandingPageContent portfolioSummary={summary} />
}

function LandingPageContent({
  portfolioSummary,
}: {
  portfolioSummary: typeof mockPortfolioSummary
}) {
const features = [
  {
    icon: BarChart3,
    title: 'Portfolio visibility',
    description: 'Track quality health across every project from a unified command center.',
  },
  {
    icon: TrendingUp,
    title: 'Defect intelligence',
    description: 'Monitor trends, closure rates, and leakage to catch issues before they escalate.',
  },
  {
    icon: Zap,
    title: 'Automation insights',
    description: 'Measure coverage, stability, and flaky test patterns across your suites.',
  },
  {
    icon: CheckCircle2,
    title: 'Test execution tracking',
    description: 'Monitor pass rates, blocked tests, and execution coverage across suites.',
  },
  {
    icon: Users,
    title: 'Team accountability',
    description: 'Align QA leads, engineering managers, and leadership on shared metrics.',
  },
  {
    icon: Shield,
    title: 'Portfolio governance',
    description: 'Centralized project health, risk signals, and quality score tracking for every team.',
  },
]

const stats = [
  { value: `${portfolioSummary.totalProjects}+`, label: 'Projects tracked' },
  { value: `${portfolioSummary.avgQualityScore}%`, label: 'Avg quality score' },
  { value: `${portfolioSummary.portfolioPassRate}%`, label: 'Portfolio pass rate' },
  { value: '70%', label: 'Less manual reporting' },
]

  return (
    <div className="min-h-screen bg-surface-50 text-surface-900 dark:bg-surface-950 dark:text-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <div className="flex items-center gap-3">
          <AppLogo size="md" />
          <span className="font-display text-lg font-semibold">QAlytics</span>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            to="/sign-in"
            className="rounded-lg px-4 py-2 text-sm font-medium text-surface-600 transition-colors hover:text-surface-900 dark:text-surface-300 dark:hover:text-white"
          >
            Sign in
          </Link>
          <Link to="/sign-in">
            <Button size="sm">Get started</Button>
          </Link>
        </div>
      </nav>

      <section className="relative overflow-hidden px-6 pb-24 pt-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-100 via-surface-50 to-surface-50 dark:from-brand-900/40 dark:via-surface-950 dark:to-surface-950" />
        <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-brand-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-4xl text-center">
          <p className="mb-4 inline-flex items-center rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-1.5 text-sm font-medium text-brand-700 dark:text-brand-300">
            Centralized quality intelligence for modern teams
          </p>
          <h1 className="font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            One platform for{' '}
            <span className="bg-gradient-to-r from-brand-500 to-brand-700 bg-clip-text text-transparent dark:from-brand-300 dark:to-brand-500">
              quality visibility
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-surface-600 dark:text-surface-400">
            Consolidate project health, defect trends, test execution, automation status, and release
            readiness — so your team can make confident decisions faster.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link to="/sign-in">
              <Button size="lg" className="min-w-[180px]">
                Open your workspace
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </Link>
            <Link to="/sign-in">
              <Button variant="outline" size="lg" className="min-w-[180px] dark:border-surface-700 dark:text-white">
                Request a tour
              </Button>
            </Link>
          </div>
        </div>

        <div className="relative mx-auto mt-20 grid max-w-5xl grid-cols-2 gap-6 sm:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-surface-200 bg-white/80 p-5 text-center backdrop-blur-sm dark:border-surface-800 dark:bg-surface-900/50"
            >
              <p className="font-display text-2xl font-bold text-brand-600 dark:text-brand-400">{stat.value}</p>
              <p className="mt-1 text-xs text-surface-500 dark:text-surface-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-surface-200 bg-white/70 px-6 py-24 dark:border-surface-800 dark:bg-surface-900/50">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="font-display text-3xl font-bold">Everything your QA organization needs</h2>
            <p className="mx-auto mt-4 max-w-2xl text-surface-600 dark:text-surface-400">
              From daily standups to executive reviews — give every stakeholder the insights they need.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group cursor-default rounded-xl border border-surface-200 bg-white p-6 transition-colors hover:border-brand-500/30 hover:bg-surface-50 dark:border-surface-800 dark:bg-surface-900 dark:hover:border-brand-500/30 dark:hover:bg-surface-800/50"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-brand-500/10 text-brand-600 transition-colors group-hover:bg-brand-500/20 dark:text-brand-400">
                  <feature.icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="font-display text-lg font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-surface-600 dark:text-surface-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-3xl rounded-2xl border border-brand-500/20 bg-gradient-to-br from-brand-50 to-white p-10 text-center sm:p-14 dark:from-brand-950 dark:to-surface-900">
          <h2 className="font-display text-3xl font-bold">Ready to unify your quality data?</h2>
          <p className="mt-4 text-surface-600 dark:text-surface-400">
            Join QA teams who have transformed fragmented reporting into real-time portfolio intelligence.
          </p>
          <Link to="/sign-in" className="mt-8 inline-block">
            <Button size="lg">
              Sign in to your workspace
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </Link>
        </div>
      </section>

      <footer className="border-t border-surface-200 px-6 py-8 dark:border-surface-800">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2 text-sm text-surface-500">
            <AppLogo size="xs" showContainer={false} />
            QAlytics
          </div>
          <p className="text-sm text-surface-500">&copy; 2026 QAlytics. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
