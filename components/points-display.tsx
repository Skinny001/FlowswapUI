interface PointsDisplayProps {
  points: number
  label?: string
}

export function PointsDisplay({ points, label = "Points" }: PointsDisplayProps) {
  return (
    <div className="flex items-center gap-2 bg-accent/10 border border-accent/20 px-3 py-2 rounded-lg">
      <div className="w-2 h-2 rounded-full bg-accent" />
      <span className="text-sm font-medium">
        {points.toLocaleString()} {label}
      </span>
    </div>
  )
}
