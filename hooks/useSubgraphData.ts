import { useQuery } from 'urql';
import {
  GET_POOLS,
  GET_SWAPS,
  GET_LIQUIDITY_EVENTS,
  GET_POOL_BY_TOKENS,
  GET_RECENT_ACTIVITY,
  GET_POOLS_WITH_STATS
} from '@/lib/graphql-queries';

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
export function usePools(options: QueryOptions = {}) {
  const [result] = useQuery({
    query: GET_POOLS,
    variables: {
      first: options.first || 10,
      skip: options.skip || 0,
      orderBy: options.orderBy || 'blockTimestamp',
      orderDirection: options.orderDirection || 'desc',
    },
  });

  return {
    data: result.data?.poolCreateds as Pool[] | undefined,
    fetching: result.fetching,
    error: result.error,
  };
}

// Hook to fetch swap events
export function useSwaps(options: QueryOptions = {}) {
  const [result] = useQuery({
    query: GET_SWAPS,
    variables: {
      first: options.first || 10,
      skip: options.skip || 0,
      orderBy: options.orderBy || 'blockTimestamp',
      orderDirection: options.orderDirection || 'desc',
    },
  });

  return {
    data: result.data?.swapExecuteds as SwapEvent[] | undefined,
    fetching: result.fetching,
    error: result.error,
  };
}

// Hook to fetch liquidity events
export function useLiquidityEvents(options: QueryOptions = {}) {
  const [result] = useQuery({
    query: GET_LIQUIDITY_EVENTS,
    variables: {
      first: options.first || 10,
      skip: options.skip || 0,
      orderBy: options.orderBy || 'blockTimestamp',
      orderDirection: options.orderDirection || 'desc',
    },
  });

  return {
    data: result.data?.liquidityAddeds as LiquidityEvent[] | undefined,
    fetching: result.fetching,
    error: result.error,
  };
}

// Hook to fetch a specific pool by token addresses
export function usePoolByTokens(tokenA: string, tokenB: string) {
  const [result] = useQuery({
    query: GET_POOL_BY_TOKENS,
    variables: { tokenA, tokenB },
    pause: !tokenA || !tokenB, // Don't run query if tokens are not provided
  });

  return {
    data: result.data?.poolCreateds?.[0] as Pool | undefined,
    fetching: result.fetching,
    error: result.error,
  };
}

// Hook to fetch recent activity (combines swaps and liquidity events)
export function useRecentActivity(first: number = 5) {
  const [result] = useQuery({
    query: GET_RECENT_ACTIVITY,
    variables: { first },
  });

  // Combine and sort both types of events by timestamp
  const swaps = (result.data?.swapExecuteds || []) as SwapEvent[];
  const liquidityEvents = (result.data?.liquidityAddeds || []) as LiquidityEvent[];
  
  const allEvents = [...swaps, ...liquidityEvents].sort((a, b) => 
    parseInt(b.blockTimestamp) - parseInt(a.blockTimestamp)
  ).slice(0, first);

  return {
    data: allEvents,
    swaps,
    liquidityEvents,
    fetching: result.fetching,
    error: result.error,
  };
}

// Hook to fetch pools with additional statistics
export function usePoolsWithStats(options: QueryOptions = {}) {
  const [result] = useQuery({
    query: GET_POOLS_WITH_STATS,
    variables: {
      first: options.first || 10,
      skip: options.skip || 0,
    },
  });

  return {
    data: result.data?.poolCreateds as Pool[] | undefined,
    fetching: result.fetching,
    error: result.error,
  };
}

// Utility hook for real-time data with auto-refresh
export function useRealTimeData<T>(
  hookFn: () => { data: T; fetching: boolean; error: any },
  intervalMs: number = 30000 // Default 30 seconds
) {
  const result = hookFn();
  
  // This could be enhanced with a polling mechanism if needed
  // For now, urql's built-in caching will handle re-fetching
  
  return result;
}