import { useRecentActivity } from '@/hooks/useSubgraphData'
import { useRecentActivityDirect } from '@/hooks/useSubgraphDataDirect'
import { formatEther } from 'viem'

interface ActivityItem {
  type: "points" | "claim" | "lottery" | "swap" | "liquidity"
  title: string
  description: string
  timestamp: string
  amount?: string
  txHash?: string
}

interface ActivityFeedProps {
  items?: ActivityItem[]
  useSubgraphData?: boolean
}

export function ActivityFeed({ items, useSubgraphData = false }: ActivityFeedProps) {
  const { data: recentActivity, fetching, error } = useRecentActivityDirect(10)

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
      case "liquidity":
        return "💧"
      default:
        return "•"
    }
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(parseInt(timestamp) * 1000)
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 1) return 'Just now'
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`
    return `${Math.floor(diffInMinutes / 1440)}d ago`
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const formatAmount = (amount: string) => {
    try {
      const formatted = formatEther(BigInt(amount))
      return parseFloat(formatted).toFixed(4)
    } catch {
      return '0.0000'
    }
  }

  // Convert subgraph data to ActivityItem format
  const subgraphItems: ActivityItem[] = recentActivity?.map(event => {
    if (event.__typename === 'SwapExecuted') {
      const swapEvent = event as any // Type assertion for now
      return {
        type: 'swap' as const,
        title: 'Swap Executed',
        description: `${formatAddress(swapEvent.sender)} swapped ${formatAmount(swapEvent.amountIn)} for ${formatAmount(swapEvent.amountOut)}`,
        timestamp: formatTimestamp(swapEvent.blockTimestamp),
        amount: `${formatAmount(swapEvent.amountOut)}`,
        txHash: swapEvent.transactionHash
      }
    } else {
      // LiquidityAdded event
      const liquidityEvent = event as any // Type assertion for now
      return {
        type: 'liquidity' as const,
        title: 'Liquidity Added',
        description: `${formatAddress(liquidityEvent.provider)} added liquidity`,
        timestamp: formatTimestamp(liquidityEvent.blockTimestamp),
        amount: `${formatAmount(liquidityEvent.amount0)} + ${formatAmount(liquidityEvent.amount1)}`,
        txHash: liquidityEvent.transactionHash
      }
    }
  }) || []

  const displayItems = useSubgraphData ? subgraphItems : (items || [])

  if (useSubgraphData && fetching) {
    return (
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex gap-3 pb-3 border-b border-border last:border-0 animate-pulse">
            <div className="w-5 h-5 bg-muted rounded"></div>
            <div className="flex-1 min-w-0 space-y-1">
              <div className="h-4 bg-muted rounded w-1/3"></div>
              <div className="h-3 bg-muted rounded w-2/3"></div>
            </div>
            <div className="w-16 space-y-1">
              <div className="h-4 bg-muted rounded"></div>
              <div className="h-3 bg-muted rounded"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (useSubgraphData && error) {
    return (
      <div className="text-center py-4 text-muted-foreground">
        <p>Unable to load recent activity</p>
        <p className="text-xs mb-2">{error.message}</p>
        <p className="text-xs bg-muted p-2 rounded">
          Endpoint: {process.env.NEXT_PUBLIC_SUBGRAPH_URL}
        </p>
      </div>
    )
  }

  if (displayItems.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <div className="text-4xl mb-2">📊</div>
        <p className="font-medium">No recent activity</p>
        {useSubgraphData && (
          <div className="mt-4 space-y-2 text-sm">
            <p>Your subgraph is connected and ready!</p>
            <p>To see activity here, you need to:</p>
            <ol className="text-left max-w-sm mx-auto space-y-1 mt-2">
              <li>1. Create pools using your factory contract</li>
              <li>2. Execute swaps through your hooks</li>
              <li>3. Add liquidity to pools</li>
            </ol>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {displayItems.map((item, i) => (
        <div key={item.txHash || i} className="flex gap-3 pb-3 border-b border-border last:border-0">
          <div className="text-lg">{getIcon(item.type)}</div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium">{item.title}</p>
            <p className="text-xs text-muted-foreground truncate">{item.description}</p>
            {item.txHash && (
              <a 
                href={`https://sepolia.basescan.org/tx/${item.txHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-400 hover:text-blue-300"
              >
                View transaction →
              </a>
            )}
          </div>
          <div className="text-right shrink-0">
            {item.amount && <p className="text-sm font-medium">{item.amount}</p>}
            <p className="text-xs text-muted-foreground">{item.timestamp}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
