"use client"

import { Button } from "@/components/ui/button"

interface RewardCardProps {
  poolName: string
  amount: string
  currency: string
  claimable: boolean
  onClaim?: () => void
}

export function RewardCard({ poolName, amount, currency, claimable, onClaim }: RewardCardProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-medium">{poolName}</h4>
        <span className="text-lg font-bold text-accent">
          {amount} {currency}
        </span>
      </div>
      <Button className="w-full" variant={claimable ? "default" : "outline"} disabled={!claimable} onClick={onClaim}>
        {claimable ? "Claim Reward" : "Not Claimable"}
      </Button>
    </div>
  )
}
