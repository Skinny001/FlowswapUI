import { useState, useEffect } from 'react'

interface UseSubgraphQueryResult<T> {
  data: T | undefined
  fetching: boolean
  error: any
}

export function useSubgraphQuery<T = any>(query: string, variables?: any): UseSubgraphQueryResult<T> {
  const [data, setData] = useState<T | undefined>(undefined)
  const [fetching, setFetching] = useState(true)
  const [error, setError] = useState<any>(null)

  useEffect(() => {
    const fetchData = async () => {
      setFetching(true)
      setError(null)
      
      try {
        const subgraphUrl = process.env.NEXT_PUBLIC_SUBGRAPH_URL
        if (!subgraphUrl) {
          throw new Error('NEXT_PUBLIC_SUBGRAPH_URL is not defined')
        }

        const response = await fetch(subgraphUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            query,
            variables: variables || {}
          })
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const result = await response.json()
        
        if (result.errors) {
          throw new Error(result.errors[0]?.message || 'GraphQL error')
        }

        setData(result.data)
      } catch (err) {
        console.error('Subgraph query error:', err)
        setError(err instanceof Error ? err : new Error('Unknown error'))
      } finally {
        setFetching(false)
      }
    }

    fetchData()
  }, [query, JSON.stringify(variables)])

  return { data, fetching, error }
}