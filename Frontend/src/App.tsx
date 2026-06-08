import { Routes, Route, Navigate } from 'react-router-dom'
import { DashboardLayout } from '@/layouts/DashboardLayout'
import { LandingPage } from '@/pages/LandingPage'
import { SignInPage } from '@/pages/SignInPage'
import { OverviewPage } from '@/pages/dashboard/OverviewPage'
import { ProjectsPage } from '@/pages/dashboard/ProjectsPage'
import { DefectsPage } from '@/pages/dashboard/DefectsPage'
import { TestsPage } from '@/pages/dashboard/TestsPage'
import { AutomationPage } from '@/pages/dashboard/AutomationPage'
import { SettingsPage } from '@/pages/dashboard/SettingsPage'
import { SettingsGeneralPage } from '@/pages/dashboard/settings/SettingsGeneralPage'
import { IntegrationsPage } from '@/pages/dashboard/settings/IntegrationsPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/sign-in" element={<SignInPage />} />
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<OverviewPage />} />
        <Route path="projects" element={<ProjectsPage />} />
        <Route path="defects" element={<DefectsPage />} />
        <Route path="tests" element={<TestsPage />} />
        <Route path="automation" element={<AutomationPage />} />
        <Route path="settings" element={<SettingsPage />}>
          <Route index element={<SettingsGeneralPage />} />
          <Route path="integrations" element={<IntegrationsPage />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
