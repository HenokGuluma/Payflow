"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, Users, CreditCard, TrendingUp, Download, Loader2 } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"
import { Skeleton } from "@/components/ui/skeleton"

const zeroTransactionData = [
  { month: "Jan", amount: 0 },
  { month: "Feb", amount: 0 },
  { month: "Mar", amount: 0 },
  { month: "Apr", amount: 0 },
  { month: "May", amount: 0 },
  { month: "Jun", amount: 0 },
  { month: "Jul", amount: 0 },
  { month: "Aug", amount: 0 },
]

const zeroCustomerGrowth = [
  { month: "Jan", customers: 0 },
  { month: "Feb", customers: 0 },
  { month: "Mar", customers: 0 },
  { month: "Apr", customers: 0 },
  { month: "May", customers: 0 },
  { month: "Jun", customers: 0 },
  { month: "Jul", customers: 0 },
  { month: "Aug", customers: 0 },
]

const transactionData = [
  { month: "Jan", amount: 180000 },
  { month: "Feb", amount: 195000 },
  { month: "Mar", amount: 210000 },
  { month: "Apr", amount: 225000 },
  { month: "May", amount: 850000 },
  { month: "Jun", amount: 2400000 },
  { month: "Jul", amount: 5900000 },
  { month: "Aug", amount: 9200000 },
]

const customerGrowth = [
  { month: "Jan", customers: 1200 },
  { month: "Feb", customers: 1350 },
  { month: "Mar", customers: 1480 },
  { month: "Apr", customers: 1620 },
  { month: "May", customers: 3800 },
  { month: "Jun", customers: 8500 },
  { month: "Jul", customers: 12967 }, // Updated July customer count from 16,500 to 12,967
  { month: "Aug", customers: 16983 },
]

const recentTransactions = [
  { id: "APrxHrHbobay", customer: "Henok Tadesse", phone: "+251945710635", amount: "ETB 2,450", status: "SUCCESS" },
  { id: "APGr9NuItG7w", customer: "Meron Alemayehu", phone: "+251911234567", amount: "ETB 1,850", status: "SUCCESS" },
  { id: "APCnsenGhX40", customer: "Dawit Bekele", phone: "+251922345678", amount: "ETB 3,200", status: "SUCCESS" },
  { id: "AP5EROS0ry7l", customer: "Sara Tesfaye", phone: "+251933456789", amount: "ETB 1,650", status: "SUCCESS" },
  { id: "APLE6eUgmFjU", customer: "Yonas Haile", phone: "+251944567890", amount: "ETB 2,100", status: "SUCCESS" },
]

