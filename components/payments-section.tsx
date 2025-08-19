"use client"

import { CreditCard, Smartphone, Banknote, QrCode } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function PaymentsSection() {
  return (
    <section id="payments" className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-6">Payment Methods</h2>
          <p className="text-xl text-slate-600">
            Accept payments through multiple channels and give your customers the flexibility they need
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CreditCard className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-4 text-center">Card Payments</h3>
            <p className="text-slate-600 text-center mb-6">
              Accept Visa, Mastercard, and local cards with advanced fraud protection
            </p>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>• 3D Secure authentication</li>
              <li>• Real-time fraud detection</li>
              <li>• Instant settlement</li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Smartphone className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-4 text-center">Mobile Money</h3>
            <p className="text-slate-600 text-center mb-6">
              Integrate with popular mobile money services across Africa
            </p>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>• M-Pesa integration</li>
              <li>• MTN Mobile Money</li>
              <li>• Airtel Money</li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Banknote className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-4 text-center">Bank Transfers</h3>
            <p className="text-slate-600 text-center mb-6">Direct bank transfers with automated reconciliation</p>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>• Instant bank transfers</li>
              <li>• Auto-reconciliation</li>
              <li>• Multi-currency support</li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <QrCode className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-4 text-center">QR Payments</h3>
            <p className="text-slate-600 text-center mb-6">Generate QR codes for contactless payments</p>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>• Dynamic QR codes</li>
              <li>• Contactless payments</li>
              <li>• Real-time notifications</li>
            </ul>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to start accepting payments?</h3>
          <p className="text-green-100 mb-6">Get started with our payment gateway in minutes</p>
          <Link href="/login">
            <Button className="bg-white text-green-600 hover:bg-gray-100">Start Integration</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
