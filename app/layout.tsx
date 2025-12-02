import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { AnalyticsWrapper } from "@/components/analytics-wrapper"
import { headers } from "next/headers"
import "./globals.css"
import ContextProvider from "@/context"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "FlowSwap - Deploy Uniswap V4 Hooks with Lottery Rewards",
  description:
    "Deploy Uniswap V4 hooks, earn points on swaps, and win rewards through our decentralized lottery system.",
  generator: "v0.app",
}

export const viewport: Viewport = {
  themeColor: "#3a00ff",
  userScalable: true,
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const headersObj = await headers()
  const cookies = headersObj.get("cookie")

  return (
    <html lang="en" className="dark">
      <body className={`font-sans antialiased`}>
        <ContextProvider cookies={cookies}>{children}</ContextProvider>
        <AnalyticsWrapper />
      </body>
    </html>
  )
}
