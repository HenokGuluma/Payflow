import { Code, Store, Smartphone, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ProductsSection() {
  return (
    <section id="products" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-6">Our Products</h2>
          <p className="text-xl text-slate-600">
            Comprehensive payment solutions tailored for different business needs
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-4">
                <Code className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">PayFlow API</h3>
            </div>
            <p className="text-slate-600 mb-6">
              Powerful REST API for developers to integrate payments into any application. Complete with webhooks, SDKs,
              and comprehensive documentation.
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center text-slate-700">
                <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                RESTful API with JSON responses
              </li>
              <li className="flex items-center text-slate-700">
                <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                SDKs for popular languages
              </li>
              <li className="flex items-center text-slate-700">
                <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                Real-time webhooks
              </li>
              <li className="flex items-center text-slate-700">
                <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                Sandbox environment
              </li>
            </ul>
            <Button className="bg-blue-600 hover:bg-blue-700">View Documentation</Button>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mr-4">
                <Store className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">PayFlow Checkout</h3>
            </div>
            <p className="text-slate-600 mb-6">
              Pre-built checkout pages that you can customize and embed. No coding required - just copy and paste a
              simple link.
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center text-slate-700">
                <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                Customizable checkout pages
              </li>
              <li className="flex items-center text-slate-700">
                <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                Mobile-optimized design
              </li>
              <li className="flex items-center text-slate-700">
                <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                Multiple payment methods
              </li>
              <li className="flex items-center text-slate-700">
                <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                Instant setup
              </li>
            </ul>
            <Button className="bg-green-600 hover:bg-green-700">Try Checkout</Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mr-4">
                <Smartphone className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">PayFlow Mobile</h3>
            </div>
            <p className="text-slate-600 mb-6">
              Accept payments on the go with our mobile app. Perfect for small businesses, market vendors, and service
              providers.
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center text-slate-700">
                <div className="w-2 h-2 bg-purple-600 rounded-full mr-3"></div>
                QR code generation
              </li>
              <li className="flex items-center text-slate-700">
                <div className="w-2 h-2 bg-purple-600 rounded-full mr-3"></div>
                Offline payment collection
              </li>
              <li className="flex items-center text-slate-700">
                <div className="w-2 h-2 bg-purple-600 rounded-full mr-3"></div>
                Real-time notifications
              </li>
              <li className="flex items-center text-slate-700">
                <div className="w-2 h-2 bg-purple-600 rounded-full mr-3"></div>
                Sales analytics
              </li>
            </ul>
            <Button className="bg-purple-600 hover:bg-purple-700">Download App</Button>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-red-50 p-8 rounded-2xl">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mr-4">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">PayFlow Analytics</h3>
            </div>
            <p className="text-slate-600 mb-6">
              Comprehensive dashboard with insights into your payment performance, customer behavior, and business
              growth metrics.
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center text-slate-700">
                <div className="w-2 h-2 bg-orange-600 rounded-full mr-3"></div>
                Real-time transaction monitoring
              </li>
              <li className="flex items-center text-slate-700">
                <div className="w-2 h-2 bg-orange-600 rounded-full mr-3"></div>
                Customer insights
              </li>
              <li className="flex items-center text-slate-700">
                <div className="w-2 h-2 bg-orange-600 rounded-full mr-3"></div>
                Revenue forecasting
              </li>
              <li className="flex items-center text-slate-700">
                <div className="w-2 h-2 bg-orange-600 rounded-full mr-3"></div>
                Custom reports
              </li>
            </ul>
            <Button className="bg-orange-600 hover:bg-orange-700">View Demo</Button>
          </div>
        </div>
      </div>
    </section>
  )
}