export default function DashboardPage() {
  const [loadingStates, setLoadingStates] = useState({
    stats: true,
    charts: true,
    transactions: true,
  })
  const [userType, setUserType] = useState<"registered" | "demo">("demo")

  useEffect(() => {
    const storedUserType = localStorage.getItem("payflow_user_type")
    if (storedUserType === "registered") {
      setUserType("registered")
    }

    const loadData = async () => {
      setTimeout(() => {
        setLoadingStates((prev) => ({ ...prev, stats: false }))
      }, 800)

      setTimeout(() => {
        setLoadingStates((prev) => ({ ...prev, charts: false }))
      }, 1500)

      setTimeout(() => {
        setLoadingStates((prev) => ({ ...prev, transactions: false }))
      }, 2200)
    }

    loadData()
  }, [])

  const formatYAxis = (value: number) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`
    }
    if (value >= 1000) {
      return `${(value / 1000).toFixed(0)}K`
    }
    return value.toString()
  }

  const currentTransactionData = userType === "registered" ? zeroTransactionData : transactionData
  const currentCustomerGrowth = userType === "registered" ? zeroCustomerGrowth : customerGrowth
  const currentRecentTransactions = userType === "registered" ? [] : recentTransactions

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {loadingStates.stats ? (
          Array.from({ length: 4 }).map((_, i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-20 mb-2" />
                <Skeleton className="h-3 w-16 mb-1" />
                <Skeleton className="h-3 w-24" />
              </CardContent>
            </Card>
          ))
        ) : (
          <>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userType === "registered" ? "ETB 0" : "ETB 16.8M"}</div>
                <p className="text-xs text-muted-foreground mb-1">
                  {userType === "registered" ? "$0 USD" : "$119,621 USD"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {userType === "registered" ? (
                    <span className="text-muted-foreground">Start accepting payments to see revenue</span>
                  ) : (
                    <span className="text-green-500 flex items-center gap-1">
                      <ArrowUpRight className="h-3 w-3" />
                      +56.5%
                    </span>
                  )}
                  {userType === "demo" && "from last month"}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userType === "registered" ? "0" : "16,983"}</div>
                <p className="text-xs text-muted-foreground">
                  {userType === "registered" ? (
                    <span className="text-muted-foreground">No customers yet</span>
                  ) : (
                    <span className="text-green-500 flex items-center gap-1">
                      <ArrowUpRight className="h-3 w-3" />
                      +2.9%
                    </span>
                  )}
                  {userType === "demo" && "from last month"}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Transactions</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userType === "registered" ? "0" : "54,234"}</div>
                <p className="text-xs text-muted-foreground">
                  {userType === "registered" ? (
                    <span className="text-muted-foreground">No transactions yet</span>
                  ) : (
                    <span className="text-green-500 flex items-center gap-1">
                      <ArrowUpRight className="h-3 w-3" />
                      +48.2%
                    </span>
                  )}
                  {userType === "demo" && "from last month"}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userType === "registered" ? "0%" : "98.5%"}</div>
                <p className="text-xs text-muted-foreground">
                  {userType === "registered" ? (
                    <span className="text-muted-foreground">Start processing to see success rate</span>
                  ) : (
                    <span className="text-green-500 flex items-center gap-1">
                      <ArrowUpRight className="h-3 w-3" />
                      +0.3%
                    </span>
                  )}
                  {userType === "demo" && "from last month"}
                </p>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {loadingStates.charts ? (
          Array.from({ length: 2 }).map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-4 w-48" />
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-[300px]">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Loader2 className="h-6 w-6 animate-spin" />
                    Loading chart data...
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <>
            <Card>
              <CardHeader>
                <CardTitle>Revenue Trend</CardTitle>
                <CardDescription>
                  {userType === "registered"
                    ? "Revenue will appear here once you start processing payments"
                    : "Exponential revenue growth over the past 8 months"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={currentTransactionData}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="month" tick={{ fill: "#374151", fontSize: 12 }} />
                    <YAxis tickFormatter={formatYAxis} tick={{ fill: "#374151", fontSize: 12 }} />
                    <Tooltip
                      formatter={(value) => [
                        `ETB ${userType === "registered" ? "0" : (value / 1000000).toFixed(1)}M`,
                        "Revenue",
                      ]}
                      contentStyle={{
                        backgroundColor: "white",
                        border: "1px solid #e5e7eb",
                        borderRadius: "8px",
                        color: "#1f2937",
                        fontWeight: "500",
                      }}
                      labelStyle={{ color: "#1f2937", fontWeight: "600" }}
                    />
                    <Line
                      type="monotone"
                      dataKey="amount"
                      stroke="url(#colorRevenue)"
                      strokeWidth={3}
                      dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, fill: "#059669" }}
                    />
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="50%" stopColor="#10b981" />
                        <stop offset="100%" stopColor="#f59e0b" />
                      </linearGradient>
                    </defs>
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Customer Growth</CardTitle>
                <CardDescription>
                  {userType === "registered"
                    ? "Customer growth will be tracked here as you acquire customers"
                    : "Exponential customer acquisition growth"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={currentCustomerGrowth}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="month" tick={{ fill: "#374151", fontSize: 12 }} />
                    <YAxis tickFormatter={formatYAxis} tick={{ fill: "#374151", fontSize: 12 }} />
                    <Tooltip
                      formatter={(value) => [value.toLocaleString(), "Customers"]}
                      contentStyle={{
                        backgroundColor: "white",
                        border: "1px solid #e5e7eb",
                        borderRadius: "8px",
                        color: "#1f2937",
                        fontWeight: "500",
                      }}
                      labelStyle={{ color: "#1f2937", fontWeight: "600" }}
                    />
                    <Bar dataKey="customers" fill="url(#colorCustomers)" radius={[4, 4, 0, 0]} />
                    <defs>
                      <linearGradient id="colorCustomers" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#8b5cf6" />
                        <stop offset="50%" stopColor="#ec4899" />
                        <stop offset="100%" stopColor="#f97316" />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      {/* Recent Transactions */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>
              {userType === "registered"
                ? "Your recent transactions will appear here"
                : "Latest payment transactions from your customers"}
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" disabled={loadingStates.transactions}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </CardHeader>
        <CardContent>
          {loadingStates.transactions ? (
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <Skeleton className="w-2 h-2 rounded-full" />
                    <div>
                      <Skeleton className="h-4 w-32 mb-2" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                  </div>
                  <div className="text-right">
                    <Skeleton className="h-4 w-20 mb-2" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {userType === "registered" ? (
                <div className="text-center py-8 text-muted-foreground">
                  <CreditCard className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium mb-2">No transactions yet</p>
                  <p className="text-sm">Start accepting payments to see your transaction history here.</p>
                </div>
              ) : (
                currentRecentTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div>
                        <p className="font-medium">{transaction.customer}</p>
                        <p className="text-sm text-muted-foreground">{transaction.phone}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{transaction.amount}</p>
                      <p className="text-sm text-green-500">{transaction.status}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
