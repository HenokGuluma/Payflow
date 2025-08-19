import { CheckCircle, Shield, Zap, Globe } from "lucide-react"

export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-6">About PayFlow</h2>
          <p className="text-xl text-slate-600 leading-relaxed">
            We're revolutionizing digital payments across Africa and beyond. Our mission is to make financial
            transactions seamless, secure, and accessible for businesses of all sizes.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Our Story</h3>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Founded in 2020, PayFlow emerged from a simple observation: businesses across Africa needed better payment
              solutions. We started with a vision to bridge the gap between traditional banking and modern digital
              commerce.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Today, we serve thousands of businesses, processing millions in transactions monthly, and continue to
              innovate in the fintech space with cutting-edge security and user experience.
            </p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-2xl">
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">5K+</div>
                <div className="text-slate-600">Active Merchants</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">ETB 2B+</div>
                <div className="text-slate-600">Processed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">99.9%</div>
                <div className="text-slate-600">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">15+</div>
                <div className="text-slate-600">Countries</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-green-600" />
            </div>
            <h4 className="font-semibold text-slate-900 mb-2">Security First</h4>
            <p className="text-slate-600 text-sm">Bank-level encryption and PCI DSS compliance</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-green-600" />
            </div>
            <h4 className="font-semibold text-slate-900 mb-2">Lightning Fast</h4>
            <p className="text-slate-600 text-sm">Instant payments and real-time processing</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Globe className="w-8 h-8 text-green-600" />
            </div>
            <h4 className="font-semibold text-slate-900 mb-2">Global Reach</h4>
            <p className="text-slate-600 text-sm">Accept payments from anywhere in the world</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h4 className="font-semibold text-slate-900 mb-2">Reliable</h4>
            <p className="text-slate-600 text-sm">99.9% uptime with 24/7 monitoring</p>
          </div>
        </div>
      </div>
    </section>
  )
}
