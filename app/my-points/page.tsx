"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StatsCard } from "@/components/stats-card"
import { PointsDisplay } from "@/components/points-display"
import { RewardCard } from "@/components/reward-card"
import { ActivityFeed } from "@/components/activity-feed"

export default function MyPointsPage() {
  const [activeTab, setActiveTab] = useState("overview")

  const mockActivity = [
    {
      type: "points" as const,
      title: "Earned Points",
      description: "Swapped $150 on UNI pool",
      timestamp: "2 hours ago",
      amount: "+375 pts",
    },
    {
      type: "points" as const,
      title: "Earned Points",
      description: "Swapped $80 on AAVE pool",
      timestamp: "1 day ago",
      amount: "+200 pts",
    },
    {
      type: "claim" as const,
      title: "Claimed Reward",
      description: "From UNI pool lottery",
      timestamp: "3 days ago",
      amount: "2.5 ETH",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2">My Points & Rewards</h1>
          <p className="text-muted-foreground">Track your earnings and claim rewards</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-card border-border w-full justify-start">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="points">My Points</TabsTrigger>
            <TabsTrigger value="rewards">Claim Rewards</TabsTrigger>
          </TabsList>

          {/* Tab 1: Overview */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-4 gap-4">
              <StatsCard label="Total Points" value="12,425" subtitle="across all pools" />
              <StatsCard label="Total Rewards" value="5.2 ETH" subtitle="available to claim" />
              <StatsCard label="Lifetime Earnings" value="8.7 ETH" subtitle="all time" />
              <StatsCard label="Active Pools" value="5" />
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-card border-border p-6 md:col-span-2">
                <h3 className="font-bold mb-4">Activity Timeline</h3>
                <ActivityFeed items={mockActivity} />
              </Card>

              <Card className="bg-card border-border p-6">
                <h3 className="font-bold mb-4">Rewards Summary</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Pending Claims</p>
                    <p className="text-2xl font-bold text-accent">3.2 ETH</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Claimed This Month</p>
                    <p className="text-lg font-bold">2.0 ETH</p>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-primary to-accent">Claim All Rewards</Button>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Tab 2: My Points */}
          <TabsContent value="points" className="space-y-6">
            <Card className="bg-card border-border p-6">
              <h3 className="font-bold mb-4">Points by Pool</h3>
              <div className="space-y-3">
                {[
                  { name: "Uniswap Pool", points: 4500, probability: "2.1%" },
                  { name: "Aave Pool", points: 3200, probability: "1.8%" },
                  { name: "Curve Pool", points: 2100, probability: "1.2%" },
                  { name: "Lido Pool", points: 1800, probability: "0.9%" },
                  { name: "MakerDAO Pool", points: 825, probability: "0.4%" },
                ].map((pool) => (
                  <div key={pool.name} className="flex items-center justify-between p-3 bg-muted/30 rounded">
                    <div>
                      <p className="font-medium">{pool.name}</p>
                      <PointsDisplay points={pool.points} />
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Win Chance</p>
                      <p className="font-bold text-accent">{pool.probability}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="bg-card border-border p-6">
              <h3 className="font-bold mb-4">Transaction History</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2">Pool</th>
                      <th className="text-right py-2">Points Earned</th>
                      <th className="text-right py-2">Swap Amount</th>
                      <th className="text-right py-2">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { pool: "UNI", points: 375, amount: "$150", date: "2 hours ago" },
                      { pool: "AAVE", points: 200, amount: "$80", date: "1 day ago" },
                      { pool: "CURVE", points: 250, amount: "$100", date: "3 days ago" },
                    ].map((item, i) => (
                      <tr key={i} className="border-b border-border">
                        <td className="py-3">{item.pool}</td>
                        <td className="text-right text-accent font-bold">{item.points}</td>
                        <td className="text-right">{item.amount}</td>
                        <td className="text-right text-muted-foreground">{item.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>

          {/* Tab 3: Claim Rewards */}
          <TabsContent value="rewards" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <RewardCard poolName="Uniswap Pool" amount="2.5" currency="ETH" claimable={true} />
              <RewardCard poolName="Aave Pool" amount="1.8" currency="ETH" claimable={true} />
              <RewardCard poolName="Curve Pool" amount="0.6" currency="ETH" claimable={true} />
              <RewardCard poolName="Lido Pool" amount="0.3" currency="ETH" claimable={false} />
            </div>

            <Card className="bg-accent/10 border border-accent/20 p-6">
              <h3 className="font-bold mb-3">Quick Claim</h3>
              <p className="text-sm text-muted-foreground mb-4">Claim all available rewards in a single transaction</p>
              <Button className="w-full bg-gradient-to-r from-primary to-accent">Claim All (5.2 ETH)</Button>
            </Card>

            <Card className="bg-card border-border p-6">
              <h3 className="font-bold mb-4">Claim History</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2">Pool</th>
                      <th className="text-right py-2">Amount</th>
                      <th className="text-left py-2">Type</th>
                      <th className="text-right py-2">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { pool: "UNI", amount: "2.5 ETH", type: "Lottery Win", date: "3 days ago" },
                      { pool: "AAVE", amount: "1.2 ETH", type: "Lottery Win", date: "1 week ago" },
                      { pool: "CURVE", amount: "0.8 ETH", type: "Lottery Win", date: "2 weeks ago" },
                    ].map((item, i) => (
                      <tr key={i} className="border-b border-border">
                        <td className="py-3">{item.pool}</td>
                        <td className="text-right text-accent font-bold">{item.amount}</td>
                        <td>{item.type}</td>
                        <td className="text-right text-muted-foreground">{item.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
