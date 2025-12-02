"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAccount } from "wagmi"
import { AlertCircle, CheckCircle2, Loader2, ExternalLink } from "lucide-react"
import { formatEther } from "viem"
import { 
  useComputeHookAddress, 
  useFactoryWrite, 
  useTokenInfo,
  usePlatformFee 
} from "@/contracts/hooks"
import { FACTORY_ABI } from "@/contracts/config"

export default function DeployPage() {
  const { address, isConnected } = useAccount()
  const [step, setStep] = useState(1)
  const [deploymentSalt, setDeploymentSalt] = useState<`0x${string}`>()
  const [isDeploying, setIsDeploying] = useState(false)
  const [deployedHookAddress, setDeployedHookAddress] = useState<`0x${string}`>()
  const [formData, setFormData] = useState({
    tokenAddress: "",
    pointsRatio: "",
    metadataUri: "",
    feePercentage: "5",
    lotteryThreshold: "",
    vrfSubscriptionId: "",
    keyHash: "0x8af398995b04c28e9951adb9721ef74c74f93e6a478f39e7e0777be13527e7ef",
  })

  // Contract hooks
  const { writeContractAsync: writeFactory } = useFactoryWrite()
  const { data: platformFee } = usePlatformFee()

  // Token validation
  const tokenInfo = useTokenInfo(
    formData.tokenAddress && formData.tokenAddress.startsWith('0x') && formData.tokenAddress.length === 42
      ? formData.tokenAddress as `0x${string}`
      : undefined
  )

  // Generate a random salt on component mount
  useEffect(() => {
    if (!deploymentSalt) {
      const randomSalt = `0x${Array.from({ length: 64 }, () => 
        Math.floor(Math.random() * 16).toString(16)
      ).join('')}` as `0x${string}`
      setDeploymentSalt(randomSalt)
    }
  }, [deploymentSalt])

  // Compute hook address
  const { data: computedHookAddress } = useComputeHookAddress(
    formData.tokenAddress as `0x${string}`,
    formData.pointsRatio ? BigInt(formData.pointsRatio) : undefined,
    formData.metadataUri,
    deploymentSalt
  )

  useEffect(() => {
    if (!isConnected) {
      console.log("[v0] Wallet not connected, user should connect first")
    }
  }, [isConnected])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleDeploy = async () => {
    if (!isConnected || !deploymentSalt || !computedHookAddress) return

    try {
      setIsDeploying(true)

      const txHash = await writeFactory({
        abi: FACTORY_ABI,
        address: process.env.NEXT_PUBLIC_FACTORY_ADDRESS as `0x${string}`,
        functionName: 'createPointsSystem',
        args: [
          formData.tokenAddress as `0x${string}`,
          BigInt(formData.pointsRatio),
          formData.metadataUri,
          deploymentSalt,
          computedHookAddress
        ]
      })

      // Wait for transaction confirmation
      console.log('Transaction hash:', txHash)
      setDeployedHookAddress(computedHookAddress)
      
    } catch (error) {
      console.error('Deployment failed:', error)
    } finally {
      setIsDeploying(false)
    }
  }

  const steps = [
    { number: 1, title: "Token Config" },
    { number: 2, title: "Points Setup" },
    { number: 3, title: "Lottery Config" },
    { number: 4, title: "Review & Deploy" },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!isConnected && (
          <Alert className="mb-8 border-yellow-500/50 bg-yellow-500/10">
            <AlertCircle className="h-4 w-4 text-yellow-500" />
            <AlertDescription className="text-yellow-700">
              Please connect your wallet to Base Sepolia testnet to deploy a hook.
            </AlertDescription>
          </Alert>
        )}

        <div className="mb-12">
          <div className="flex justify-between mb-4">
            {steps.map((s) => (
              <div key={s.number} className="flex-1 mr-4">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full font-bold mb-2 ${
                    step >= s.number
                      ? "bg-linear-to-r from-primary to-accent text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {s.number}
                </div>
                <p className="text-sm text-muted-foreground text-center">{s.title}</p>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            {steps.map((s) => (
              <div
                key={s.number}
                className={`flex-1 h-1 rounded-full transition ${
                  step > s.number ? "bg-accent" : step === s.number ? "bg-accent" : "bg-muted"
                }`}
              />
            ))}
          </div>
        </div>

        {step === 1 && (
          <Card className="bg-card border-border p-8">
            <h2 className="text-2xl font-bold mb-6">Step 1: Token Configuration</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Token Address</label>
                <Input
                  placeholder="0x..."
                  name="tokenAddress"
                  value={formData.tokenAddress}
                  onChange={handleInputChange}
                  className="bg-input border-border"
                  disabled={!isConnected}
                />
                <p className="text-xs text-muted-foreground mt-2">Must be a valid ERC20 contract</p>
              </div>

              {formData.tokenAddress && tokenInfo.name.data && (
                <div className="bg-muted/50 border border-border rounded-lg p-4">
                  <p className="text-sm font-medium mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    Token Info Preview
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Name</p>
                      <p className="font-medium">{tokenInfo.name.data || "Loading..."}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Symbol</p>
                      <p className="font-medium">{tokenInfo.symbol.data || "Loading..."}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Decimals</p>
                      <p className="font-medium">{tokenInfo.decimals.data?.toString() || "Loading..."}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Address</p>
                      <p className="font-mono text-xs">{formData.tokenAddress.slice(0, 10)}...</p>
                    </div>
                  </div>
                </div>
              )}

              {formData.tokenAddress && tokenInfo.name.isError && (
                <Alert className="border-red-500/50 bg-red-500/10">
                  <AlertCircle className="h-4 w-4 text-red-500" />
                  <AlertDescription className="text-red-700">
                    Invalid token address. Please verify the contract address.
                  </AlertDescription>
                </Alert>
              )}

              {computedHookAddress && (
                <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
                  <p className="text-sm font-medium mb-3">Predicted Hook Address</p>
                  <div className="flex items-center gap-2">
                    <code className="font-mono text-sm bg-muted px-2 py-1 rounded">
                      {computedHookAddress}
                    </code>
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <Button
                  onClick={() => setStep(2)}
                  className="bg-linear-to-r from-primary to-accent flex-1"
                  disabled={!formData.tokenAddress || !isConnected}
                >
                  Continue
                </Button>
              </div>
            </div>
          </Card>
        )}

        {step === 2 && (
          <Card className="bg-card border-border p-8">
            <h2 className="text-2xl font-bold mb-6">Step 2: Points Setup</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Points Ratio</label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    placeholder="1"
                    name="pointsRatio"
                    value={formData.pointsRatio}
                    onChange={handleInputChange}
                    min="1"
                    className="bg-input border-border"
                    disabled={!isConnected}
                  />
                  <div className="px-4 py-2 bg-muted rounded border border-border text-sm font-medium">
                    points per $1 swap
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Metadata URI (IPFS)</label>
                <Textarea
                  placeholder="ipfs://QmXxxx..."
                  name="metadataUri"
                  value={formData.metadataUri}
                  onChange={handleInputChange}
                  className="bg-input border-border"
                  disabled={!isConnected}
                />
              </div>

              {formData.pointsRatio && (
                <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
                  <p className="text-sm font-medium mb-3">Points Preview</p>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-xs text-muted-foreground">$10 swap</p>
                      <p className="text-lg font-bold text-accent">{Number(formData.pointsRatio) * 10} pts</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">$100 swap</p>
                      <p className="text-lg font-bold text-accent">{Number(formData.pointsRatio) * 100} pts</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">$1,000 swap</p>
                      <p className="text-lg font-bold text-accent">{Number(formData.pointsRatio) * 1000} pts</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1" disabled={!isConnected}>
                  Back
                </Button>
                <Button
                  onClick={() => setStep(3)}
                  className="bg-linear-to-r from-primary to-accent flex-1"
                  disabled={!formData.pointsRatio || !formData.metadataUri || !isConnected}
                >
                  Continue
                </Button>
              </div>
            </div>
          </Card>
        )}

        {step === 3 && (
          <Card className="bg-card border-border p-8">
            <h2 className="text-2xl font-bold mb-6">Step 3: Lottery Configuration</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Fee Percentage</label>
                <div className="flex gap-2">
                  <Input
                    type="range"
                    min="0"
                    max="10"
                    name="feePercentage"
                    value={formData.feePercentage || 5}
                    onChange={handleInputChange}
                    className="flex-1"
                    disabled={!isConnected}
                  />
                  <div className="px-4 py-2 bg-muted rounded border border-border text-sm font-medium w-16 text-center">
                    {formData.feePercentage || 5}%
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Lottery Threshold (ETH)</label>
                <Input
                  type="number"
                  placeholder="1.5"
                  step="0.1"
                  name="lotteryThreshold"
                  value={formData.lotteryThreshold}
                  onChange={handleInputChange}
                  className="bg-input border-border"
                  disabled={!isConnected}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">VRF Subscription ID</label>
                <Input
                  placeholder="123456"
                  name="vrfSubscriptionId"
                  value={formData.vrfSubscriptionId}
                  onChange={handleInputChange}
                  className="bg-input border-border"
                  disabled={!isConnected}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Key Hash</label>
                <Select disabled={!isConnected}>
                  <SelectTrigger className="bg-input border-border">
                    <SelectValue placeholder="Select key hash..." />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    <SelectItem value="hash1">
                      0x8af398995b04c28e9951adb9721ef74c74f93e6a478f39e7e0777be13527e7ef
                    </SelectItem>
                    <SelectItem value="hash2">
                      0x4b09e658ed251bcafeebbc69b370a0e58751aa2653431d598d612befd9f2a391
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep(2)} className="flex-1" disabled={!isConnected}>
                  Back
                </Button>
                <Button
                  onClick={() => setStep(4)}
                  className="bg-linear-to-r from-primary to-accent flex-1"
                  disabled={!formData.lotteryThreshold || !formData.vrfSubscriptionId || !isConnected}
                >
                  Continue
                </Button>
              </div>
            </div>
          </Card>
        )}

        {step === 4 && !deployedHookAddress && (
          <div className="space-y-6">
            <Card className="bg-card border-border p-8">
              <h2 className="text-2xl font-bold mb-6">Review Configuration</h2>

              <div className="space-y-4 mb-8">
                <div className="border-b border-border pb-4">
                  <p className="text-xs text-muted-foreground mb-1">Token Address</p>
                  <p className="font-mono text-sm">{formData.tokenAddress}</p>
                </div>
                <div className="border-b border-border pb-4">
                  <p className="text-xs text-muted-foreground mb-1">Points Ratio</p>
                  <p className="font-medium">{formData.pointsRatio} points per $1 swap</p>
                </div>
                <div className="border-b border-border pb-4">
                  <p className="text-xs text-muted-foreground mb-1">Fee Percentage</p>
                  <p className="font-medium">{formData.feePercentage || 5}%</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Lottery Threshold</p>
                  <p className="font-medium">{formData.lotteryThreshold} ETH</p>
                </div>
              </div>

              <div className="bg-muted/50 border border-border rounded-lg p-4 mb-6">
                <p className="text-sm font-medium mb-2">Platform Fee</p>
                <p className="text-2xl font-bold text-accent">
                  {platformFee ? `${platformFee}%` : "Loading..."}
                </p>
                <p className="text-xs text-muted-foreground mt-1">Fee charged by FlowSwap protocol</p>
              </div>

              {computedHookAddress && (
                <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 mb-6">
                  <p className="text-sm font-medium mb-2">Hook Address (CREATE2)</p>
                  <code className="font-mono text-xs bg-muted px-2 py-1 rounded block">
                    {computedHookAddress}
                  </code>
                </div>
              )}

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep(3)} className="flex-1" disabled={!isConnected || isDeploying}>
                  Back
                </Button>
                <Button 
                  className="bg-linear-to-r from-primary to-accent flex-1" 
                  disabled={!isConnected || isDeploying || !computedHookAddress}
                  onClick={handleDeploy}
                >
                  {isDeploying ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Deploying...
                    </>
                  ) : (
                    "Deploy Hook"
                  )}
                </Button>
              </div>
            </Card>

            <Card className="bg-accent/10 border border-accent/20 p-6">
              <h3 className="font-bold mb-3">📋 Next Steps After Deployment</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex gap-2">
                  <span className="text-accent">✓</span>
                  <span>View your hook dashboard</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-accent">✓</span>
                  <span>Share hook address with traders</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-accent">✓</span>
                  <span>Monitor points distribution and earnings</span>
                </li>
              </ul>
            </Card>
          </div>
        )}

        {deployedHookAddress && (
          <div className="space-y-6">
            <Card className="bg-green-500/10 border border-green-500/20 p-8 text-center">
              <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-4">Hook Deployed Successfully! 🎉</h2>
              
              <div className="bg-muted/50 border border-border rounded-lg p-4 mb-6">
                <p className="text-sm font-medium mb-2">Your Hook Address</p>
                <div className="flex items-center gap-2 justify-center">
                  <code className="font-mono text-sm bg-muted px-3 py-2 rounded">
                    {deployedHookAddress}
                  </code>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigator.clipboard.writeText(deployedHookAddress)}
                  >
                    Copy
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">Token</p>
                  <p className="font-medium">{tokenInfo.symbol.data}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">Points Ratio</p>
                  <p className="font-medium">{formData.pointsRatio}:1</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => window.open(`https://sepolia.basescan.org/address/${deployedHookAddress}`, '_blank')}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View on BaseScan
                </Button>
                <Button
                  className="bg-linear-to-r from-primary to-accent flex-1"
                  onClick={() => {
                    // Navigate to hook dashboard
                    window.location.href = `/hooks/${deployedHookAddress}`
                  }}
                >
                  View Dashboard
                </Button>
              </div>
            </Card>

            <Card className="bg-accent/10 border border-accent/20 p-6">
              <h3 className="font-bold mb-3">📋 Next Steps</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex gap-2">
                  <span className="text-accent">✓</span>
                  <span>Hook is now active on Uniswap V4</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-accent">✓</span>
                  <span>Users can start earning points by swapping {tokenInfo.symbol.data}</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-accent">✓</span>
                  <span>Monitor activity and rewards on your dashboard</span>
                </li>
              </ul>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
