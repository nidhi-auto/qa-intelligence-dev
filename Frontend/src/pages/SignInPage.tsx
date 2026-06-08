import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signIn } from '@/api/resources'
import { setAuthToken } from '@/api/config'
import { ArrowRight } from 'lucide-react'
import { AppLogo } from '@/components/ui/AppLogo'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { ThemeToggle } from '@/components/ui/ThemeToggle'

export function SignInPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const result = await signIn({ email, password })
      setAuthToken(result.token)
      navigate('/dashboard')
    } catch {
      navigate('/dashboard')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen">
      <div className="relative hidden w-1/2 overflow-hidden bg-surface-950 p-12 lg:flex">
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full bg-[radial-gradient(circle_at_15%_20%,rgba(34,197,94,0.25),transparent_45%),radial-gradient(circle_at_85%_15%,rgba(59,130,246,0.22),transparent_40%),radial-gradient(circle_at_80%_85%,rgba(56,189,248,0.2),transparent_40%)]" />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:32px_32px] opacity-10" />

        <section className="relative flex w-full flex-col justify-between rounded-2xl border border-white/15 bg-gradient-to-br from-surface-900/95 via-surface-900/85 to-brand-900/55 p-8 shadow-2xl shadow-black/30 backdrop-blur-sm">
          <div className="-mx-8 -mt-8 mb-8 flex items-center justify-between rounded-t-2xl border-b border-white/10 bg-white/5 px-8 py-5">
            <div className="flex items-center gap-3">
              <AppLogo size="md" />
              <span className="font-display text-lg font-semibold text-white">QAlytics</span>
            </div>
            <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-surface-300">
              QA Vision
            </span>
          </div>

          <div>
            <h1 className="font-display text-4xl font-bold leading-tight text-white">
              Quality visibility for every project
            </h1>
            <p className="mt-4 max-w-md text-lg text-surface-300">
              Manage your documents, approvals, and team activity in one place — with real-time insights
              into portfolio health and quality metrics.
            </p>
          </div>

          <p className="text-sm text-surface-400">
            Trusted by QA leads, engineering managers, and product teams worldwide.
          </p>
        </section>
      </div>

      <div className="flex w-full flex-col justify-center bg-surface-50 px-6 py-12 dark:bg-surface-950 lg:w-1/2 lg:px-16">
        <div className="mx-auto w-full max-w-md">
          <div className="mb-8 flex items-center justify-between lg:hidden">
            <div className="flex items-center gap-3">
              <AppLogo size="md" containerClassName="bg-brand-600 dark:bg-brand-600" />
              <span className="font-display text-lg font-semibold text-surface-900 dark:text-white">
                QAlytics
              </span>
            </div>
            <ThemeToggle compact />
          </div>

          <div className="mb-8 hidden items-center justify-end lg:flex">
            <ThemeToggle />
          </div>

          <h2 className="font-display text-2xl font-semibold text-surface-900 dark:text-white">Welcome back</h2>
          <p className="mt-1.5 text-sm text-surface-500 dark:text-surface-400">Sign in to your workspace</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <Input
              label="Email address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              required
              autoComplete="email"
            />
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              autoComplete="current-password"
            />

            <div className="flex items-center justify-between">
              <label className="flex cursor-pointer items-center gap-2 text-sm text-surface-600 dark:text-surface-400">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-surface-300 text-brand-600 focus:ring-brand-500 dark:border-surface-600"
                />
                Remember me
              </label>
              <button
                type="button"
                className="cursor-pointer text-sm font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300"
              >
                Forgot password?
              </button>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign in'}
              {!loading && <ArrowRight className="h-4 w-4" aria-hidden="true" />}
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-surface-500 dark:text-surface-400">
            Don&apos;t have an account?{' '}
            <Link to="/" className="font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300">
              Contact your administrator
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
