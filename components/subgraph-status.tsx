import { useQuery } from 'urql'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AlertCircle, CheckCircle, Clock } from 'lucide-react'

const SUBGRAPH_STATUS_QUERY = `
  query SubgraphStatus {
    _meta {
      block {
        number
        hash
      }
      deployment
      hasIndexingErrors
    }
  }
`

export function SubgraphStatus() {
  const [result] = useQuery({ query: SUBGRAPH_STATUS_QUERY })

  const getStatusInfo = () => {
    if (result.fetching) {
      return {
        status: 'checking',
        color: 'yellow',
        icon: Clock,
        message: 'Checking subgraph status...',
        detail: ''
      }
    }

    if (result.error) {
      const errorMessage = result.error.message
      if (errorMessage.includes('HTML') || errorMessage.includes('GraphiQL')) {
        return {
          status: 'syncing',
          color: 'yellow',
          icon: Clock,
          message: 'Subgraph is syncing',
          detail: 'The subgraph is still indexing blockchain data. This may take a few minutes.'
        }
      }
      return {
        status: 'error',
        color: 'red',
        icon: AlertCircle,
        message: 'Connection error',
        detail: errorMessage
      }
    }

    if (result.data) {
      const currentBlock = parseInt(result.data._meta.block.number)
      const hasErrors = result.data._meta.hasIndexingErrors

      if (hasErrors) {
        return {
          status: 'error',
          color: 'red',
          icon: AlertCircle,
          message: 'Indexing errors detected',
          detail: 'The subgraph has encountered indexing errors.'
        }
      }

      return {
        status: 'ready',
        color: 'green',
        icon: CheckCircle,
        message: 'Subgraph is ready',
        detail: `Synced to block ${currentBlock.toLocaleString()}`
      }
    }

    return {
      status: 'unknown',
      color: 'gray',
      icon: AlertCircle,
      message: 'Unknown status',
      detail: ''
    }
  }

  const statusInfo = getStatusInfo()
  const IconComponent = statusInfo.icon

  const getStatusColor = (color: string) => {
    switch (color) {
      case 'green': return 'text-green-400 border-green-400'
      case 'yellow': return 'text-yellow-400 border-yellow-400'
      case 'red': return 'text-red-400 border-red-400'
      default: return 'text-gray-400 border-gray-400'
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <IconComponent className={`w-5 h-5 ${statusInfo.color === 'green' ? 'text-green-400' : statusInfo.color === 'yellow' ? 'text-yellow-400' : 'text-red-400'}`} />
          Subgraph Status
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className={getStatusColor(statusInfo.color)}>
              {statusInfo.message}
            </Badge>
          </div>
          
          {statusInfo.detail && (
            <p className="text-sm text-muted-foreground">
              {statusInfo.detail}
            </p>
          )}

          <div className="text-xs space-y-1">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Endpoint:</span>
              <code className="text-xs">{process.env.NEXT_PUBLIC_SUBGRAPH_URL?.split('/').pop()}</code>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Network:</span>
              <span>Base Sepolia</span>
            </div>
          </div>

          {statusInfo.status === 'syncing' && (
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded p-3 text-sm">
              <p className="font-medium text-yellow-400">🚧 Subgraph Syncing</p>
              <p className="text-muted-foreground mt-1">
                The subgraph is currently indexing blockchain data from your contract deployment blocks. 
                This process may take 5-15 minutes to complete.
              </p>
            </div>
          )}

          {statusInfo.status === 'ready' && result.data && (
            <div className="bg-green-500/10 border border-green-500/20 rounded p-3 text-sm">
              <p className="font-medium text-green-400">✅ Ready to Query</p>
              <p className="text-muted-foreground mt-1">
                Your subgraph is fully synced and ready to serve data!
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}