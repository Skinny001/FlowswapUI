"use client"

import { useQuery } from 'urql'
import { useState, useEffect } from 'react'

const TEST_QUERY = `
  query TestQuery {
    _meta {
      block {
        number
      }
    }
  }
`

export function SubgraphTest() {
  const [result] = useQuery({ query: TEST_QUERY })
  const [directResult, setDirectResult] = useState<any>(null)
  
  // Also test with direct fetch to compare
  useEffect(() => {
    const testDirect = async () => {
      try {
        const response = await fetch(process.env.NEXT_PUBLIC_SUBGRAPH_URL!, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({ query: TEST_QUERY })
        })
        const data = await response.json()
        setDirectResult({ success: true, data })
      } catch (error) {
        setDirectResult({ success: false, error: error instanceof Error ? error.message : 'Unknown error' })
      }
    }
    testDirect()
  }, [])
  
  return (
    <div className="p-4 border rounded">
      <h3 className="font-bold mb-2">Subgraph Connection Test</h3>
      <div className="space-y-4 text-sm">
        <div>
          <strong>URL:</strong> 
          <code className="block text-xs bg-muted p-1 rounded mt-1">
            {process.env.NEXT_PUBLIC_SUBGRAPH_URL}
          </code>
        </div>
        
        {/* urql Client Test */}
        <div className="border-l-4 border-blue-500 pl-3">
          <strong>urql Client:</strong>
          <div className="mt-1">
            <span className={result.fetching ? 'text-yellow-500' : result.error ? 'text-red-500' : 'text-green-500'}>
              {result.fetching ? 'Loading...' : result.error ? 'Error' : 'Success'}
            </span>
          </div>
          {result.error && (
            <pre className="bg-red-50 p-2 rounded mt-1 text-xs overflow-x-auto">
              {JSON.stringify(result.error, null, 2)}
            </pre>
          )}
          {result.data && (
            <div className="text-green-600 text-xs mt-1">
              Block: {result.data._meta?.block?.number}
            </div>
          )}
        </div>

        {/* Direct Fetch Test */}
        <div className="border-l-4 border-purple-500 pl-3">
          <strong>Direct Fetch:</strong>
          <div className="mt-1">
            {directResult ? (
              <span className={directResult.success ? 'text-green-500' : 'text-red-500'}>
                {directResult.success ? 'Success' : 'Error'}
              </span>
            ) : (
              <span className="text-yellow-500">Testing...</span>
            )}
          </div>
          {directResult?.data && (
            <div className="text-green-600 text-xs mt-1">
              Block: {directResult.data._meta?.block?.number}
            </div>
          )}
          {directResult?.error && (
            <div className="text-red-500 text-xs mt-1">
              {directResult.error}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}