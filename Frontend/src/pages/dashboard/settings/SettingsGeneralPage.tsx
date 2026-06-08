import { User } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { useDashboardData } from '@/contexts/DashboardDataContext'

export function SettingsGeneralPage() {
  const { currentUser } = useDashboardData()
  return (
    <div className="space-y-6">
      <Card title="Profile" description="Your personal information">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-100 text-lg font-semibold text-brand-700 dark:bg-brand-500/20 dark:text-brand-300">
              {currentUser.avatar}
            </div>
            <div>
              <p className="font-medium text-surface-900 dark:text-white">{currentUser.name}</p>
              <p className="text-sm text-surface-500 dark:text-surface-400">{currentUser.role}</p>
            </div>
          </div>
          <Input label="Full name" defaultValue={currentUser.name} />
          <Input label="Email address" type="email" defaultValue={currentUser.email} />
          <Input label="Role" defaultValue={currentUser.role} disabled />
          <Button size="sm">
            <User className="h-4 w-4" aria-hidden="true" />
            Save profile
          </Button>
        </div>
      </Card>
    </div>
  )
}
