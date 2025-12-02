"use client"

import { useState, useMemo } from "react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { PoolCard } from "@/components/pool-card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useHookCount } from "@/contracts/hooks"
import { useAccount } from "wagmi"
import { useRealHookData } from "@/hooks/useRealHookData"
import { Loader2 } from "lucide-react"

export default function ExplorePage() {
  const { isConnected } = useAccount()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedNetwork, setSelectedNetwork] = useState("all")
  
  // Get total number of deployed hooks
  const { data: hookCount, isLoading: hookCountLoading } = useHookCount()
  
  // Get real hook data for the first several hooks
  const hook0 = useRealHookData(0)
  const hook1 = useRealHookData(1)
  const hook2 = useRealHookData(2)
  const hook3 = useRealHookData(3)
  const hook4 = useRealHookData(4)
  const hook5 = useRealHookData(5)
  
  // Combine all hooks, filtering out loading/error states
  const allHooks = useMemo(() => {
    const hooks = [hook0, hook1, hook2, hook3, hook4, hook5]
    return hooks.filter(hook => !hook.isLoading && !hook.error && hook.address)
  }, [hook0, hook1, hook2, hook3, hook4, hook5])

  const filteredHooks = allHooks.filter(
    (hook) =>
      hook.tokenName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hook.tokenSymbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hook.address.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2">Explore Hooks</h1>
          <p className="text-muted-foreground">Discover and join active incentive systems</p>
        </div>

        {/* Filters */}
        <Card className="bg-card border-border p-6 mb-8">
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Search by Token</label>
              <Input
                placeholder="Search token name, symbol, or address..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-input border-border"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Network</label>
              <Select value={selectedNetwork} onValueChange={setSelectedNetwork}>
                <SelectTrigger className="bg-input border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  <SelectItem value="all">All Networks</SelectItem>
                  <SelectItem value="base">Base</SelectItem>
                  <SelectItem value="ethereum">Ethereum</SelectItem>
                  <SelectItem value="arbitrum">Arbitrum</SelectItem>
                  <SelectItem value="polygon">Polygon</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Sort By</label>
              <Select>
                <SelectTrigger className="bg-input border-border">
                  <SelectValue defaultValue="participants">Most Members</SelectValue>
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  <SelectItem value="participants">Most Members</SelectItem>
                  <SelectItem value="prize">Highest Prize</SelectItem>
                  <SelectItem value="points">Most Points</SelectItem>
                  <SelectItem value="new">Newest</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-4 mb-12">
          <Card className="bg-card border-border p-6 text-center">
            <div className="text-3xl font-bold text-accent mb-1">
              {hookCountLoading ? "..." : (hookCount?.toString() || "0")}
            </div>
            <div className="text-sm text-muted-foreground">Deployed Hooks</div>
          </Card>
          <Card className="bg-card border-border p-6 text-center">
            <div className="text-3xl font-bold text-accent mb-1">
              {allHooks.reduce((acc, h) => acc + h.participants, 0).toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">Total Participants</div>
          </Card>
          <Card className="bg-card border-border p-6 text-center">
            <div className="text-3xl font-bold text-accent mb-1">
              {allHooks.reduce((acc, h) => acc + Number.parseFloat(h.lotteryPrize), 0).toFixed(4)} ETH
            </div>
            <div className="text-sm text-muted-foreground">Total Prize Pool</div>
          </Card>
        </div>

        {/* Loading State */}
        {hookCountLoading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="bg-card border-border p-6">
                <div className="animate-pulse space-y-4">
                  <div className="h-6 bg-muted rounded"></div>
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-muted rounded"></div>
                    <div className="h-4 bg-muted rounded"></div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Hooks Grid */}
        {!hookCountLoading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHooks.map((hook) => (
              <PoolCard
                key={hook.address}
                tokenName={hook.tokenName}
                tokenSymbol={hook.tokenSymbol}
                address={hook.address}
                participants={hook.participants}
                totalPoints={hook.totalPoints}
                lotteryPrize={hook.lotteryPrize}
              />
            ))}
          </div>
        )}

        {!hookCountLoading && filteredHooks.length === 0 && allHooks.length === 0 && (
          <Card className="bg-card border-border p-12 text-center">
            <p className="text-muted-foreground mb-4">No hooks deployed yet</p>
            <Button onClick={() => window.location.href = '/deploy'}>
              Deploy First Hook
            </Button>
          </Card>
        )}

        {!hookCountLoading && filteredHooks.length === 0 && allHooks.length > 0 && (
          <Card className="bg-card border-border p-12 text-center">
            <p className="text-muted-foreground mb-4">No hooks found matching your search</p>
            <Button variant="outline" onClick={() => setSearchTerm("")}>
              Clear Search
            </Button>
          </Card>
        )}
      </div>
    </div>
  )
}
