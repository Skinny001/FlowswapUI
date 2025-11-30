import type React from "react"
interface StatsCardProps {
  label: string
  value: string | number
  subtitle?: string
  icon?: React.ReactNode
}

export function StatsCard({ label, value, subtitle, icon }: StatsCardProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground mb-2">{label}</p>
          <p className="text-3xl font-bold">{value}</p>
          {subtitle && <p className="text-xs text-muted-foreground mt-2">{subtitle}</p>}
        </div>
        {icon && <div className="text-accent">{icon}</div>}
      </div>
    </div>
  )
}
