import { usePoolsDirect, useSwapsDirect, useLiquidityEventsDirect } from '@/hooks/useSubgraphDataDirect'

export function LiveStats() {
  const { data: pools } = usePoolsDirect({ first: 1000 })
  const { data: swaps } = useSwapsDirect({ first: 1000 })
  const { data: liquidityEvents } = useLiquidityEventsDirect({ first: 1000 })

  const totalPools = pools?.length || 0
  const totalSwaps = swaps?.length || 0
  const totalLiquidityEvents = liquidityEvents?.length || 0
  const totalActivity = totalSwaps + totalLiquidityEvents

  return (
    <div className="grid md:grid-cols-4 gap-4">
      <div className="bg-card border-border p-6 text-center hover:border-accent/50 transition rounded-lg border">
        <div className="text-3xl font-bold text-accent mb-1">{totalPools}</div>
        <div className="text-sm text-muted-foreground">Pools Created</div>
      </div>
      <div className="bg-card border-border p-6 text-center hover:border-accent/50 transition rounded-lg border">
        <div className="text-3xl font-bold text-accent mb-1">{totalSwaps}</div>
        <div className="text-sm text-muted-foreground">Swaps Executed</div>
      </div>
      <div className="bg-card border-border p-6 text-center hover:border-accent/50 transition rounded-lg border">
        <div className="text-3xl font-bold text-accent mb-1">{totalLiquidityEvents}</div>
        <div className="text-sm text-muted-foreground">Liquidity Added</div>
      </div>
      <div className="bg-card border-border p-6 text-center hover:border-accent/50 transition rounded-lg border">
        <div className="text-3xl font-bold text-accent mb-1">{totalActivity}</div>
        <div className="text-sm text-muted-foreground">Total Activity</div>
      </div>
    </div>
  )
}