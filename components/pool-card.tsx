"use client"

import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface PoolCardProps {
  tokenName: string
  tokenSymbol: string
  address: string
  participants: number
  totalPoints: number
  lotteryPrize: string
}

export function PoolCard({ tokenName, tokenSymbol, address, participants, totalPoints, lotteryPrize }: PoolCardProps) {
  const router = useRouter()
  const short = `${address.slice(0, 6)}...${address.slice(-4)}`

  const handleViewDetails = () => {
    router.push(`/hooks/${address}`)
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:border-accent/50 transition">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-bold text-lg">{tokenName}</h3>
          <p className="text-sm text-muted-foreground">{tokenSymbol}</p>
        </div>
        <Badge variant="outline" className="text-accent">
          {participants} members
        </Badge>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Total Points</span>
          <span className="font-medium">{totalPoints.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Lottery Prize</span>
          <span className="font-medium text-accent">{lotteryPrize} ETH</span>
        </div>
      </div>

      <code className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded block mb-4">{short}</code>

      <Button className="w-full bg-gradient-to-r from-primary to-accent" onClick={handleViewDetails}>
        View Details
      </Button>
    </div>
  )
}
