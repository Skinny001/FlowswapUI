"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useAppKit } from "@reown/appkit/react"
import { useAppKitAccount, useAppKitNetworkCore } from "@reown/appkit-controllers/react"
import { useHooksByDeployer } from "@/contracts/hooks"
import { Wallet, ChevronDown } from "lucide-react"

export function Navbar() {
  const { open } = useAppKit()
  const { address, isConnected } = useAppKitAccount()
  const { caipNetwork } = useAppKitNetworkCore()
  const displayAddress = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : ""
  
  // Get user's deployed hooks
  const { data: userHooks } = useHooksByDeployer(address as `0x${string}` | undefined)

  return (
    <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <div className="w-8 h-8 rounded-lg bg-linear-to-br from-primary to-accent flex items-center justify-center text-white font-bold">
            FS
          </div>
          <span>FlowSwap</span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link href="/explore" className="text-sm text-muted-foreground hover:text-foreground transition">
            Explore
          </Link>
          <Link href="/my-points" className="text-sm text-muted-foreground hover:text-foreground transition">
            My Points
          </Link>
          <Link href="/deploy" className="text-sm text-muted-foreground hover:text-foreground transition">
            Deploy
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" disabled className="flex items-center gap-1 bg-transparent">
            {caipNetwork?.name || "Base Sepolia"}
            <div className="w-2 h-2 rounded-full bg-green-500" />
          </Button>

          {isConnected ? (
            <Button
              size="sm"
              variant="outline"
              onClick={() => open()}
              className="flex items-center gap-2 bg-linear-to-r from-primary/10 to-accent/10"
            >
              <Wallet className="w-4 h-4" />
              {displayAddress}
              <ChevronDown className="w-3 h-3" />
            </Button>
          ) : (
            <Button
              size="sm"
              className="bg-linear-to-r from-primary to-accent flex items-center gap-2"
              onClick={() => open()}
            >
              <Wallet className="w-4 h-4" />
              Connect Wallet
            </Button>
          )}
        </div>
      </div>
    </nav>
  )
}
