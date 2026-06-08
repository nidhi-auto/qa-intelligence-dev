import { NavLink, Outlet } from 'react-router-dom'
import { Link2, User } from 'lucide-react'
import { PageHeader } from '@/components/ui/PageElements'
import { cn } from '@/lib/utils'

const settingsNav = [
  { label: 'Profile', path: '/dashboard/settings', icon: User, end: true },
  { label: 'Integrations', path: '/dashboard/settings/integrations', icon: Link2, end: false },
]

export function SettingsLayout() {
  return (
    <div>
      <PageHeader
        title="Settings"
        description="Manage your profile and third-party integrations."
      />

      <div className="flex flex-col gap-8 lg:flex-row">
        <nav
          className="flex shrink-0 gap-1 overflow-x-auto rounded-xl border border-surface-200 bg-white p-1 dark:border-surface-800 dark:bg-surface-900 lg:w-52 lg:flex-col"
          aria-label="Settings sections"
        >
          {settingsNav.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium whitespace-nowrap transition-colors',
                  isActive
                    ? 'bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-300'
                    : 'text-surface-600 hover:bg-surface-50 hover:text-surface-900 dark:text-surface-400 dark:hover:bg-surface-800 dark:hover:text-white',
                )
              }
            >
              <item.icon className="h-4 w-4 shrink-0" aria-hidden="true" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="min-w-0 flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
