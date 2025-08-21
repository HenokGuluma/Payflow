
export interface ProgressData {
  revenue: number
  customers: number
  transactions: number
  timestamp: number
}

const SIMULATION_DURATION = 5 * 60 * 1000 // 5 minutes in milliseconds
const STORAGE_KEY = 'payflow_progress_simulation'

export class ProgressSimulator {
  private baseData: ProgressData
  private startTime: number

  constructor(baseRevenue: number, baseCustomers: number, baseTransactions: number) {
    this.baseData = {
      revenue: baseRevenue,
      customers: baseCustomers,
      transactions: baseTransactions,
      timestamp: Date.now()
    }
    this.startTime = this.getStoredStartTime() || Date.now()
  }

  private getStoredStartTime(): number | null {
    if (typeof window === 'undefined') return null
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const data = JSON.parse(stored)
      return data.startTime
    }
    return null
  }

  private setStoredStartTime(startTime: number) {
    if (typeof window === 'undefined') return
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ startTime }))
  }

  getCurrentProgress(): ProgressData {
    const now = Date.now()
    const elapsed = now - this.startTime
    
    // If more than 5 minutes have passed, reset
    if (elapsed > SIMULATION_DURATION) {
      this.startTime = now
      this.setStoredStartTime(this.startTime)
      return this.baseData
    }

    // Store the start time if it's new
    if (!this.getStoredStartTime()) {
      this.setStoredStartTime(this.startTime)
    }

    // Calculate progress (0 to 1)
    const progress = elapsed / SIMULATION_DURATION

    // Realistic 5-minute growth rates
    const revenueGrowth = this.calculateRevenueGrowth(progress)
    const customerGrowth = this.calculateCustomerGrowth(progress)
    const transactionGrowth = this.calculateTransactionGrowth(progress)

    return {
      revenue: Math.floor(this.baseData.revenue + revenueGrowth),
      customers: Math.floor(this.baseData.customers + customerGrowth),
      transactions: Math.floor(this.baseData.transactions + transactionGrowth),
      timestamp: now
    }
  }

  private calculateRevenueGrowth(progress: number): number {
    // Simulate realistic revenue growth over 5 minutes
    // For a business doing 16.8M, about 0.1-0.3% growth in 5 minutes is realistic
    const maxGrowth = this.baseData.revenue * 0.002 // 0.2% max growth
    return maxGrowth * progress * (1 + Math.sin(progress * Math.PI * 3) * 0.1) // Add some variation
  }

  private calculateCustomerGrowth(progress: number): number {
    // New customers come in bursts, not linearly
    const maxNewCustomers = 8 // 8 new customers in 5 minutes
    const burstProgress = Math.floor(progress * 5) / 5 // Create steps
    return maxNewCustomers * burstProgress + Math.random() * 2
  }

  private calculateTransactionGrowth(progress: number): number {
    // Transactions grow more steadily but with some randomness
    const maxNewTransactions = 25 // 25 new transactions in 5 minutes
    return maxNewTransactions * progress * (1 + Math.sin(progress * Math.PI * 4) * 0.15)
  }

  reset() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY)
    }
    this.startTime = Date.now()
  }

  static resetProgress() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY)
    }
  }
}
