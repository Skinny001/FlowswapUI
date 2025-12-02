"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ActivityFeed } from "@/components/activity-feed"
import { PoolsList } from "@/components/pools-list"
import { LiveStats } from "@/components/live-stats"
import { SubgraphTest } from "@/components/subgraph-test"
import { SubgraphStatus } from "@/components/subgraph-status"
import { GraphQLDebugger } from "@/components/graphql-debugger"
import { SubgraphDataTest } from "@/components/subgraph-data-test"
import { Badge } from "@/components/ui/badge"

export default function SubgraphPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Live FlowSwap Data</h1>
          <p className="text-muted-foreground text-lg">
            Real-time data from The Graph Protocol subgraph indexing Base Sepolia
          </p>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="outline" className="text-green-400 border-green-400">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></span>
              Live Data
            </Badge>
            <Badge variant="outline">Base Sepolia</Badge>
          </div>
        </div>

        {/* Debug Section */}
        <section className="mb-8">
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <SubgraphStatus />
            <SubgraphTest />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <GraphQLDebugger />
            <SubgraphDataTest />
          </div>
        </section>

        {/* Live Statistics */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Live Statistics</h2>
          <LiveStats />
        </section>

        {/* Activity and Pools */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <section>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ActivityFeed useSubgraphData={true} />
              </CardContent>
            </Card>
          </section>

          <section>
            <Card>
              <CardHeader>
                <CardTitle>All Pools</CardTitle>
              </CardHeader>
              <CardContent>
                <PoolsList limit={5} />
              </CardContent>
            </Card>
          </section>
        </div>

        {/* Subgraph Information */}
        <section className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Subgraph Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-2">Endpoint</h3>
                  <p className="text-sm font-mono bg-muted p-2 rounded">
                    {process.env.NEXT_PUBLIC_SUBGRAPH_URL}
                  </p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Network</h3>
                  <p className="text-sm">Base Sepolia Testnet</p>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Indexed Contracts</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span>Factory Contract:</span>
                    <code className="bg-muted px-2 py-1 rounded">{process.env.NEXT_PUBLIC_FACTORY_ADDRESS}</code>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Hook Contract:</span>
                    <code className="bg-muted px-2 py-1 rounded">{process.env.NEXT_PUBLIC_EXAMPLE_HOOK_ADDRESS}</code>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Available Queries</h3>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div className="bg-muted p-3 rounded">
                    <strong>Pools</strong>
                    <p className="text-muted-foreground">Get all created pools with metadata</p>
                  </div>
                  <div className="bg-muted p-3 rounded">
                    <strong>Swaps</strong>
                    <p className="text-muted-foreground">Track swap execution events</p>
                  </div>
                  <div className="bg-muted p-3 rounded">
                    <strong>Liquidity</strong>
                    <p className="text-muted-foreground">Monitor liquidity additions</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
      
      <Footer />
    </div>
  )
}