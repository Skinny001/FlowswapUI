"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function SubgraphDataTest() {
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const testSubgraphData = async () => {
    setLoading(true)
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_SUBGRAPH_URL!, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          query: `{
            _meta {
              block {
                number
                hash
              }
              deployment
            }
            poolCreateds(first: 3) {
              id
              tokenA
              tokenB
              fee
              pool
              hookContract
              blockNumber
              blockTimestamp
              transactionHash
            }
            swapExecuteds(first: 3) {
              id
              sender
              tokenIn
              tokenOut
              amountIn
              amountOut
              blockNumber
              blockTimestamp
              transactionHash
            }
            liquidityAddeds(first: 3) {
              id
              provider
              token0
              token1
              amount0
              amount1
              blockNumber
              blockTimestamp
              transactionHash
            }
          }`
        })
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      setResult({
        success: true,
        block: data.data?._meta?.block?.number,
        poolsCount: data.data?.poolCreateds?.length || 0,
        swapsCount: data.data?.swapExecuteds?.length || 0,
        liquidityCount: data.data?.liquidityAddeds?.length || 0,
        rawData: JSON.stringify(data, null, 2)
      })
    } catch (error) {
      setResult({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      })
    }
    setLoading(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Live Subgraph Data Test</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button onClick={testSubgraphData} disabled={loading}>
          {loading ? 'Loading...' : 'Test All Subgraph Data'}
        </Button>

        {result && (
          <div className="space-y-4">
            {result.success ? (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Latest Block:</span>
                  <span className="font-mono">{result.block?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Pools Found:</span>
                  <span className="font-mono">{result.poolsCount}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Swaps Found:</span>
                  <span className="font-mono">{result.swapsCount}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Liquidity Events:</span>
                  <span className="font-mono">{result.liquidityCount}</span>
                </div>
                
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-medium">View Raw Response</summary>
                  <pre className="bg-muted p-3 rounded mt-2 text-xs overflow-auto max-h-64">
                    {result.rawData}
                  </pre>
                </details>
              </div>
            ) : (
              <div className="text-red-500 text-sm">
                <strong>Error:</strong> {result.error}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}