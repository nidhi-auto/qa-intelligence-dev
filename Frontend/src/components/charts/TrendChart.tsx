import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Card } from '@/components/ui/Card'
import { useTheme } from '@/hooks/useTheme'
import type { TrendPoint } from '@/types'

interface ChartCardProps {
  title: string
  description?: string
  data: TrendPoint[]
  type?: 'line' | 'area' | 'bar'
  primaryLabel?: string
  secondaryLabel?: string
  primaryColor?: string
  secondaryColor?: string
  height?: number
}

const chartTheme = {
  light: {
    grid: '#e2e8f0',
    tick: '#64748b',
    tooltipBg: '#ffffff',
    tooltipBorder: '#e2e8f0',
  },
  dark: {
    grid: '#334155',
    tick: '#94a3b8',
    tooltipBg: '#0f172a',
    tooltipBorder: '#334155',
  },
} as const

export function TrendChart({
  title,
  description,
  data,
  type = 'line',
  primaryLabel = 'Value',
  secondaryLabel,
  primaryColor = '#1fa67f',
  secondaryColor = '#64748b',
  height = 280,
}: ChartCardProps) {
  const { theme } = useTheme()
  const colors = chartTheme[theme]
  const hasSecondary = data.some((d) => d.secondary !== undefined)

  if (data.length === 0) {
    return (
      <Card title={title} description={description}>
        <p className="py-12 text-center text-sm text-surface-500 dark:text-surface-400">
          No data for the selected date range.
        </p>
      </Card>
    )
  }

  const tooltipStyle = {
    backgroundColor: colors.tooltipBg,
    border: `1px solid ${colors.tooltipBorder}`,
    borderRadius: '8px',
    fontSize: '13px',
    color: theme === 'dark' ? '#f1f5f9' : '#0f172a',
  }

  return (
    <Card title={title} description={description}>
      <ResponsiveContainer width="100%" height={height}>
        {type === 'bar' ? (
          <BarChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />
            <XAxis dataKey="label" tick={{ fill: colors.tick, fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: colors.tick, fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={tooltipStyle} />
            <Bar dataKey="value" name={primaryLabel} fill={primaryColor} radius={[4, 4, 0, 0]} />
            {hasSecondary && secondaryLabel && (
              <Bar dataKey="secondary" name={secondaryLabel} fill={secondaryColor} radius={[4, 4, 0, 0]} />
            )}
          </BarChart>
        ) : type === 'area' ? (
          <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
            <defs>
              <linearGradient id="primaryGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={primaryColor} stopOpacity={0.2} />
                <stop offset="95%" stopColor={primaryColor} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />
            <XAxis dataKey="label" tick={{ fill: colors.tick, fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: colors.tick, fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={tooltipStyle} />
            <Area
              type="monotone"
              dataKey="value"
              name={primaryLabel}
              stroke={primaryColor}
              fill="url(#primaryGradient)"
              strokeWidth={2}
            />
          </AreaChart>
        ) : (
          <LineChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />
            <XAxis dataKey="label" tick={{ fill: colors.tick, fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: colors.tick, fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={tooltipStyle} />
            {hasSecondary && <Legend wrapperStyle={{ fontSize: '13px', color: colors.tick }} />}
            <Line
              type="monotone"
              dataKey="value"
              name={primaryLabel}
              stroke={primaryColor}
              strokeWidth={2}
              dot={{ fill: primaryColor, r: 3 }}
            />
            {hasSecondary && secondaryLabel && (
              <Line
                type="monotone"
                dataKey="secondary"
                name={secondaryLabel}
                stroke={secondaryColor}
                strokeWidth={2}
                dot={{ fill: secondaryColor, r: 3 }}
              />
            )}
          </LineChart>
        )}
      </ResponsiveContainer>
    </Card>
  )
}
