import { useMemo } from 'react'
import type { CSSProperties } from 'react'
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { Card } from '@/components/ui/Card'
import { useTheme } from '@/hooks/useTheme'
import { cn, formatPercent } from '@/lib/utils'

export interface PieSlice {
  name: string
  value: number
  color?: string
}

interface PieChartCardProps {
  title: string
  description?: string
  data: PieSlice[]
  className?: string
}

const PIE_OUTER_RADIUS = 72
const PIE_AREA_HEIGHT = 180
const LEGEND_MIN_HEIGHT = 96

const DEFAULT_COLORS = ['#1fa67f', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#64748b']

const chartTheme = {
  light: {
    tick: '#64748b',
    tooltipBg: '#ffffff',
    tooltipBorder: '#e2e8f0',
  },
  dark: {
    tick: '#94a3b8',
    tooltipBg: '#0f172a',
    tooltipBorder: '#334155',
  },
} as const

function computeSlicePercent(value: number, total: number): number {
  if (total <= 0) return 0
  return Math.round((value / total) * 1000) / 10
}

function PieTooltipContent({
  active,
  payload,
  total,
  tooltipStyle,
}: {
  active?: boolean
  payload?: Array<{ name?: string | number; value?: string | number }>
  total: number
  tooltipStyle: CSSProperties
}) {
  if (!active || !payload?.length) return null

  const entry = payload[0]
  const name = String(entry.name ?? '')
  const value = Number(entry.value ?? 0)
  const percent = computeSlicePercent(value, total)

  return (
    <div className="rounded-lg px-3 py-2 shadow-sm" style={tooltipStyle}>
      <p className="text-sm font-medium leading-tight">{name}</p>
      <p className="mt-0.5 text-sm tabular-nums opacity-80">{formatPercent(percent)}</p>
    </div>
  )
}

function PieLegend({
  slices,
  chartId,
  labelColor,
}: {
  slices: PieSlice[]
  chartId: string
  labelColor: string
}) {
  return (
    <ul
      className="flex flex-wrap items-start justify-center gap-x-4 gap-y-2 px-1"
      style={{ minHeight: LEGEND_MIN_HEIGHT }}
      aria-label="Chart legend"
    >
      {slices.map((entry, index) => (
        <li
          key={`${chartId}-legend-${entry.name}`}
          className="flex max-w-full items-center gap-1.5 text-xs"
          style={{ color: labelColor }}
        >
          <span
            className="h-2 w-2 shrink-0 rounded-full"
            style={{
              backgroundColor: entry.color ?? DEFAULT_COLORS[index % DEFAULT_COLORS.length],
            }}
            aria-hidden="true"
          />
          <span>{entry.name}</span>
        </li>
      ))}
    </ul>
  )
}

export function PieChartCard({ title, description, data, className }: PieChartCardProps) {
  const { theme } = useTheme()
  const colors = chartTheme[theme]
  const chartId = title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
  const slices = data.filter((d) => d.value > 0)
  const sliceTotal = useMemo(
    () => slices.reduce((sum, slice) => sum + slice.value, 0),
    [slices],
  )

  const tooltipStyle = {
    backgroundColor: colors.tooltipBg,
    border: `1px solid ${colors.tooltipBorder}`,
    borderRadius: '8px',
    fontSize: '13px',
    color: theme === 'dark' ? '#f1f5f9' : '#0f172a',
  }

  if (slices.length === 0) {
    return (
      <Card title={title} description={description} className={cn('h-full', className)}>
        <p
          className="text-center text-sm text-surface-500 dark:text-surface-400"
          style={{ minHeight: PIE_AREA_HEIGHT + LEGEND_MIN_HEIGHT }}
        >
          No data available
        </p>
      </Card>
    )
  }

  return (
    <Card title={title} description={description} className={cn('h-full', className)}>
      <div className="flex flex-col">
        <div className="shrink-0" style={{ height: PIE_AREA_HEIGHT }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={slices}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={PIE_OUTER_RADIUS}
                innerRadius={0}
                paddingAngle={slices.length > 1 ? 2 : 0}
                stroke={theme === 'dark' ? '#0f172a' : '#ffffff'}
                strokeWidth={2}
              >
                {slices.map((entry, index) => (
                  <Cell
                    key={`${chartId}-${entry.name}`}
                    fill={entry.color ?? DEFAULT_COLORS[index % DEFAULT_COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                content={(tooltipProps) => (
                  <PieTooltipContent
                    active={tooltipProps.active}
                    payload={tooltipProps.payload as Array<{ name?: string; value?: number }>}
                    total={sliceTotal}
                    tooltipStyle={tooltipStyle}
                  />
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <PieLegend slices={slices} chartId={chartId} labelColor={colors.tick} />
      </div>
    </Card>
  )
}
