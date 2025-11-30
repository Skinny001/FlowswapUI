"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { StatsCard } from "@/components/stats-card"
import { PoolCard } from "@/components/pool-card"
import { LotteryProgress } from "@/components/lottery-progress"
import { ActivityFeed } from "@/components/activity-feed"

export default function HookDashboard() {
  const params = useParams()
  const hookAddress = params?.address as string

  const [activeTab, setActiveTab] = useState("overview")

  const mockPoolsData: Record<string, any> = {
    "0x1111111111111111111111111111111111111111": {
      tokenName: "Uniswap",
      tokenSymbol: "UNI",
      totalPoints: 890000,
      participants: 2843,
      feesCollected: 5.2,
      lotteries: 8,
    },
    "0x2222222222222222222222222222222222222222": {
      tokenName: "Aave",
      tokenSymbol: "AAVE",
      totalPoints: 540000,
      participants: 1620,
      feesCollected: 3.1,
      lotteries: 5,
    },
    "0x3333333333333333333333333333333333333333": {
      tokenName: "Curve",
      tokenSymbol: "CRV",
      totalPoints: 420000,
      participants: 1205,
      feesCollected: 2.4,
      lotteries: 6,
    },
    "0x4444444444444444444444444444444444444444": {
      tokenName: "Lido",
      tokenSymbol: "LDO",
      totalPoints: 350000,
      participants: 980,
      feesCollected: 1.8,
      lotteries: 4,
    },
    "0x5555555555555555555555555555555555555555": {
      tokenName: "MakerDAO",
      tokenSymbol: "MKR",
      totalPoints: 280000,
      participants: 745,
      feesCollected: 1.5,
      lotteries: 3,
    },
    "0x6666666666666666666666666666666666666666": {
      tokenName: "Compound",
      tokenSymbol: "COMP",
      totalPoints: 210000,
      participants: 623,
      feesCollected: 1.2,
      lotteries: 2,
    },
  }

  const hookData = mockPoolsData[hookAddress] || {
    tokenName: "Unknown Hook",
    tokenSymbol: "???",
    totalPoints: 0,
    participants: 0,
    feesCollected: 0,
    lotteries: 0,
  }

  const mockPools = [
    {
      name: `${hookData.tokenSymbol} Pool 1`,
      symbol: hookData.tokenSymbol,
      address: "0x1234567890abcdef",
      participants: Math.floor(hookData.participants * 0.6),
      points: Math.floor(hookData.totalPoints * 0.6),
      prize: hookData.feesCollected * 0.6,
    },
    {
      name: `${hookData.tokenSymbol} Pool 2`,
      symbol: hookData.tokenSymbol,
      address: "0xabcdef1234567890",
      participants: Math.floor(hookData.participants * 0.4),
      points: Math.floor(hookData.totalPoints * 0.4),
      prize: hookData.feesCollected * 0.4,
    },
  ]

  const mockActivity = [
    {
      type: "points" as const,
      title: "Points Awarded",
      description: `User 0x1234 earned ${Math.floor(Math.random() * 500 + 100)} points`,
      timestamp: "2 mins ago",
      amount: `+${Math.floor(Math.random() * 500 + 100)} pts`,
    },
    {
      type: "swap" as const,
      title: "Swap Detected",
      description: `$${Math.floor(Math.random() * 5000 + 100)} swap on ${hookData.tokenSymbol} pool`,
      timestamp: "5 mins ago",
      amount: `$${Math.floor(Math.random() * 5000 + 100)}`,
    },
    {
      type: "lottery" as const,
      title: "Lottery Triggered",
      description: `Threshold reached on ${hookData.tokenSymbol} pool`,
      timestamp: "1 hour ago",
    },
  ]

  const shortAddress = `${hookAddress?.slice(0, 6)}...${hookAddress?.slice(-4)}`

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2">{hookData.tokenName} Hook</h1>
          <p className="text-muted-foreground">{shortAddress}</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-card border-border w-full justify-start">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="pools">Pools</TabsTrigger>
            <TabsTrigger value="lottery">Lottery</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Tab 1: Overview */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-4 gap-4">
              <StatsCard label="Total Points" value={hookData.totalPoints.toString()} subtitle="distributed" />
              <StatsCard label="Active Participants" value={hookData.participants.toString()} />
              <StatsCard label="Fees Collected" value={`${hookData.feesCollected} ETH`} />
              <StatsCard label="Lotteries Completed" value={hookData.lotteries.toString()} />
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-card border-border p-6 md:col-span-2">
                <h3 className="font-bold mb-4">Recent Activity</h3>
                <ActivityFeed items={mockActivity} />
              </Card>

              <Card className="bg-card border-border p-6">
                <h3 className="font-bold mb-4">Quick Stats</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Weekly Volume</p>
                    <p className="text-2xl font-bold">$125K</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Avg Points/User</p>
                    <p className="text-2xl font-bold">360</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Hook Status</p>
                    <p className="text-sm font-medium text-accent">Active ✓</p>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Tab 2: Pools */}
          <TabsContent value="pools" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {mockPools.map((pool) => (
                <PoolCard
                  key={pool.address}
                  tokenName={pool.name}
                  tokenSymbol={pool.symbol}
                  address={pool.address}
                  participants={pool.participants}
                  totalPoints={pool.points}
                  lotteryPrize={pool.prize.toString()}
                />
              ))}
            </div>

            <Card className="bg-card border-border p-6">
              <h3 className="font-bold mb-4">Pool Management</h3>
              <div className="space-y-3">
                {mockPools.map((pool) => (
                  <div key={pool.address} className="flex items-center justify-between p-3 bg-muted/30 rounded">
                    <div>
                      <p className="font-medium">{pool.name}</p>
                      <p className="text-xs text-muted-foreground">{pool.participants} participants</p>
                    </div>
                    <Button size="sm" className="bg-gradient-to-r from-primary to-accent">
                      Trigger Lottery
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Tab 3: Lottery */}
          <TabsContent value="lottery" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {mockPools.map((pool) => (
                <Card key={pool.address} className="bg-card border-border p-6">
                  <h3 className="font-bold mb-4">{pool.name}</h3>
                  <LotteryProgress current={0.8} target={pool.prize} currency="ETH" />
                  <Button className="w-full mt-4 bg-gradient-to-r from-primary to-accent">Trigger Lottery Now</Button>
                </Card>
              ))}
            </div>

            <Card className="bg-card border-border p-6">
              <h3 className="font-bold mb-4">Lottery History</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2">Pool</th>
                      <th className="text-left py-2">Winner</th>
                      <th className="text-right py-2">Prize</th>
                      <th className="text-right py-2">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border">
                      <td className="py-3">UNI Pool</td>
                      <td className="font-mono text-xs">0x1234...5678</td>
                      <td className="text-right text-accent">2.5 ETH</td>
                      <td className="text-right">2 days ago</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-3">AAVE Pool</td>
                      <td className="font-mono text-xs">0xabcd...ef00</td>
                      <td className="text-right text-accent">1.8 ETH</td>
                      <td className="text-right">5 days ago</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>

          {/* Tab 4: Settings */}
          <TabsContent value="settings" className="space-y-6">
            <Card className="bg-card border-border p-6">
              <h3 className="font-bold mb-4">Hook Configuration (Read-Only)</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Token Address</p>
                  <p className="font-mono text-sm bg-muted px-3 py-2 rounded">
                    0x5aEf8763ae81686382243e10e1376a353754A2a9
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Points Ratio</p>
                  <p className="font-medium">2.5 points per $1 swap</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Fee Percentage</p>
                  <p className="font-medium">5%</p>
                </div>
              </div>
            </Card>

            <Card className="bg-card border-border p-6">
              <h3 className="font-bold mb-4">Update Metadata URI</h3>
              <div className="space-y-3">
                <Input placeholder="ipfs://QmXxxx..." className="bg-input border-border" />
                <Button className="w-full bg-gradient-to-r from-primary to-accent">Update URI</Button>
              </div>
            </Card>

            <Card className="bg-card border-border p-6">
              <h3 className="font-bold mb-4">Withdraw Fees</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Available Fees</p>
                  <p className="text-2xl font-bold text-accent">{hookData.feesCollected} ETH</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Withdraw to Address</p>
                  <Input placeholder="0x..." className="bg-input border-border" />
                </div>
                <Button className="w-full bg-gradient-to-r from-primary to-accent">Withdraw Fees</Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
