"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Banknote, TrendingUp, ArrowUpRight } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { useState, useEffect } from "react"

const emptyFundingHistory = [
  { month: "Jan", amount: 0 },
  { month: "Feb", amount: 0 },
  { month: "Mar", amount: 0 },
  { month: "Apr", amount: 0 },
  { month: "May", amount: 0 },
  { month: "Jun", amount: 0 },
  { month: "Jul", amount: 0 },
  { month: "Aug", amount: 0 },
]

const emptyFundingSources = [
  { source: "Bank Transfer", amount: 0, percentage: 0 },
  { source: "Mobile Money", amount: 0, percentage: 0 },
  { source: "Cash Deposit", amount: 0, percentage: 0 },
]

export default function FundsPage() {
  const [userType, setUserType] = useState<string>("demo")

  useEffect(() => {
    const storedUserType = localStorage.getItem("payflow_user_type") || "demo"
    setUserType(storedUserType)
  }, [])

  const fundingHistory =
    userType === "registered"
      ? emptyFundingHistory
      : [
          { month: "Jan", amount: 245000 },
          { month: "Feb", amount: 267000 },
          { month: "Mar", amount: 289000 },
          { month: "Apr", amount: 312000 },
          { month: "May", amount: 1125000 },
          { month: "Jun", amount: 2850000 },
          { month: "Jul", amount: 5200000 },
          { month: "Aug", amount: 7500000 },
        ]

  const fundingSources =
    userType === "registered"
      ? emptyFundingSources
      : [
          { source: "Bank Transfer", amount: 13009776, percentage: 68 },
          { source: "Mobile Money", amount: 4406061, percentage: 23 },
          { source: "Cash Deposit", amount: 1740952, percentage: 9 },
        ]

  const totalFunding = fundingSources.reduce((sum, source) => sum + source.amount, 0)

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
      {userType === "registered" && totalFunding === 0 && (
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-muted-foreground">
              <p className="text-lg font-medium mb-2">No funding data yet</p>
              <p>Your funding history and sources will appear here once you start receiving payments.</p>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Funding</CardTitle>
            <Banknote className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">ETB {totalFunding.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 flex items-center gap-1">
                <ArrowUpRight className="h-3 w-3" />
                {userType === "registered" ? "+0%" : "+44.2%"}
              </span>
              from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">ETB {userType === "registered" ? "0" : "7,500,000"}</div>
            <p className="text-xs text-muted-foreground">Current month funding</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Monthly</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">ETB {userType === "registered" ? "0" : "2,394,599"}</div>
            <p className="text-xs text-muted-foreground">8-month average</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Monthly Funding Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={fundingHistory}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="month" tick={{ fill: "#374151", fontSize: 12 }} />
              <YAxis tickFormatter={formatYAxis} tick={{ fill: "#374151", fontSize: 12 }} />
              <Tooltip
                formatter={(value) => [`ETB ${value?.toLocaleString()}`, "Funding"]}
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  color: "#111827",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
                labelStyle={{ color: "#374151" }}
              />
              <Bar dataKey="amount" fill="url(#fundingGradient)" radius={[4, 4, 0, 0]} />
              <defs>
                <linearGradient id="fundingGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="50%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Funding Sources</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {fundingSources.map((source, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                    <Banknote className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">{source.source}</p>
                    <p className="text-sm text-muted-foreground">{source.percentage}% of total</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">ETB {source.amount.toLocaleString()}</p>
                  <Badge variant="secondary">{source.percentage}%</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="h-20 flex flex-col gap-2">
              <Banknote className="w-6 h-6" />
              <span>Add Funds</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2 bg-transparent">
              <TrendingUp className="w-6 h-6" />
              <span>View Reports</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2 bg-transparent">
              <ArrowUpRight className="w-6 h-6" />
              <span>Export Data</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
