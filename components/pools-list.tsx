import { usePoolsDirect, type Pool } from '@/hooks/useSubgraphDataDirect'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface PoolsListProps {
  limit?: number
}

export function PoolsList({ limit = 10 }: PoolsListProps) {
  const { data: pools, fetching, error } = usePoolsDirect({ first: limit })

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const formatFee = (fee: string) => {
    const feeNumber = parseInt(fee)
    return `${(feeNumber / 10000).toFixed(2)}%`
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(parseInt(timestamp) * 1000)
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
  }

  if (fetching) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-6 bg-muted rounded w-1/3"></div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded w-2/3"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
                <div className="h-4 bg-muted rounded w-3/4"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center text-muted-foreground">
            <p>Unable to load pools</p>
            <p className="text-xs mt-1">{error.message}</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!pools || pools.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center text-muted-foreground py-8">
            <div className="text-4xl mb-2">🏊‍♂️</div>
            <p className="font-medium">No pools created yet</p>
            <div className="mt-4 text-sm space-y-2">
              <p>Your subgraph is connected and monitoring!</p>
              <p>Create your first pool using the factory contract:</p>
              <code className="block bg-muted p-2 rounded text-xs mt-2">
                {process.env.NEXT_PUBLIC_FACTORY_ADDRESS}
              </code>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {pools.map((pool: Pool) => (
        <Card key={pool.id} className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">
                Pool #{pool.id.slice(-8)}
              </CardTitle>
              <Badge variant="outline">
                Fee: {formatFee(pool.fee)}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Token A</p>
                <p className="font-mono">{formatAddress(pool.tokenA)}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Token B</p>
                <p className="font-mono">{formatAddress(pool.tokenB)}</p>
              </div>
            </div>
            
            <div className="space-y-2 text-sm">
              <div>
                <p className="text-muted-foreground">Pool Address</p>
                <div className="flex items-center gap-2">
                  <p className="font-mono">{formatAddress(pool.pool)}</p>
                  <a
                    href={`https://sepolia.basescan.org/address/${pool.pool}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 text-xs"
                  >
                    View →
                  </a>
                </div>
              </div>
              
              <div>
                <p className="text-muted-foreground">Hook Contract</p>
                <div className="flex items-center gap-2">
                  <p className="font-mono">{formatAddress(pool.hookContract)}</p>
                  <a
                    href={`https://sepolia.basescan.org/address/${pool.hookContract}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 text-xs"
                  >
                    View →
                  </a>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t text-xs text-muted-foreground">
              <span>Block #{pool.blockNumber}</span>
              <span>{formatTimestamp(pool.blockTimestamp)}</span>
            </div>

            <div className="pt-2">
              <a
                href={`https://sepolia.basescan.org/tx/${pool.transactionHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 text-xs"
              >
                View creation transaction →
              </a>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}