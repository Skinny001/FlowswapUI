'use client'

import { Analytics } from "@vercel/analytics/next"
import { useEffect } from 'react'

export function AnalyticsWrapper() {
  useEffect(() => {
    // Suppress analytics-related errors that might be blocked by ad blockers
    const originalError = console.error
    console.error = (...args) => {
      const message = args[0]?.toString?.() || ''
      
      // Filter out known analytics/tracking related errors
      if (
        message.includes('walletconnect.org') ||
        message.includes('pulse.walletconnect.org') ||
        message.includes('ERR_BLOCKED_BY_CLIENT') ||
        message.includes('analytics') ||
        message.includes('tracking')
      ) {
        // Silently ignore these errors
        return
      }
      
      // Log other errors normally
      originalError.apply(console, args)
    }

    return () => {
      console.error = originalError
    }
  }, [])

  // Wrap Analytics in error boundary behavior
  try {
    return <Analytics />
  } catch (error) {
    // If analytics fails to load (blocked by ad blocker), fail silently
    console.warn('Analytics blocked or failed to load')
    return null
  }
}