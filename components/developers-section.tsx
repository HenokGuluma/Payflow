import { Code2, Book, Terminal, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function DevelopersSection() {
  return (
    <section id="developers" className="py-20 bg-slate-900 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold mb-6">Built for Developers</h2>
          <p className="text-xl text-slate-300">
            Powerful APIs, comprehensive documentation, and developer tools to integrate payments seamlessly
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h3 className="text-2xl font-bold mb-6">Quick Integration</h3>
            <p className="text-slate-300 mb-8">
              Get started with just a few lines of code. Our RESTful API is designed for simplicity and power, allowing
              you to accept payments in minutes, not days.
            </p>

            <div className="bg-slate-800 rounded-lg p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-green-400 text-sm font-mono">JavaScript</span>
                <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                  Copy
                </Button>
              </div>
              <pre className="text-sm text-slate-300 overflow-x-auto">
                {`const payflow = require('payflow-node');

payflow.initialize('your-api-key');

const payment = await payflow.charge({
  amount: 1000,
  currency: 'USD',
  email: 'customer@example.com'
});`}
              </pre>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400 mb-1">5 min</div>
                <div className="text-slate-400 text-sm">Integration Time</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400 mb-1">99.9%</div>
                <div className="text-slate-400 text-sm">API Uptime</div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-slate-800 p-6 rounded-xl">
              <div className="flex items-center mb-4">
                <Book className="w-6 h-6 text-blue-400 mr-3" />
                <h4 className="text-lg font-semibold">Documentation</h4>
              </div>
              <p className="text-slate-300 mb-4">
                Comprehensive guides, API references, and tutorials to get you started quickly.
              </p>
              <Link href="/login">
                <Button variant="outline" className="border-slate-600 text-white hover:bg-slate-700 bg-transparent">
                  View Docs
                </Button>
              </Link>
            </div>

            <div className="bg-slate-800 p-6 rounded-xl">
              <div className="flex items-center mb-4">
                <Terminal className="w-6 h-6 text-green-400 mr-3" />
                <h4 className="text-lg font-semibold">SDKs & Libraries</h4>
              </div>
              <p className="text-slate-300 mb-4">
                Official SDKs for Node.js, Python, PHP, Ruby, and more programming languages.
              </p>
              <Link href="/login">
                <Button variant="outline" className="border-slate-600 text-white hover:bg-slate-700 bg-transparent">
                  Download SDKs
                </Button>
              </Link>
            </div>

            <div className="bg-slate-800 p-6 rounded-xl">
              <div className="flex items-center mb-4">
                <Zap className="w-6 h-6 text-yellow-400 mr-3" />
                <h4 className="text-lg font-semibold">Webhooks</h4>
              </div>
              <p className="text-slate-300 mb-4">
                Real-time notifications for payment events to keep your application in sync.
              </p>
              <Link href="/login">
                <Button variant="outline" className="border-slate-600 text-white hover:bg-slate-700 bg-transparent">
                  Setup Webhooks
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Code2 className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-lg font-semibold mb-2">RESTful API</h4>
            <p className="text-slate-400">Clean, predictable URLs and standard HTTP response codes</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Terminal className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-lg font-semibold mb-2">Sandbox Testing</h4>
            <p className="text-slate-400">Test your integration with our comprehensive sandbox environment</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-lg font-semibold mb-2">Real-time Events</h4>
            <p className="text-slate-400">Instant webhooks and real-time payment status updates</p>
          </div>
        </div>
      </div>
    </section>
  )
}
