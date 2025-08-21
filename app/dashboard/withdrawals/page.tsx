"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowDownToLine, Clock, CheckCircle, XCircle, ChevronLeft, ChevronRight, Download } from "lucide-react"
import { ExportDialog } from "@/components/export-dialog"

const generateWithdrawalHistory = (userType: string) => {
  // Return empty array for new registered users
  if (userType === "registered") {
    return []
  }

  const withdrawals = []
  const banks = [
    "Commercial Bank of Ethiopia",
    "Dashen Bank",
    "Awash Bank",
    "Bank of Abyssinia",
    "Cooperative Bank of Oromia",
    "Nib International Bank",
    "United Bank",
    "Wegagen Bank",
    "Lion International Bank",
    "Oromia International Bank",
    "Bunna International Bank",
  ]
  const statuses = ["completed", "pending", "processing", "failed"]
  const statusWeights = [0.75, 0.12, 0.08, 0.05] // 75% completed, 12% pending, 8% processing, 5% failed

  // Define withdrawal distribution across May-August to match transaction pattern
  const withdrawalDistribution = [
    { month: 4, withdrawals: 250 }, // May (month 4 in 0-indexed)
    { month: 5, withdrawals: 800 }, // June
    { month: 6, withdrawals: 2000 }, // July
    { month: 7, withdrawals: 4450 }, // August
  ]

  let withdrawalId = 0
  const currentYear = new Date().getFullYear()

  withdrawalDistribution.forEach((monthData) => {
    for (let i = 0; i < monthData.withdrawals; i++) {
      const randomStatus = () => {
        const rand = Math.random()
        let cumulative = 0
        for (let j = 0; j < statusWeights.length; j++) {
          cumulative += statusWeights[j]
          if (rand <= cumulative) return statuses[j]
        }
        return statuses[0]
      }

      const status = randomStatus()
      const amount = Math.floor(Math.random() * 95000) + 5000 // 5K-100K ETB
      const bank = banks[Math.floor(Math.random() * banks.length)]
      
      // Generate random date within the specific month
      const monthStart = new Date(currentYear, monthData.month, 1)
      const monthEnd = new Date(currentYear, monthData.month + 1, 1)
      const randomDate = new Date(
        monthStart.getTime() + Math.random() * (monthEnd.getTime() - monthStart.getTime())
      )
      const date = randomDate.toISOString().split("T")[0]

    const bankCodes = {
        "Commercial Bank of Ethiopia": "CBE",
        "Dashen Bank": "DSH",
        "Awash Bank": "AWB",
        "Bank of Abyssinia": "BOA",
        "Cooperative Bank of Oromia": "CBO",
        "Nib International Bank": "NIB",
        "United Bank": "UNB",
        "Wegagen Bank": "WEG",
        "Lion International Bank": "LIB",
        "Oromia International Bank": "OIB",
        "Bunna International Bank": "BIB",
      }

      const bankCode = bankCodes[bank as keyof typeof bankCodes] || "UNK"
      const reference = `${bankCode}${Math.random().toString(36).substr(2, 9).toUpperCase()}`

      withdrawals.push({
        id: `WD${String(++withdrawalId).padStart(4, "0")}`,
        amount,
        status,
        bank,
        date,
        reference,
      })
    }
  })

  return withdrawals.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export default function WithdrawalsPage() {
  const [withdrawalAmount, setWithdrawalAmount] = useState("")
  const [selectedBank, setSelectedBank] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [userType, setUserType] = useState<string>("demo")
  const [withdrawalHistory, setWithdrawalHistory] = useState<any[]>([])
  const itemsPerPage = 20

  useEffect(() => {
    const storedUserType = localStorage.getItem("payflow_user_type") || "demo"
    setUserType(storedUserType)
    setWithdrawalHistory(generateWithdrawalHistory(storedUserType))
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-500" />
      case "processing":
        return <Clock className="w-4 h-4 text-blue-500" />
      case "failed":
        return <XCircle className="w-4 h-4 text-red-500" />
      default:
        return <Clock className="w-4 h-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "processing":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "failed":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const totalWithdrawn = userType === "registered" ? 0 : 14379202
  const pendingAmount = userType === "registered" ? 0 : 78458

  const totalPages = Math.ceil(withdrawalHistory.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentWithdrawals = withdrawalHistory.slice(startIndex, endIndex)

  const filterWithdrawalsByDate = (data: any[], startDate: Date, endDate: Date) => {
    return data.filter((withdrawal) => {
      const withdrawalDate = new Date(withdrawal.date)
      return withdrawalDate >= startDate && withdrawalDate <= endDate
    })
  }

  const formatWithdrawalsForExport = (data: any[]) => {
    return data.map((w) => [
      w.id,
      `ETB ${w.amount.toLocaleString()}`,
      w.bank,
      w.status,
      w.date,
      w.reference,
    ])
  }

  return (
    <div className="space-y-6">
      {/* Withdrawal Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available for Withdrawal</CardTitle>
            <ArrowDownToLine className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">ETB {userType === "registered" ? "0" : "2,455,056"}</div>
            <p className="text-xs text-muted-foreground">Current available balance</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Withdrawn</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">ETB {totalWithdrawn.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Successfully withdrawn from {withdrawalHistory.filter((w) => w.status === "completed").length} requests
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Withdrawals</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">ETB {pendingAmount.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Being processed</p>
          </CardContent>
        </Card>
      </div>

      {/* New Withdrawal Request */}
      <Card>
        <CardHeader>
          <CardTitle>Request Withdrawal</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Amount (ETB)</label>
              <Input
                type="number"
                placeholder="Enter amount"
                value={withdrawalAmount}
                onChange={(e) => setWithdrawalAmount(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Bank</label>
              <Select value={selectedBank} onValueChange={setSelectedBank}>
                <SelectTrigger>
                  <SelectValue placeholder="Select bank" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cbe">Commercial Bank of Ethiopia</SelectItem>
                  <SelectItem value="dashen">Dashen Bank</SelectItem>
                  <SelectItem value="awash">Awash Bank</SelectItem>
                  <SelectItem value="boa">Bank of Abyssinia</SelectItem>
                  <SelectItem value="cbo">Cooperative Bank of Oromia</SelectItem>
                  <SelectItem value="nib">Nib International Bank</SelectItem>
                  <SelectItem value="united">United Bank</SelectItem>
                  <SelectItem value="wegagen">Wegagen Bank</SelectItem>
                  <SelectItem value="lion">Lion International Bank</SelectItem>
                  <SelectItem value="oromia">Oromia International Bank</SelectItem>
                  <SelectItem value="bunna">Bunna International Bank</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button className="w-full md:w-auto">
            <ArrowDownToLine className="w-4 h-4 mr-2" />
            Request Withdrawal
          </Button>
        </CardContent>
      </Card>

      {/* Withdrawal History */}
      {userType === "registered" && withdrawalHistory.length === 0 && (
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-muted-foreground">
              <p className="text-lg font-medium mb-2">No withdrawal history yet</p>
              <p>Your withdrawal requests will appear here once you start making withdrawals.</p>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Withdrawal History ({withdrawalHistory.length.toLocaleString()} total records)</CardTitle>
          <div className="flex items-center gap-2">
            <ExportDialog
              title="Withdrawals Report"
              data={withdrawalHistory}
              headers={["ID", "Amount", "Bank", "Status", "Date", "Reference"]}
              filename="payflow-withdrawals.pdf"
              summary={{
                "Total Withdrawals": withdrawalHistory.length.toLocaleString(),
                "Total Withdrawn": `ETB ${totalWithdrawn.toLocaleString()}`,
                "Pending Amount": `ETB ${pendingAmount.toLocaleString()}`
              }}
              filterByDate={filterWithdrawalsByDate}
              formatDataForExport={formatWithdrawalsForExport}
            >
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </ExportDialog>
            <span className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </span>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {withdrawalHistory.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              <p>No withdrawal history to display</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b">
                    <tr className="text-left">
                      <th className="px-6 py-4 text-sm font-medium text-muted-foreground">ID</th>
                      <th className="px-6 py-4 text-sm font-medium text-muted-foreground">AMOUNT</th>
                      <th className="px-6 py-4 text-sm font-medium text-muted-foreground">BANK</th>
                      <th className="px-6 py-4 text-sm font-medium text-muted-foreground">STATUS</th>
                      <th className="px-6 py-4 text-sm font-medium text-muted-foreground">DATE</th>
                      <th className="px-6 py-4 text-sm font-medium text-muted-foreground">REFERENCE</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentWithdrawals.map((withdrawal) => (
                      <tr key={withdrawal.id} className="border-b hover:bg-muted/50">
                        <td className="px-6 py-4 font-mono text-sm">{withdrawal.id}</td>
                        <td className="px-6 py-4 font-medium">ETB {withdrawal.amount.toLocaleString()}</td>
                        <td className="px-6 py-4">{withdrawal.bank}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            {getStatusIcon(withdrawal.status)}
                            <Badge variant="secondary" className={getStatusColor(withdrawal.status)}>
                              {withdrawal.status}
                            </Badge>
                          </div>
                        </td>
                        <td className="px-6 py-4">{withdrawal.date}</td>
                        <td className="px-6 py-4 font-mono text-sm">{withdrawal.reference}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex items-center justify-between px-6 py-4 border-t">
                <div className="text-sm text-muted-foreground">
                  Showing {startIndex + 1} to {Math.min(endIndex, withdrawalHistory.length)} of{" "}
                  {withdrawalHistory.length.toLocaleString()} results
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
