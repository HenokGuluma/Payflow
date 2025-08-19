"use client"

import { Button } from "@/components/ui/button"
import { DashboardMockup } from "@/components/dashboard-mockup"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="container mx-auto px-4 py-20">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="space-y-8">
          <div className="space-y-6">
            <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
              Seamless Payments, <span className="text-green-500">Endless Opportunities!</span>
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              Accept payments from customers across Africa with our secure, fast, and reliable payment gateway.
              Integrate once and access multiple payment methods instantly.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/login">
              <Button size="lg" className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 text-lg">
                Create Account
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-slate-300 text-slate-700 hover:bg-slate-50 px-8 py-4 text-lg bg-transparent"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              Contact Us
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 pt-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-900">5K+</div>
              <div className="text-sm text-slate-600">Active Merchants</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-900">ETB 2B+</div>
              <div className="text-sm text-slate-600">Processed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-900">99.9%</div>
              <div className="text-sm text-slate-600">Uptime</div>
            </div>
          </div>
        </div>

        {/* Right Content - Dashboard Mockup */}
        <div className="relative">
          <DashboardMockup />
        </div>
      </div>
    </section>
  )
}
