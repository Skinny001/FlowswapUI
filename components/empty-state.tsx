import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ExternalLink } from 'lucide-react'

export function EmptyState() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>No Data Yet</CardTitle>
      </CardHeader>
      <CardContent className="text-center py-8">
        <div className="space-y-4">
          <div className="text-muted-foreground">
            <p>Your subgraph is deployed and ready!</p>
            <p className="text-sm">Create some pools and make transactions to see live data.</p>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm font-medium">Quick start:</p>
            <ol className="text-sm text-muted-foreground space-y-1 text-left max-w-md mx-auto">
              <li>1. Deploy test tokens on Base Sepolia</li>
              <li>2. Create a pool using your factory contract</li>
              <li>3. Execute swaps to generate events</li>
              <li>4. Add liquidity to pools</li>
            </ol>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <Button variant="outline" size="sm" asChild>
              <a 
                href="https://thegraph.com/studio/subgraph/flow-swap-subgraph"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                View Subgraph Studio
                <ExternalLink className="w-3 h-3" />
              </a>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a 
                href={`https://sepolia.basescan.org/address/${process.env.NEXT_PUBLIC_FACTORY_ADDRESS}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                View Factory Contract
                <ExternalLink className="w-3 h-3" />
              </a>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}