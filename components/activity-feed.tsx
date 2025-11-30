interface ActivityItem {
  type: "points" | "claim" | "lottery" | "swap"
  title: string
  description: string
  timestamp: string
  amount?: string
}

interface ActivityFeedProps {
  items: ActivityItem[]
}

export function ActivityFeed({ items }: ActivityFeedProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case "points":
        return "⭐"
      case "claim":
        return "✓"
      case "lottery":
        return "🎰"
      case "swap":
        return "🔄"
      default:
        return "•"
    }
  }

  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={i} className="flex gap-3 pb-3 border-b border-border last:border-0">
          <div className="text-lg">{getIcon(item.type)}</div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium">{item.title}</p>
            <p className="text-xs text-muted-foreground">{item.description}</p>
          </div>
          <div className="text-right flex-shrink-0">
            {item.amount && <p className="text-sm font-medium">{item.amount}</p>}
            <p className="text-xs text-muted-foreground">{item.timestamp}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
