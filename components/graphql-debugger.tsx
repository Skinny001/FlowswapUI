"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function GraphQLDebugger() {
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const testDirectFetch = async () => {
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
              }
            }
            poolCreateds(first: 3) {
              id
              tokenA
              tokenB
              blockNumber
            }
            swapExecuteds(first: 3) {
              id
              sender
              amountIn
              amountOut
            }
          }`
        })
      })

      const contentType = response.headers.get('content-type')
      const text = await response.text()
      
      setResult({
        status: response.status,
        contentType,
        isHTML: text.includes('<!DOCTYPE html>'),
        responseText: text.substring(0, 1000) + (text.length > 1000 ? '...' : ''),
        url: process.env.NEXT_PUBLIC_SUBGRAPH_URL
      })
    } catch (error) {
      setResult({
        error: error instanceof Error ? error.message : 'Unknown error'
      })
    }
    setLoading(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>GraphQL Connection Debugger</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button onClick={testDirectFetch} disabled={loading}>
          {loading ? 'Testing...' : 'Test Pools & Swaps Query'}
        </Button>
        
        {result && (
          <div className="bg-muted p-4 rounded text-sm font-mono">
            <pre>{JSON.stringify(result, null, 2)}</pre>
          </div>
        )}
      </CardContent>
    </Card>
  )
}