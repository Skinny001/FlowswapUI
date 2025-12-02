"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StatsCard } from "@/components/stats-card"


export default function MyPointsPage() {
  const [activeTab, setActiveTab] = useState("overview")

  // Mock activity removed - will be replaced by subgraph data

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
              <StatsCard label="Total Points" value="0" subtitle="across all pools" />
              <StatsCard label="Total Rewards" value="0 ETH" subtitle="available to claim" />
              <StatsCard label="Lifetime Earnings" value="0 ETH" subtitle="all time" />
              <StatsCard label="Active Pools" value="0" />
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-card border-border p-6 md:col-span-2">
                <h3 className="font-bold mb-4">Activity Timeline</h3>
                <p className="text-muted-foreground text-center py-8">
                  Activity history will be displayed here once subgraph is implemented
                </p>
              </Card>

              <Card className="bg-card border-border p-6">
                <h3 className="font-bold mb-4">Rewards Summary</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Pending Claims</p>
                    <p className="text-2xl font-bold text-accent">0 ETH</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Claimed This Month</p>
                    <p className="text-lg font-bold">0 ETH</p>
                  </div>
                  <Button className="w-full bg-linear-to-r from-primary to-accent" disabled>
                    No Rewards Available
                  </Button>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Tab 2: My Points */}
          <TabsContent value="points" className="space-y-6">
            <Card className="bg-card border-border p-6">
              <h3 className="font-bold mb-4">Points by Pool</h3>
              <p className="text-muted-foreground text-center py-8">
                Connect your wallet and participate in pools to earn points
              </p>
            </Card>

            <Card className="bg-card border-border p-6">
              <h3 className="font-bold mb-4">Transaction History</h3>
              <p className="text-muted-foreground text-center py-8">
                Transaction history will be available once subgraph indexing is implemented
              </p>
            </Card>
          </TabsContent>

          {/* Tab 3: Claim Rewards */}
          <TabsContent value="rewards" className="space-y-6">
            <Card className="bg-card border-border p-6">
              <h3 className="font-bold mb-4">Claimable Rewards</h3>
              <p className="text-muted-foreground text-center py-8">
                No rewards available to claim. Participate in pools and win lotteries to earn rewards!
              </p>
            </Card>

            <Card className="bg-accent/10 border border-accent/20 p-6">
              <h3 className="font-bold mb-3">Quick Claim</h3>
              <p className="text-sm text-muted-foreground mb-4">Claim all available rewards in a single transaction</p>
              <Button className="w-full bg-linear-to-r from-primary to-accent" disabled>
                No Rewards to Claim
              </Button>
            </Card>

            <Card className="bg-card border-border p-6">
              <h3 className="font-bold mb-4">Claim History</h3>
              <p className="text-muted-foreground text-center py-8">
                Claim history will be displayed here once subgraph is implemented
              </p>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
