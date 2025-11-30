import Link from "next/link"
import { Github, Twitter, Mail, ExternalLink } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="font-bold text-lg mb-4">FlowSwap</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Incentivize swaps on Uniswap V4 with automated points and lottery rewards.
            </p>
            <p className="text-xs text-muted-foreground">© 2025 FlowSwap. All rights reserved.</p>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/deploy" className="text-sm text-muted-foreground hover:text-foreground transition">
                  Deploy Hook
                </Link>
              </li>
              <li>
                <Link href="/explore" className="text-sm text-muted-foreground hover:text-foreground transition">
                  Explore Hooks
                </Link>
              </li>
              <li>
                <Link href="/my-points" className="text-sm text-muted-foreground hover:text-foreground transition">
                  My Points
                </Link>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition">
                  Documentation
                </a>
              </li>
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground transition flex items-center gap-2"
                >
                  Smart Contracts <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Community Links */}
          <div>
            <h4 className="font-semibold mb-4">Community</h4>
            <div className="flex gap-3 mb-4">
              <a
                href="#"
                className="p-2 rounded-lg bg-card hover:bg-card/80 transition text-muted-foreground hover:text-accent"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-card hover:bg-card/80 transition text-muted-foreground hover:text-accent"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-card hover:bg-card/80 transition text-muted-foreground hover:text-accent"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition">
                  Discord
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition">
                  Twitter
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-muted-foreground">Built on Uniswap V4 • Powered by Chainlink VRF</p>
            <div className="flex gap-6">
              <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition">
                Privacy Policy
              </a>
              <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition">
                Terms of Use
              </a>
              <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
