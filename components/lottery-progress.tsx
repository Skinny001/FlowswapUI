interface LotteryProgressProps {
  current: number
  target: number
  currency: string
}

export function LotteryProgress({ current, target, currency }: LotteryProgressProps) {
  const percentage = (current / target) * 100

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium">Progress to Trigger</span>
        <span className="text-sm text-accent">{percentage.toFixed(0)}%</span>
      </div>
      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-accent to-primary transition-all duration-300"
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>
          {current.toFixed(2)} {currency}
        </span>
        <span>
          {target} {currency}
        </span>
      </div>
    </div>
  )
}
