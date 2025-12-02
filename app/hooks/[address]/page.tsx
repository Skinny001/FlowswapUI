"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  useHookConfiguration, 
  useLotteryStatsForPool,
  useParticipantsForPool,
  useTotalPointsForPool,
  useTokenInfo,
  useHookWrite
} from "@/contracts/hooks"
import { useAccount } from "wagmi"
import { HOOK_ABI } from "@/contracts/config"
import { ExternalLink, Users, Trophy, Coins, Activity } from "lucide-react"

export default function HookDashboard() {
  const params = useParams()
  const hookAddress = params.address as `0x${string}`
  const { address, isConnected } = useAccount()
  const [selectedPoolId, setSelectedPoolId] = useState(BigInt(0))

  // Hook configuration
  const { data: config, isLoading: configLoading } = useHookConfiguration(hookAddress)
  
  // Token info
  const tokenInfo = useTokenInfo(config?.[0] as `0x${string}`)
  
  // Pool stats (using pool ID 0 as example)
  const { data: lotteryStats } = useLotteryStatsForPool(hookAddress, selectedPoolId)
  const { data: participants } = useParticipantsForPool(hookAddress, selectedPoolId)
  const { data: totalPoints } = useTotalPointsForPool(hookAddress, selectedPoolId)

  // Contract write
  const { writeContractAsync } = useHookWrite()

  const handleClaimReward = async () => {
    if (!isConnected || !hookAddress) return
    
    try {
      await writeContractAsync({
        address: hookAddress,
        abi: HOOK_ABI,
        functionName: 'claimRewardFromPool',
        args: [selectedPoolId]
      })
    } catch (error) {
      console.error('Claim failed:', error)
    }
  }

  if (configLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">Loading hook configuration...</div>
        </div>
      </div>
    )
  }

  if (!config) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">Hook not found or invalid address</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <h1 className="text-3xl font-bold">
              {tokenInfo.name.data || "Loading..."} Hook
            </h1>
            <Badge className="bg-green-500/10 text-green-500 border-green-500/20">
              Active
            </Badge>
          </div>
          
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <span>Token:</span>
              <code className="bg-muted px-2 py-1 rounded text-xs">
                {config[0]}
              </code>
            </div>
            <div>Points Ratio: {config[1].toString()}:1</div>
            <div>Owner: {config[3] === address ? "You" : `${config[3].slice(0, 6)}...${config[3].slice(-4)}`}</div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Participants</p>
                <p className="text-2xl font-bold">{participants?.length || 0}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3">
              <Coins className="w-8 h-8 text-yellow-500" />
              <div>
                <p className="text-sm text-muted-foreground">Total Points</p>
                <p className="text-2xl font-bold">{totalPoints?.toString() || "0"}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3">
              <Trophy className="w-8 h-8 text-purple-500" />
              <div>
                <p className="text-sm text-muted-foreground">Prize Pool</p>
                <p className="text-2xl font-bold">
                  {lotteryStats ? `${(Number(lotteryStats[2]) / 1e18).toFixed(4)} ETH` : "0 ETH"}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3">
              <Activity className="w-8 h-8 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <p className="text-lg font-semibold">
                  {lotteryStats?.[4] ? "Ready" : "Building"}
                </p>
              </div>
            </div>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="participants">Participants</TabsTrigger>
            <TabsTrigger value="rewards">Rewards</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="font-semibold mb-4">Lottery Progress</h3>
                {lotteryStats && (
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Collected Fees</span>
                      <span>{(Number(lotteryStats[0]) / 1e18).toFixed(6)} ETH</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Available for Prize</span>
                      <span>{(Number(lotteryStats[2]) / 1e18).toFixed(6)} ETH</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Participants</span>
                      <span>{lotteryStats[3].toString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Ready for Lottery</span>
                      <span>{lotteryStats[4] ? "✅ Yes" : "⏳ No"}</span>
                    </div>
                  </div>
                )}
              </Card>

              <Card className="p-6">
                <h3 className="font-semibold mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Button 
                    className="w-full" 
                    onClick={handleClaimReward}
                    disabled={!isConnected}
                  >
                    Claim Rewards
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => window.open(`https://sepolia.basescan.org/address/${hookAddress}`, '_blank')}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View on BaseScan
                  </Button>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="participants">
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Active Participants</h3>
              {participants && participants.length > 0 ? (
                <div className="space-y-2">
                  {participants.map((participant, index) => (
                    <div key={participant} className="flex justify-between items-center p-3 bg-muted/50 rounded">
                      <code className="text-sm">{participant}</code>
                      <Badge variant="secondary">{index + 1}</Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-8">No participants yet</p>
              )}
            </Card>
          </TabsContent>

          <TabsContent value="rewards">
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Reward History</h3>
              <p className="text-muted-foreground text-center py-8">
                Reward history will be displayed here once subgraph is implemented
              </p>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Hook Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Target Token</label>
                  <code className="block bg-muted p-2 rounded text-sm mt-1">{config[0]}</code>
                </div>
                <div>
                  <label className="text-sm font-medium">Points Ratio</label>
                  <p className="text-sm mt-1">{config[1].toString()} points per $1 swap</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Metadata URI</label>
                  <p className="text-sm mt-1 break-all">{config[2]}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Owner</label>
                  <code className="block bg-muted p-2 rounded text-sm mt-1">{config[3]}</code>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
