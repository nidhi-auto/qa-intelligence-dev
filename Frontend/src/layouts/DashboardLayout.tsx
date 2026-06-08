import { Outlet, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { Sidebar, TopBar } from '@/components/layout/Sidebar'
import { DashboardDataProvider } from '@/contexts/DashboardDataContext'

const pageTitles: Record<string, string> = {
  '/dashboard': 'Portfolio Overview',
  '/dashboard/projects': 'Project Management',
  '/dashboard/defects': 'Defect Intelligence',
  '/dashboard/tests': 'Test Execution',
  '/dashboard/automation': 'Automation Health',
  '/dashboard/settings': 'Settings',
}

function resolvePageTitle(pathname: string): string {
  if (pathname.startsWith('/dashboard/settings/integrations')) return 'Integrations'
  if (pathname.startsWith('/dashboard/settings')) return 'Settings'
  return pageTitles[pathname] ?? 'Dashboard'
}

export function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation()
  const title = resolvePageTitle(location.pathname)

  return (
    <DashboardDataProvider>
    <div className="relative min-h-screen overflow-hidden bg-surface-50 dark:bg-surface-950">
      {/* Corner gradient blobs — light mode */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 h-[480px] w-[480px] -translate-y-1/4 translate-x-1/4 rounded-full bg-[radial-gradient(circle,rgba(31,166,127,0.07),transparent_70%)] dark:bg-[radial-gradient(circle,rgba(31,166,127,0.1),transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 h-[400px] w-[400px] translate-y-1/4 -translate-x-1/4 rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.06),transparent_70%)] dark:bg-[radial-gradient(circle,rgba(59,130,246,0.09),transparent_70%)]"
      />

      {/* Subtle dot-grid pattern */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(0,0,0,0.09)_1px,transparent_1px)] bg-[size:24px_24px] dark:bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)]"
      />

      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      <TopBar title={title} sidebarCollapsed={collapsed} />
      <main
        className={`relative min-h-[calc(100vh-4rem)] p-6 transition-all duration-300 ${
          collapsed ? 'ml-[72px]' : 'ml-64'
        }`}
      >
        <Outlet />
      </main>
    </div>
    </DashboardDataProvider>
  )
}
