import { useSubgraphQuery } from './useSubgraphQuery'

// Types for the subgraph entities
export interface Pool {
  id: string;
  tokenA: string;
  tokenB: string;
  fee: string;
  pool: string;
  hookContract: string;
  blockNumber: string;
  blockTimestamp: string;
  transactionHash: string;
}

export interface SwapEvent {
  id: string;
  sender: string;
  tokenIn: string;
  tokenOut: string;
  amountIn: string;
  amountOut: string;
  blockNumber: string;
  blockTimestamp: string;
  transactionHash: string;
  __typename?: string;
}

export interface LiquidityEvent {
  id: string;
  provider: string;
  token0: string;
  token1: string;
  amount0: string;
  amount1: string;
  blockNumber: string;
  blockTimestamp: string;
  transactionHash: string;
  __typename?: string;
}

export interface QueryOptions {
  first?: number;
  skip?: number;
  orderBy?: string;
  orderDirection?: 'asc' | 'desc';
}

// Hook to fetch all pools
export function usePoolsDirect(options: QueryOptions = {}) {
  const query = `
    query GetPools($first: Int!, $skip: Int!, $orderBy: String!, $orderDirection: String!) {
      poolCreateds(
        first: $first
        skip: $skip
        orderBy: $orderBy
        orderDirection: $orderDirection
      ) {
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
    }
  `
  
  const variables = {
    first: options.first || 10,
    skip: options.skip || 0,
    orderBy: options.orderBy || 'blockTimestamp',
    orderDirection: options.orderDirection || 'desc',
  }

  const result = useSubgraphQuery(query, variables)
  
  return {
    data: result.data?.poolCreateds as Pool[] | undefined,
    fetching: result.fetching,
    error: result.error,
  }
}

// Hook to fetch swap events
export function useSwapsDirect(options: QueryOptions = {}) {
  const query = `
    query GetSwaps($first: Int!, $skip: Int!, $orderBy: String!, $orderDirection: String!) {
      swapExecuteds(
        first: $first
        skip: $skip
        orderBy: $orderBy
        orderDirection: $orderDirection
      ) {
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
    }
  `
  
  const variables = {
    first: options.first || 10,
    skip: options.skip || 0,
    orderBy: options.orderBy || 'blockTimestamp',
    orderDirection: options.orderDirection || 'desc',
  }

  const result = useSubgraphQuery(query, variables)
  
  return {
    data: result.data?.swapExecuteds as SwapEvent[] | undefined,
    fetching: result.fetching,
    error: result.error,
  }
}

// Hook to fetch liquidity events
export function useLiquidityEventsDirect(options: QueryOptions = {}) {
  const query = `
    query GetLiquidityEvents($first: Int!, $skip: Int!, $orderBy: String!, $orderDirection: String!) {
      liquidityAddeds(
        first: $first
        skip: $skip
        orderBy: $orderBy
        orderDirection: $orderDirection
      ) {
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
    }
  `
  
  const variables = {
    first: options.first || 10,
    skip: options.skip || 0,
    orderBy: options.orderBy || 'blockTimestamp',
    orderDirection: options.orderDirection || 'desc',
  }

  const result = useSubgraphQuery(query, variables)
  
  return {
    data: result.data?.liquidityAddeds as LiquidityEvent[] | undefined,
    fetching: result.fetching,
    error: result.error,
  }
}

// Hook to fetch recent activity (combines swaps and liquidity events)
export function useRecentActivityDirect(first: number = 5) {
  const query = `
    query GetRecentActivity($first: Int!) {
      swapExecuteds(
        first: $first
        orderBy: blockTimestamp
        orderDirection: desc
      ) {
        id
        sender
        tokenIn
        tokenOut
        amountIn
        amountOut
        blockTimestamp
        transactionHash
      }
      liquidityAddeds(
        first: $first
        orderBy: blockTimestamp
        orderDirection: desc
      ) {
        id
        provider
        token0
        token1
        amount0
        amount1
        blockTimestamp
        transactionHash
      }
    }
  `

  const result = useSubgraphQuery(query, { first })

  // Combine and sort both types of events by timestamp
  const swaps = (result.data?.swapExecuteds || []) as SwapEvent[]
  const liquidityEvents = (result.data?.liquidityAddeds || []) as LiquidityEvent[]
  
  const allEvents = [...swaps.map(s => ({ ...s, __typename: 'SwapExecuted' })), 
                     ...liquidityEvents.map(l => ({ ...l, __typename: 'LiquidityAdded' }))].sort((a, b) => 
    parseInt(b.blockTimestamp) - parseInt(a.blockTimestamp)
  ).slice(0, first)

  return {
    data: allEvents,
    swaps,
    liquidityEvents,
    fetching: result.fetching,
    error: result.error,
  }
}