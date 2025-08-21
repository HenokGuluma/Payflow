"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import Link from "next/link"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setIsMenuOpen(false) // Close mobile menu after clicking
    }
  }

  return (
    <header className="bg-slate-900 text-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">P</span>
            </div>
            <span className="text-xl font-bold">PayEthio</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection("about")} className="hover:text-green-400 transition-colors">
              About PayEthio
            </button>
            <button onClick={() => scrollToSection("payments")} className="hover:text-green-400 transition-colors">
              Payments
            </button>
            <button onClick={() => scrollToSection("products")} className="hover:text-green-400 transition-colors">
              Products
            </button>
            <button onClick={() => scrollToSection("developers")} className="hover:text-green-400 transition-colors">
              Developers
            </button>
            <button onClick={() => scrollToSection("resources")} className="hover:text-green-400 transition-colors">
              Resources
            </button>
            <button onClick={() => scrollToSection("pricing")} className="hover:text-green-400 transition-colors">
              Pricing
            </button>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/login">
              <Button variant="ghost" className="text-white hover:text-green-400">
                Login
              </Button>
            </Link>
            <Link href="/register">
              <Button className="bg-green-500 hover:bg-green-600 text-white">Get Started</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-slate-700 pt-4">
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => scrollToSection("about")}
                className="hover:text-green-400 transition-colors text-left"
              >
                About PayEthio
              </button>
              <button
                onClick={() => scrollToSection("payments")}
                className="hover:text-green-400 transition-colors text-left"
              >
                Payments
              </button>
              <button
                onClick={() => scrollToSection("products")}
                className="hover:text-green-400 transition-colors text-left"
              >
                Products
              </button>
              <button
                onClick={() => scrollToSection("developers")}
                className="hover:text-text-green-400 transition-colors text-left"
              >
                Developers
              </button>
              <button
                onClick={() => scrollToSection("resources")}
                className="hover:text-green-400 transition-colors text-left"
              >
                Resources
              </button>
              <button
                onClick={() => scrollToSection("pricing")}
                className="hover:text-green-400 transition-colors text-left"
              >
                Pricing
              </button>
              <div className="flex flex-col space-y-2 pt-4">
                <Link href="/login">
                  <Button variant="ghost" className="text-white hover:text-green-400 justify-start w-full">
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="bg-green-500 hover:bg-green-600 text-white w-full">Get Started</Button>
                </Link>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}