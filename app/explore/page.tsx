"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { PoolCard } from "@/components/pool-card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ExplorePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedNetwork, setSelectedNetwork] = useState("all")

  const mockHooks = [
    {
      tokenName: "Uniswap",
      tokenSymbol: "UNI",
      address: "0x1111111111111111111111111111111111111111",
      participants: 2843,
      totalPoints: 890000,
      lotteryPrize: "5.2",
    },
    {
      tokenName: "Aave",
      tokenSymbol: "AAVE",
      address: "0x2222222222222222222222222222222222222222",
      participants: 1620,
      totalPoints: 540000,
      lotteryPrize: "3.1",
    },
    {
      tokenName: "Curve",
      tokenSymbol: "CRV",
      address: "0x3333333333333333333333333333333333333333",
      participants: 1205,
      totalPoints: 420000,
      lotteryPrize: "2.4",
    },
    {
      tokenName: "Lido",
      tokenSymbol: "LDO",
      address: "0x4444444444444444444444444444444444444444",
      participants: 980,
      totalPoints: 350000,
      lotteryPrize: "1.8",
    },
    {
      tokenName: "MakerDAO",
      tokenSymbol: "MKR",
      address: "0x5555555555555555555555555555555555555555",
      participants: 745,
      totalPoints: 280000,
      lotteryPrize: "1.5",
    },
    {
      tokenName: "Compound",
      tokenSymbol: "COMP",
      address: "0x6666666666666666666666666666666666666666",
      participants: 623,
      totalPoints: 210000,
      lotteryPrize: "1.2",
    },
  ]

  const filteredHooks = mockHooks.filter(
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
            <div className="text-3xl font-bold text-accent mb-1">{mockHooks.length}</div>
            <div className="text-sm text-muted-foreground">Active Hooks</div>
          </Card>
          <Card className="bg-card border-border p-6 text-center">
            <div className="text-3xl font-bold text-accent mb-1">
              {mockHooks.reduce((acc, h) => acc + h.participants, 0).toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">Total Participants</div>
          </Card>
          <Card className="bg-card border-border p-6 text-center">
            <div className="text-3xl font-bold text-accent mb-1">
              ${mockHooks.reduce((acc, h) => acc + Number.parseFloat(h.lotteryPrize), 0).toFixed(1)}M
            </div>
            <div className="text-sm text-muted-foreground">Total Prize Pool</div>
          </Card>
        </div>

        {/* Hooks Grid */}
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

        {filteredHooks.length === 0 && (
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
