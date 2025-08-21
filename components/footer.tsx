"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">P</span>
              </div>
              <span className="text-xl font-bold">PayEthio</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Empowering Ethiopian businesses with modern, secure, and reliable payment solutions.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                Twitter
              </Button>
              <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                LinkedIn
              </Button>
              <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                GitHub
              </Button>
            </div>
          </div>

          {/* Products */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Products</h3>
            <div className="space-y-2">
              <a href="#" className="block text-slate-400 hover:text-white transition-colors">
                Payment Gateway
              </a>
              <a href="#" className="block text-slate-400 hover:text-white transition-colors">
                Mobile Money
              </a>
              <a href="#" className="block text-slate-400 hover:text-white transition-colors">
                Bank Transfers
              </a>
              <a href="#" className="block text-slate-400 hover:text-white transition-colors">
                Card Processing
              </a>
            </div>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Resources</h3>
            <div className="space-y-2">
              <a href="#" className="block text-slate-400 hover:text-white transition-colors">
                Documentation
              </a>
              <a href="#" className="block text-slate-400 hover:text-white transition-colors">
                API Reference
              </a>
              <a href="#" className="block text-slate-400 hover:text-white transition-colors">
                Support Center
              </a>
              <a href="#" className="block text-slate-400 hover:text-white transition-colors">
                Status Page
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Stay Updated</h3>
            <p className="text-slate-400 text-sm">Get the latest updates on new features and improvements.</p>
            <div className="space-y-2">
              <Input
                placeholder="Enter your email"
                className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-400"
                id="newsletter-email"
              />
              <Button
                className="w-full bg-green-500 hover:bg-green-600"
                onClick={() => {
                  const email = (document.getElementById("newsletter-email") as HTMLInputElement)?.value
                  if (email) {
                    alert("Thank you for subscribing! You will receive updates at " + email)
                    ;(document.getElementById("newsletter-email") as HTMLInputElement).value = ""
                  } else {
                    alert("Please enter your email address")
                  }
                }}
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-400 text-sm">© 2024 PayEthio. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}