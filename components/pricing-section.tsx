"use client"

import { Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function PricingSection() {
  return (
    <section id="pricing" className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-6">Simple, Transparent Pricing</h2>
          <p className="text-xl text-slate-600">
            No hidden fees, no setup costs. Pay only for successful transactions.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Starter Plan */}
          <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Starter</h3>
              <p className="text-slate-600 mb-6">Perfect for small businesses and startups</p>
              <div className="text-4xl font-bold text-slate-900 mb-2">2.9%</div>
              <div className="text-slate-600">+ $0.30 per transaction</div>
            </div>

            <ul className="space-y-4 mb-8">
              <li className="flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-3" />
                <span className="text-slate-700">Accept all major cards</span>
              </li>
              <li className="flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-3" />
                <span className="text-slate-700">Mobile money integration</span>
              </li>
              <li className="flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-3" />
                <span className="text-slate-700">Basic analytics</span>
              </li>
              <li className="flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-3" />
                <span className="text-slate-700">Email support</span>
              </li>
              <li className="flex items-center">
                <X className="w-5 h-5 text-slate-400 mr-3" />
                <span className="text-slate-400">Advanced fraud protection</span>
              </li>
              <li className="flex items-center">
                <X className="w-5 h-5 text-slate-400 mr-3" />
                <span className="text-slate-400">Priority support</span>
              </li>
            </ul>

            <Link href="/login">
              <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white">Get Started</Button>
            </Link>
          </div>

          {/* Business Plan */}
          <div className="bg-gradient-to-br from-green-600 to-blue-600 rounded-2xl p-8 text-white relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-yellow-400 text-slate-900 px-4 py-1 rounded-full text-sm font-semibold">
                Most Popular
              </span>
            </div>

            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">Business</h3>
              <p className="text-green-100 mb-6">Ideal for growing businesses</p>
              <div className="text-4xl font-bold mb-2">2.4%</div>
              <div className="text-green-100">+ $0.30 per transaction</div>
            </div>

            <ul className="space-y-4 mb-8">
              <li className="flex items-center">
                <Check className="w-5 h-5 text-green-200 mr-3" />
                <span>Everything in Starter</span>
              </li>
              <li className="flex items-center">
                <Check className="w-5 h-5 text-green-200 mr-3" />
                <span>Advanced fraud protection</span>
              </li>
              <li className="flex items-center">
                <Check className="w-5 h-5 text-green-200 mr-3" />
                <span>Advanced analytics</span>
              </li>
              <li className="flex items-center">
                <Check className="w-5 h-5 text-green-200 mr-3" />
                <span>Priority support</span>
              </li>
              <li className="flex items-center">
                <Check className="w-5 h-5 text-green-200 mr-3" />
                <span>Custom branding</span>
              </li>
              <li className="flex items-center">
                <Check className="w-5 h-5 text-green-200 mr-3" />
                <span>Webhook notifications</span>
              </li>
            </ul>

            <Link href="/login">
              <Button className="w-full bg-white text-green-600 hover:bg-gray-100">Get Started</Button>
            </Link>
          </div>

          {/* Enterprise Plan */}
          <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Enterprise</h3>
              <p className="text-slate-600 mb-6">For large-scale operations</p>
              <div className="text-4xl font-bold text-slate-900 mb-2">Custom</div>
              <div className="text-slate-600">Volume-based pricing</div>
            </div>

            <ul className="space-y-4 mb-8">
              <li className="flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-3" />
                <span className="text-slate-700">Everything in Business</span>
              </li>
              <li className="flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-3" />
                <span className="text-slate-700">Dedicated account manager</span>
              </li>
              <li className="flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-3" />
                <span className="text-slate-700">Custom integrations</span>
              </li>
              <li className="flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-3" />
                <span className="text-slate-700">SLA guarantees</span>
              </li>
              <li className="flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-3" />
                <span className="text-slate-700">24/7 phone support</span>
              </li>
              <li className="flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-3" />
                <span className="text-slate-700">White-label solutions</span>
              </li>
            </ul>

            <Link href="/login">
              <Button
                variant="outline"
                className="w-full border-slate-300 text-slate-900 hover:bg-slate-50 bg-transparent"
              >
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-slate-900 mb-4">Need a custom solution?</h3>
          <p className="text-slate-600 mb-6">
            We work with businesses of all sizes to create tailored payment solutions. Contact our sales team to discuss
            your specific requirements.
          </p>
          <Button
            className="bg-green-600 hover:bg-green-700"
            onClick={() => window.open("https://calendly.com/payflow-sales", "_blank")}
          >
            Schedule a Call
          </Button>
        </div>
      </div>
    </section>
  )
}
