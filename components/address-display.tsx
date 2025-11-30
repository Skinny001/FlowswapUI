"use client"

interface AddressDisplayProps {
  address: string
  copyable?: boolean
}

export function AddressDisplay({ address, copyable = true }: AddressDisplayProps) {
  const short = `${address.slice(0, 6)}...${address.slice(-4)}`

  return (
    <div className="flex items-center gap-2">
      <code className="text-sm bg-muted px-2 py-1 rounded font-mono">{short}</code>
      {copyable && (
        <button
          onClick={() => navigator.clipboard.writeText(address)}
          className="text-xs text-accent hover:text-accent/80 transition"
        >
          Copy
        </button>
      )}
    </div>
  )
}
