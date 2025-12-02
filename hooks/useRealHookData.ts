// Hook data fetching component for explore page
'use client'

import { useHookAtIndex, useHookConfiguration, useTokenInfo, useLotteryStatsForPool, useParticipantsForPool } from '@/contracts/hooks'

export interface RealHookData {
  address: string
  tokenName: string
  tokenSymbol: string
  targetToken: string
  pointsRatio: string
  participants: number
  totalPoints: string
  lotteryPrize: string
  isLoading: boolean
  error: boolean
}

export function useRealHookData(index: number): RealHookData {
  // Get hook address at index
  const { data: hookAddress, isLoading: hookLoading, error: hookError } = useHookAtIndex(index)
  
  // Get hook configuration
  const { data: config, isLoading: configLoading } = useHookConfiguration(hookAddress)
  
  // Get token info
  const tokenInfo = useTokenInfo(config?.[0] as `0x${string}`)
  
  // Get pool stats for default pool (ID 0)
  const { data: lotteryStats } = useLotteryStatsForPool(hookAddress, BigInt(0))
  const { data: participants } = useParticipantsForPool(hookAddress, BigInt(0))
  
  const isLoading = hookLoading || configLoading || tokenInfo.name.isLoading
  const error = !!hookError || tokenInfo.name.isError || !hookAddress
  
  return {
    address: hookAddress || '',
    tokenName: tokenInfo.name.data || 'Loading...',
    tokenSymbol: tokenInfo.symbol.data || '...',
    targetToken: config?.[0] || '',
    pointsRatio: config?.[1]?.toString() || '0',
    participants: participants?.length || 0,
    totalPoints: lotteryStats?.[5]?.toString() || '0',
    lotteryPrize: lotteryStats ? (Number(lotteryStats[2]) / 1e18).toFixed(4) : '0',
    isLoading,
    error
  }
}