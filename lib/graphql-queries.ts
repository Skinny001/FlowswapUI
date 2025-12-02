import { gql } from 'urql';

// Query to get all pools created by the factory
export const GET_POOLS = gql`
  query GetPools($first: Int = 10, $skip: Int = 0, $orderBy: String = "blockTimestamp", $orderDirection: String = "desc") {
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
`;

// Query to get swap events from hooks
export const GET_SWAPS = gql`
  query GetSwaps($first: Int = 10, $skip: Int = 0, $orderBy: String = "blockTimestamp", $orderDirection: String = "desc") {
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
`;

// Query to get liquidity addition events
export const GET_LIQUIDITY_EVENTS = gql`
  query GetLiquidityEvents($first: Int = 10, $skip: Int = 0, $orderBy: String = "blockTimestamp", $orderDirection: String = "desc") {
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
`;

// Query to get pool details by specific tokens
export const GET_POOL_BY_TOKENS = gql`
  query GetPoolByTokens($tokenA: String!, $tokenB: String!) {
    poolCreateds(
      where: {
        or: [
          { and: [{ tokenA: $tokenA }, { tokenB: $tokenB }] }
          { and: [{ tokenA: $tokenB }, { tokenB: $tokenA }] }
        ]
      }
      first: 1
      orderBy: blockTimestamp
      orderDirection: desc
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
`;

// Query to get recent activity (swaps and liquidity events combined)
export const GET_RECENT_ACTIVITY = gql`
  query GetRecentActivity($first: Int = 5) {
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
      __typename
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
      __typename
    }
  }
`;

// Query to get pools with pagination
export const GET_POOLS_WITH_STATS = gql`
  query GetPoolsWithStats($first: Int = 10, $skip: Int = 0) {
    poolCreateds(
      first: $first
      skip: $skip
      orderBy: blockTimestamp
      orderDirection: desc
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
`;