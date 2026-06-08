import { NavLink } from 'react-router-dom'
import {
  Activity,
  AlertTriangle,
  FolderKanban,
  LayoutDashboard,
  Settings,
  Zap,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { AppLogo } from '@/components/ui/AppLogo'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { cn } from '@/lib/utils'
import { useDashboardData } from '@/contexts/DashboardDataContext'

const navItems = [
  { label: 'Overview', path: '/dashboard', icon: LayoutDashboard },
  { label: 'Projects', path: '/dashboard/projects', icon: FolderKanban },
  { label: 'Defects', path: '/dashboard/defects', icon: AlertTriangle },
  { label: 'Test Execution', path: '/dashboard/tests', icon: Activity },
  { label: 'Automation', path: '/dashboard/automation', icon: Zap },
]

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const { currentUser } = useDashboardData()
  return (
    <aside
      className={cn(
        'fixed inset-y-0 left-0 z-30 flex flex-col border-r border-surface-200 bg-white transition-all duration-300',
        'dark:border-surface-800 dark:bg-surface-900',
        collapsed ? 'w-[72px]' : 'w-64',
      )}
    >
      <div className="flex h-16 items-center gap-3 border-b border-surface-100 px-4 dark:border-surface-800">
        <AppLogo size="sm" containerClassName="bg-brand-600" />
        {!collapsed && (
          <div className="min-w-0">
            <p className="truncate font-display text-sm font-semibold text-surface-900 dark:text-white">
              QAlytics
            </p>
            <p className="truncate text-xs text-surface-400">Quality Workspace</p>
          </div>
        )}
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-3" aria-label="Main navigation">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/dashboard'}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-200 cursor-pointer',
                isActive
                  ? 'bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-300'
                  : 'text-surface-600 hover:bg-surface-50 hover:text-surface-900 dark:text-surface-400 dark:hover:bg-surface-800 dark:hover:text-white',
              )
            }
          >
            <item.icon className="h-5 w-5 shrink-0" aria-hidden="true" />
            {!collapsed && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-surface-100 p-3 dark:border-surface-800">
        <NavLink
          to="/dashboard/settings"
          className={({ isActive }) =>
            cn(
              'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-200 cursor-pointer',
              isActive
                ? 'bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-300'
                : 'text-surface-600 hover:bg-surface-50 hover:text-surface-900 dark:text-surface-400 dark:hover:bg-surface-800 dark:hover:text-white',
            )
          }
        >
          <Settings className="h-5 w-5 shrink-0" aria-hidden="true" />
          {!collapsed && <span>Settings</span>}
        </NavLink>

        {!collapsed && (
          <div className="mt-3 flex items-center gap-3 rounded-lg bg-surface-50 px-3 py-2.5 dark:bg-surface-800/60">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-100 text-xs font-semibold text-brand-700 dark:bg-brand-500/20 dark:text-brand-300">
              {currentUser.avatar}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-surface-900 dark:text-white">{currentUser.name}</p>
              <p className="truncate text-xs text-surface-400">{currentUser.role}</p>
            </div>
          </div>
        )}
      </div>

      <button
        onClick={onToggle}
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        className="absolute -right-3 top-20 flex h-6 w-6 items-center justify-center rounded-full border border-surface-200 bg-white text-surface-500 shadow-sm transition-colors hover:text-surface-900 cursor-pointer dark:border-surface-700 dark:bg-surface-900 dark:text-surface-400 dark:hover:text-white"
      >
        {collapsed ? <ChevronRight className="h-3.5 w-3.5" /> : <ChevronLeft className="h-3.5 w-3.5" />}
      </button>
    </aside>
  )
}

interface TopBarProps {
  title: string
  sidebarCollapsed: boolean
}

export function TopBar({ title, sidebarCollapsed }: TopBarProps) {
  const { currentUser } = useDashboardData()
  return (
    <header
      className={cn(
        'sticky top-0 z-20 flex h-16 items-center justify-between border-b border-surface-200 bg-white/80 px-6 backdrop-blur-md transition-all duration-300',
        'dark:border-surface-800 dark:bg-surface-950/80',
        sidebarCollapsed ? 'ml-[72px]' : 'ml-64',
      )}
    >
      <h2 className="font-display text-lg font-semibold text-surface-900 dark:text-white">{title}</h2>

      <div className="flex items-center gap-3">
        <ThemeToggle compact />

        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-100 text-xs font-semibold text-brand-700 dark:bg-brand-500/20 dark:text-brand-300">
          {currentUser.avatar}
        </div>
      </div>
    </header>
  )
}
