"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, Wallet, TrendingUp, Download } from "lucide-react"
import { ExportDialog } from "@/components/export-dialog"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

const zeroBalanceHistory = [
  { date: "Jan", balance: 0 },
  { date: "Feb", balance: 0 },
  { date: "Mar", balance: 0 },
  { date: "Apr", balance: 0 },
  { date: "May", balance: 0 },
  { date: "Jun", balance: 0 },
  { date: "Jul", balance: 0 },
  { date: "Aug", balance: 0 },
]

const zeroBalanceBreakdown = [
  { name: "Available", value: 0, color: "#10b981" },
  { name: "Pending", value: 0, color: "#f59e0b" },
  { name: "Reserved", value: 0, color: "#ef4444" },
]

const balanceHistory = [
  { date: "Jan", balance: 180000 },
  { date: "Feb", balance: 195000 },
  { date: "Mar", balance: 210000 },
  { date: "Apr", balance: 225000 },
  { date: "May", balance: 450000 },
  { date: "Jun", balance: 750000 },
  { date: "Jul", balance: 1100000 },
  { date: "Aug", balance: 1544389 },
]

const balanceBreakdown = [
  { name: "Available", value: 1237218, color: "#10b981" },
  { name: "Pending", value: 78458, color: "#f59e0b" },
  { name: "Reserved", value: 228713, color: "#ef4444" },
]

const generateRecentTransactions = () => {
  const transactions = []
  const descriptions = [
    "Customer Payment",
    "Bulk Payment",
    "Merchant Settlement",
    "Mobile Money Transfer",
    "Bank Transfer",
    "Telebirr Payment",
    "CBE Transfer",
    "Dashen Bank Payment",
    "Transaction Fee",
    "Service Fee",
    "Processing Fee",
    "Platform Fee",
    "Refund Processed",
    "Chargeback",
    "Dispute Resolution",
    "Account Adjustment",
  ]

  const timeUnits = ["minutes", "hours", "days"]

  for (let i = 0; i < 220; i++) {
    const isCredit = Math.random() > 0.3 // 70% credit, 30% debit
    const amount = isCredit
      ? Math.floor(Math.random() * 15000) + 500 // Credits: 500-15500 ETB
      : Math.floor(Math.random() * 500) + 25 // Debits: 25-525 ETB (fees)

    const timeValue = Math.floor(Math.random() * 30) + 1
    const timeUnit = timeUnits[Math.floor(Math.random() * timeUnits.length)]
    const timeAgo = `${timeValue} ${timeUnit} ago`

    const description = descriptions[Math.floor(Math.random() * descriptions.length)]

    transactions.push({
      type: isCredit ? "credit" : "debit",
      amount,
      description,
      date: timeAgo,
    })
  }

  return transactions
}

const recentTransactions = generateRecentTransactions()

export default function BalancePage() {
  const [userType, setUserType] = useState<"registered" | "demo">("demo")

  useEffect(() => {
    const storedUserType = localStorage.getItem("payflow_user_type")
    if (storedUserType === "registered") {
      setUserType("registered")
    }
  }, [])

  const currentBalanceHistory = userType === "registered" ? zeroBalanceHistory : balanceHistory
  const currentBalanceBreakdown = userType === "registered" ? zeroBalanceBreakdown : balanceBreakdown
  const currentRecentTransactions = userType === "registered" ? [] : recentTransactions

  const totalBalance = currentBalanceBreakdown.reduce((sum, item) => sum + item.value, 0)
  const availableBalance = currentBalanceBreakdown.find((item) => item.name === "Available")?.value || 0

  const formatBalanceChangesForExport = (data: any[]) => {
    return data.map((t) => [
      t.type === "credit" ? "Credit" : "Debit",
      t.description,
      `ETB ${(t.type === "credit" ? t.amount : -t.amount).toLocaleString()}`,
      t.date,
    ])
  }

  const formatYAxis = (value: number) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`
    }
    if (value >= 1000) {
      return `${(value / 1000).toFixed(0)}K`
    }
    return value.toString()
  }

  return (
    <div className="space-y-6">
      {/* Balance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">ETB {totalBalance.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {userType === "registered" ? (
                <span className="text-muted-foreground">Start processing payments to see balance</span>
              ) : (
                <span className="text-green-500 flex items-center gap-1">
                  <ArrowUpRight className="h-3 w-3" />
                  +36.4%
                </span>
              )}
              {userType === "demo" && "from last month"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Balance</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">ETB {availableBalance.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {userType === "registered" ? "No funds available yet" : "Ready for withdrawal"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Growth</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userType === "registered" ? "0%" : "+36.4%"}</div>
            <p className="text-xs text-muted-foreground">
              {userType === "registered" ? "No growth data yet" : "Balance increase"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Balance History</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={currentBalanceHistory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tick={{ fill: "#374151", fontSize: 12 }} />
                <YAxis tickFormatter={formatYAxis} tick={{ fill: "#374151", fontSize: 12 }} />
                <Tooltip
                  formatter={(value) => [`ETB ${value?.toLocaleString()}`, "Balance"]}
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "6px",
                    color: "#1f2937",
                    fontSize: "14px",
                  }}
                />
                <Line type="monotone" dataKey="balance" stroke="url(#balanceGradient)" strokeWidth={3} />
                <defs>
                  <linearGradient id="balanceGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="50%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Balance Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={currentBalanceBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {currentBalanceBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [`ETB ${value}`, "Amount"]}
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "6px",
                    color: "#1f2937",
                    fontSize: "14px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 mt-4">
              {currentBalanceBreakdown.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm">{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Balance Changes ({currentRecentTransactions.length} items)</CardTitle>
          <ExportDialog
            title="Balance Changes Report"
            data={currentRecentTransactions}
            headers={["Type", "Description", "Amount", "Date"]}
            filename="payflow-balance-changes.pdf"
            summary={{
              "Total Balance": `ETB ${totalBalance.toLocaleString()}`,
              "Available Balance": `ETB ${availableBalance.toLocaleString()}`,
              "Total Changes": currentRecentTransactions.length.toString()
            }}
            formatDataForExport={formatBalanceChangesForExport}
          >
            <Button variant="outline" size="sm" disabled={userType === "registered"}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </ExportDialog>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {userType === "registered" ? (
              <div className="text-center py-8 text-muted-foreground">
                <Wallet className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium mb-2">No balance changes yet</p>
                <p className="text-sm">Balance changes will appear here once you start processing payments.</p>
              </div>
            ) : (
              currentRecentTransactions.map((transaction, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-2 h-2 rounded-full ${transaction.type === "credit" ? "bg-green-500" : "bg-red-500"}`}
                    ></div>
                    <div>
                      <p className="font-medium">{transaction.description}</p>
                      <p className="text-sm text-muted-foreground">{transaction.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-medium ${transaction.type === "credit" ? "text-green-600" : "text-red-600"}`}>
                      {transaction.type === "credit" ? "+" : "-"}ETB {transaction.amount.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
