"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { ArrowRight, Zap, Target, Users, TrendingUp, Lock, Gauge } from "lucide-react"

export default function Landing() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary">
                  Incentivize Swaps
                </span>
                <br />
                on Uniswap V4
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Deploy points systems and lottery rewards directly on your token. Automate incentives, reward loyal
                traders, and build community engagement without any coding.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/deploy">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-gradient-to-r from-primary to-accent hover:shadow-lg"
                  >
                    Deploy Hook
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/explore">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
                    Explore Hooks
                  </Button>
                </Link>
              </div>
            </div>

            {/* Feature cards */}
            <div className="grid gap-4">
              <Card className="bg-card/50 backdrop-blur border-border p-6 hover:bg-card/80 transition">
                <Zap className="h-8 w-8 text-accent mb-3" />
                <h3 className="font-bold mb-2">Points System</h3>
                <p className="text-sm text-muted-foreground">
                  Award points automatically when users swap on your token. Configurable ratios per swap amount.
                </p>
              </Card>
              <Card className="bg-card/50 backdrop-blur border-border p-6 hover:bg-card/80 transition">
                <Target className="h-8 w-8 text-accent mb-3" />
                <h3 className="font-bold mb-2">Lottery Rewards</h3>
                <p className="text-sm text-muted-foreground">
                  Accumulated fees trigger random winner selection with Chainlink VRF for fairness
                </p>
              </Card>
              <Card className="bg-card/50 backdrop-blur border-border p-6 hover:bg-card/80 transition">
                <Lock className="h-8 w-8 text-accent mb-3" />
                <h3 className="font-bold mb-2">On-Chain Verified</h3>
                <p className="text-sm text-muted-foreground">
                  All rewards determined trustlessly on-chain via smart contracts
                </p>
              </Card>
            </div>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-4 mb-20">
            <Card className="bg-card border-border p-6 text-center hover:border-accent/50 transition">
              <div className="text-3xl font-bold text-accent mb-1">1.2K+</div>
              <div className="text-sm text-muted-foreground">Hooks Deployed</div>
            </Card>
            <Card className="bg-card border-border p-6 text-center hover:border-accent/50 transition">
              <div className="text-3xl font-bold text-accent mb-1">$4.2M</div>
              <div className="text-sm text-muted-foreground">Rewards Distributed</div>
            </Card>
            <Card className="bg-card border-border p-6 text-center hover:border-accent/50 transition">
              <div className="text-3xl font-bold text-accent mb-1">48.5K</div>
              <div className="text-sm text-muted-foreground">Active Users</div>
            </Card>
            <Card className="bg-card border-border p-6 text-center hover:border-accent/50 transition">
              <div className="text-3xl font-bold text-accent mb-1">99.8%</div>
              <div className="text-sm text-muted-foreground">Uptime</div>
            </Card>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="bg-card/30 border-y border-border py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">How FlowSwap Works</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Three simple steps to launch your incentive system and reward your community
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Deploy Your Hook</h3>
                <p className="text-muted-foreground mb-4">
                  Configure your token, points ratio, and lottery settings. Get deployed in 4 simple steps.
                </p>
                <ul className="text-sm text-muted-foreground text-left space-y-2">
                  <li>✓ Set points per swap</li>
                  <li>✓ Configure lottery fee</li>
                  <li>✓ Set threshold</li>
                </ul>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Users Earn Points</h3>
                <p className="text-muted-foreground mb-4">
                  When users swap on Uniswap V4, your hook automatically awards points to their wallet.
                </p>
                <ul className="text-sm text-muted-foreground text-left space-y-2">
                  <li>✓ Real-time points</li>
                  <li>✓ ERC1155 NFTs</li>
                  <li>✓ Automatic tracking</li>
                </ul>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Trigger Lotteries</h3>
                <p className="text-muted-foreground mb-4">
                  When fees hit threshold, randomly select winners and distribute ETH rewards fairly.
                </p>
                <ul className="text-sm text-muted-foreground text-left space-y-2">
                  <li>✓ Chainlink VRF</li>
                  <li>✓ Fair selection</li>
                  <li>✓ Automatic claims</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Everything you need to build engaging incentive systems
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-card/50 border-border p-8 hover:bg-card/80 transition">
              <Users className="h-8 w-8 text-accent mb-4" />
              <h3 className="text-xl font-bold mb-3">Community Engagement</h3>
              <p className="text-muted-foreground">
                Build loyalty by rewarding your most active traders. Points can be earned, tracked, and claimed in
                real-time.
              </p>
            </Card>

            <Card className="bg-card/50 border-border p-8 hover:bg-card/80 transition">
              <Gauge className="h-8 w-8 text-accent mb-4" />
              <h3 className="text-xl font-bold mb-3">Full Control</h3>
              <p className="text-muted-foreground">
                Manage all parameters: points ratio, lottery percentage, threshold. Update anytime without redeployment.
              </p>
            </Card>

            <Card className="bg-card/50 border-border p-8 hover:bg-card/80 transition">
              <TrendingUp className="h-8 w-8 text-accent mb-4" />
              <h3 className="text-xl font-bold mb-3">Analytics Dashboard</h3>
              <p className="text-muted-foreground">
                Track points distributed, active participants, fees collected, and lottery history in real-time.
              </p>
            </Card>

            <Card className="bg-card/50 border-border p-8 hover:bg-card/80 transition">
              <Zap className="h-8 w-8 text-accent mb-4" />
              <h3 className="text-xl font-bold mb-3">Zero Configuration</h3>
              <p className="text-muted-foreground">
                No smart contract coding needed. Deploy your incentive system in minutes using our UI wizard.
              </p>
            </Card>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="bg-card/30 border-y border-border py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Use Cases</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                FlowSwap works for any token looking to drive trading volume and build community
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-card border-border p-6">
                <h4 className="font-bold mb-2">DeFi Protocols</h4>
                <p className="text-sm text-muted-foreground">
                  Incentivize liquidity provision and trading on your DEX with point rewards.
                </p>
              </Card>

              <Card className="bg-card border-border p-6">
                <h4 className="font-bold mb-2">Token Projects</h4>
                <p className="text-sm text-muted-foreground">
                  Build community engagement and increase trading volume around your token launch.
                </p>
              </Card>

              <Card className="bg-card border-border p-6">
                <h4 className="font-bold mb-2">NFT Communities</h4>
                <p className="text-sm text-muted-foreground">
                  Reward your holders with points and NFT-based loyalty systems.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-border p-12 text-center">
            <h2 className="text-4xl font-bold mb-4">Ready to Launch Your Incentive System?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto text-lg">
              Deploy in minutes. No coding required. Full control over points ratios, fees, and lottery parameters.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/deploy">
                <Button size="lg" className="bg-gradient-to-r from-primary to-accent">
                  Start Deploying Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/explore">
                <Button size="lg" variant="outline">
                  Browse Existing Hooks
                </Button>
              </Link>
            </div>
          </Card>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
