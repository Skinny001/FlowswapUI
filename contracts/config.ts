// FlowSwap Contract Configuration for Base Sepolia
// Contract addresses and ABIs for frontend integration

export const FACTORY_ADDRESS = process.env.NEXT_PUBLIC_FACTORY_ADDRESS as `0x${string}`
export const EXAMPLE_HOOK_ADDRESS = process.env.NEXT_PUBLIC_EXAMPLE_HOOK_ADDRESS as `0x${string}`

// Validate addresses are set
if (!FACTORY_ADDRESS) {
  throw new Error("NEXT_PUBLIC_FACTORY_ADDRESS is not defined in environment variables")
}

// Factory ABI - For deploying hooks and querying factory data
export const FACTORY_ABI = [
  {
    "inputs": [
      {"internalType": "contract IPoolManager", "name": "_poolManager", "type": "address"},
      {"internalType": "address", "name": "_vrfCoordinator", "type": "address"},
      {"internalType": "uint256", "name": "_subscriptionId", "type": "uint256"},
      {"internalType": "bytes32", "name": "_keyHash", "type": "bytes32"},
      {"internalType": "uint256", "name": "platformFeePercentage", "type": "uint256"}
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "EmptyBaseURI",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "FeeTooHigh",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "HookAddressMismatch",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InvalidHookAddress",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "PointsRatioZero",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "SaltZero",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "address", "name": "deployer", "type": "address"},
      {"indexed": true, "internalType": "address", "name": "hook", "type": "address"},
      {"indexed": true, "internalType": "address", "name": "targetToken", "type": "address"},
      {"indexed": false, "internalType": "uint256", "name": "pointsRatio", "type": "uint256"},
      {"indexed": false, "internalType": "uint256", "name": "feePercentage", "type": "uint256"},
      {"indexed": false, "internalType": "string", "name": "baseURI", "type": "string"}
    ],
    "name": "HookDeployed",
    "type": "event"
  },
  {
    "inputs": [
      {"internalType": "address", "name": "tokenAddress", "type": "address"},
      {"internalType": "uint256", "name": "pointsPerToken", "type": "uint256"},
      {"internalType": "string", "name": "metadataURI", "type": "string"},
      {"internalType": "bytes32", "name": "salt", "type": "bytes32"},
      {"internalType": "address", "name": "expectedHookAddress", "type": "address"}
    ],
    "name": "createPointsSystem",
    "outputs": [{"internalType": "address", "name": "hook", "type": "address"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "address", "name": "tokenAddress", "type": "address"},
      {"internalType": "uint256", "name": "pointsPerToken", "type": "uint256"},
      {"internalType": "string", "name": "metadataURI", "type": "string"},
      {"internalType": "bytes32", "name": "salt", "type": "bytes32"}
    ],
    "name": "computePointsSystemAddress",
    "outputs": [{"internalType": "address", "name": "hookAddress", "type": "address"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getHookCount",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "index", "type": "uint256"}],
    "name": "getHookAtIndex",
    "outputs": [{"internalType": "address", "name": "", "type": "address"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "deployer", "type": "address"}],
    "name": "getHooksByDeployer",
    "outputs": [{"internalType": "address[]", "name": "", "type": "address[]"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "platformFEE",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  }
] as const

// Hook ABI - For interacting with individual deployed hooks
export const HOOK_ABI = [
  {
    "inputs": [],
    "name": "NoRewardsToClaim",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "OnlyOwner",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "ThresholdNotMet",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "TransferFailed",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "address", "name": "user", "type": "address"},
      {"indexed": true, "internalType": "uint256", "name": "poolId", "type": "uint256"},
      {"indexed": false, "internalType": "uint256", "name": "points", "type": "uint256"},
      {"indexed": false, "internalType": "uint256", "name": "amountSpent", "type": "uint256"}
    ],
    "name": "PointsAwarded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "Currency", "name": "currency", "type": "address"},
      {"indexed": true, "internalType": "uint256", "name": "poolId", "type": "uint256"},
      {"indexed": false, "internalType": "uint256", "name": "totalFees", "type": "uint256"},
      {"indexed": false, "internalType": "uint256", "name": "totalParticipants", "type": "uint256"}
    ],
    "name": "LotteryTriggered",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "Currency", "name": "currency", "type": "address"},
      {"indexed": true, "internalType": "uint256", "name": "poolId", "type": "uint256"},
      {"indexed": true, "internalType": "address", "name": "winner", "type": "address"},
      {"indexed": false, "internalType": "uint256", "name": "feesWon", "type": "uint256"},
      {"indexed": false, "internalType": "uint256", "name": "pointsUsed", "type": "uint256"}
    ],
    "name": "WinnerSelected",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "address", "name": "user", "type": "address"},
      {"indexed": true, "internalType": "Currency", "name": "currency", "type": "address"},
      {"indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256"}
    ],
    "name": "RewardClaimed",
    "type": "event"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "poolId", "type": "uint256"}],
    "name": "claimRewardFromPool",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getConfiguration",
    "outputs": [
      {"internalType": "Currency", "name": "targetToken_", "type": "address"},
      {"internalType": "uint256", "name": "pointsRatio_", "type": "uint256"},
      {"internalType": "string", "name": "baseURI_", "type": "string"},
      {"internalType": "address", "name": "owner_", "type": "address"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "poolId", "type": "uint256"}],
    "name": "getLotteryStatsForPool",
    "outputs": [
      {"internalType": "uint256", "name": "totalCollectedFees", "type": "uint256"},
      {"internalType": "uint256", "name": "totalAllocated", "type": "uint256"},
      {"internalType": "uint256", "name": "availableForDistribution", "type": "uint256"},
      {"internalType": "uint256", "name": "participantCount", "type": "uint256"},
      {"internalType": "bool", "name": "readyForLottery", "type": "bool"},
      {"internalType": "uint256", "name": "totalPoints", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "address", "name": "user", "type": "address"},
      {"internalType": "uint256", "name": "poolId", "type": "uint256"}
    ],
    "name": "getUserPointsForPool",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "address", "name": "user", "type": "address"},
      {"internalType": "uint256", "name": "poolId", "type": "uint256"}
    ],
    "name": "getUnclaimedRewardsForPool",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "poolId", "type": "uint256"}],
    "name": "getParticipantsForPool",
    "outputs": [{"internalType": "address[]", "name": "", "type": "address[]"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "poolId", "type": "uint256"}],
    "name": "getTotalPointsForPool",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "poolId", "type": "uint256"},
      {"internalType": "Currency", "name": "currency", "type": "address"}
    ],
    "name": "manualTriggerLotteryForPool",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "targetToken",
    "outputs": [{"internalType": "Currency", "name": "", "type": "address"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "pointsRatio",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "feePercentage",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "feeThreshold",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  }
] as const

// Example hook addresses from environment
export const EXAMPLE_HOOKS = {
  HOOK_1: process.env.NEXT_PUBLIC_EXAMPLE_HOOK_ADDRESS as `0x${string}`,
  HOOK_2: process.env.NEXT_PUBLIC_EXAMPLE_HOOK_2 as `0x${string}`,
  HOOK_3: process.env.NEXT_PUBLIC_EXAMPLE_HOOK_3 as `0x${string}`,
}

// Common ERC20 ABI for token validation
export const ERC20_ABI = [
  {
    "inputs": [],
    "name": "name",
    "outputs": [{"internalType": "string", "name": "", "type": "string"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "symbol", 
    "outputs": [{"internalType": "string", "name": "", "type": "string"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "decimals",
    "outputs": [{"internalType": "uint8", "name": "", "type": "uint8"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  }
] as const