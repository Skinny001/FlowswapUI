// Wagmi hooks for FlowSwap contract interactions
'use client'

import { useReadContract, useWriteContract, useWatchContractEvent } from 'wagmi'
import { FACTORY_ADDRESS, FACTORY_ABI, HOOK_ABI, ERC20_ABI } from './config'

// Factory Contract Hooks

export const useFactoryWrite = () => {
  return useWriteContract()
}

// Hook to get number of deployed hooks
export const useHookCount = () => {
  return useReadContract({
    address: FACTORY_ADDRESS,
    abi: FACTORY_ABI,
    functionName: 'getHookCount'
  })
}

// Hook to get all hooks deployed by a specific address
export const useHooksByDeployer = (deployer: `0x${string}` | undefined) => {
  return useReadContract({
    address: FACTORY_ADDRESS,
    abi: FACTORY_ABI,
    functionName: 'getHooksByDeployer',
    args: deployer ? [deployer] : undefined,
    query: {
      enabled: !!deployer
    }
  })
}

// Hook to compute hook address before deployment
export const useComputeHookAddress = (
  tokenAddress: `0x${string}` | undefined,
  pointsPerToken: bigint | undefined,
  metadataURI: string | undefined,
  salt: `0x${string}` | undefined
) => {
  return useReadContract({
    address: FACTORY_ADDRESS,
    abi: FACTORY_ABI,
    functionName: 'computePointsSystemAddress',
    args: 
      tokenAddress && pointsPerToken !== undefined && metadataURI && salt
        ? [tokenAddress, pointsPerToken, metadataURI, salt]
        : undefined,
    query: {
      enabled: !!(tokenAddress && pointsPerToken !== undefined && metadataURI && salt)
    }
  })
}

// Hook to get hook at specific index
export const useHookAtIndex = (index: number | undefined) => {
  return useReadContract({
    address: FACTORY_ADDRESS,
    abi: FACTORY_ABI,
    functionName: 'getHookAtIndex',
    args: index !== undefined ? [BigInt(index)] : undefined,
    query: {
      enabled: index !== undefined
    }
  })
}

// Hook to get platform fee
export const usePlatformFee = () => {
  return useReadContract({
    address: FACTORY_ADDRESS,
    abi: FACTORY_ABI,
    functionName: 'platformFEE'
  })
}

// Individual Hook Contract Hooks

export const useHookWrite = () => {
  return useWriteContract()
}

// Hook to get configuration of a specific hook
export const useHookConfiguration = (hookAddress: `0x${string}` | undefined) => {
  return useReadContract({
    address: hookAddress,
    abi: HOOK_ABI,
    functionName: 'getConfiguration',
    query: {
      enabled: !!hookAddress
    }
  })
}

// Hook to get user points for a specific pool
export const useUserPointsForPool = (
  hookAddress: `0x${string}` | undefined,
  userAddress: `0x${string}` | undefined,
  poolId: bigint | undefined
) => {
  return useReadContract({
    address: hookAddress,
    abi: HOOK_ABI,
    functionName: 'getUserPointsForPool',
    args: 
      userAddress && poolId !== undefined 
        ? [userAddress, poolId] 
        : undefined,
    query: {
      enabled: !!(hookAddress && userAddress && poolId !== undefined)
    }
  })
}

// Hook to get lottery stats for a pool
export const useLotteryStatsForPool = (
  hookAddress: `0x${string}` | undefined,
  poolId: bigint | undefined
) => {
  return useReadContract({
    address: hookAddress,
    abi: HOOK_ABI,
    functionName: 'getLotteryStatsForPool',
    args: poolId !== undefined ? [poolId] : undefined,
    query: {
      enabled: !!(hookAddress && poolId !== undefined)
    }
  })
}

// Hook to get unclaimed rewards for a user in a specific pool
export const useUnclaimedRewardsForPool = (
  hookAddress: `0x${string}` | undefined,
  userAddress: `0x${string}` | undefined,
  poolId: bigint | undefined
) => {
  return useReadContract({
    address: hookAddress,
    abi: HOOK_ABI,
    functionName: 'getUnclaimedRewardsForPool',
    args: 
      userAddress && poolId !== undefined 
        ? [userAddress, poolId] 
        : undefined,
    query: {
      enabled: !!(hookAddress && userAddress && poolId !== undefined)
    }
  })
}

// Hook to get participants for a pool
export const useParticipantsForPool = (
  hookAddress: `0x${string}` | undefined,
  poolId: bigint | undefined
) => {
  return useReadContract({
    address: hookAddress,
    abi: HOOK_ABI,
    functionName: 'getParticipantsForPool',
    args: poolId !== undefined ? [poolId] : undefined,
    query: {
      enabled: !!(hookAddress && poolId !== undefined)
    }
  })
}

// Hook to get total points for a pool
export const useTotalPointsForPool = (
  hookAddress: `0x${string}` | undefined,
  poolId: bigint | undefined
) => {
  return useReadContract({
    address: hookAddress,
    abi: HOOK_ABI,
    functionName: 'getTotalPointsForPool',
    args: poolId !== undefined ? [poolId] : undefined,
    query: {
      enabled: !!(hookAddress && poolId !== undefined)
    }
  })
}

// ERC20 Token Hooks

export const useTokenInfo = (tokenAddress: `0x${string}` | undefined) => {
  const name = useReadContract({
    address: tokenAddress,
    abi: ERC20_ABI,
    functionName: 'name',
    query: { enabled: !!tokenAddress }
  })
  
  const symbol = useReadContract({
    address: tokenAddress,
    abi: ERC20_ABI,
    functionName: 'symbol',
    query: { enabled: !!tokenAddress }
  })
  
  const decimals = useReadContract({
    address: tokenAddress,
    abi: ERC20_ABI,
    functionName: 'decimals',
    query: { enabled: !!tokenAddress }
  })

  return { name, symbol, decimals }
}

// Event Watching Hooks

export const useWatchHookDeployed = (onLogs: (logs: any[]) => void) => {
  return useWatchContractEvent({
    address: FACTORY_ADDRESS,
    abi: FACTORY_ABI,
    eventName: 'HookDeployed',
    onLogs
  })
}

export const useWatchPointsAwarded = (
  hookAddress: `0x${string}` | undefined,
  onLogs: (logs: any[]) => void
) => {
  return useWatchContractEvent({
    address: hookAddress,
    abi: HOOK_ABI,
    eventName: 'PointsAwarded',
    onLogs,
    enabled: !!hookAddress
  })
}

export const useWatchLotteryTriggered = (
  hookAddress: `0x${string}` | undefined,
  onLogs: (logs: any[]) => void
) => {
  return useWatchContractEvent({
    address: hookAddress,
    abi: HOOK_ABI,
    eventName: 'LotteryTriggered',
    onLogs,
    enabled: !!hookAddress
  })
}

export const useWatchWinnerSelected = (
  hookAddress: `0x${string}` | undefined,
  onLogs: (logs: any[]) => void
) => {
  return useWatchContractEvent({
    address: hookAddress,
    abi: HOOK_ABI,
    eventName: 'WinnerSelected',
    onLogs,
    enabled: !!hookAddress
  })
}