import { Card } from "@/components/ui/card"
import { Shield, Zap, Globe, Code, BarChart3, Headphones } from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      icon: Shield,
      title: "Bank-Level Security",
      description: "PCI DSS compliant with end-to-end encryption and fraud protection.",
      color: "text-green-500",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Process payments in seconds with our optimized infrastructure.",
      color: "text-yellow-500",
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Accept payments from customers worldwide with local payment methods.",
      color: "text-blue-500",
    },
    {
      icon: Code,
      title: "Developer Friendly",
      description: "Simple APIs, comprehensive docs, and SDKs for all major platforms.",
      color: "text-purple-500",
    },
    {
      icon: BarChart3,
      title: "Real-time Analytics",
      description: "Track performance with detailed insights and reporting tools.",
      color: "text-orange-500",
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Get help when you need it with our dedicated support team.",
      color: "text-red-500",
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Why Choose PayFlow?</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Built for businesses of all sizes, from startups to enterprises. Experience the future of payments today.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="p-6 bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="space-y-4">
                <div className={`w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center`}>
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-semibold text-slate-900">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
