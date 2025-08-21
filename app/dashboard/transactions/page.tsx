"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Download, Copy } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Info } from "lucide-react"
import { ExportDialog } from "@/components/export-dialog"
import { ProgressSimulator } from "@/lib/progress-simulator"

const generateTransactions = (userType: string) => {
  // Return empty array for new registered users
  if (userType === "registered") {
    return []
  }

  const firstNames = [
    "Henok",
    "Meron",
    "Dawit",
    "Sara",
    "Yonas",
    "Almaz",
    "Bereket",
    "Chaltu",
    "Daniel",
    "Eyerusalem",
    "Abebe",
    "Tigist",
    "Kebede",
    "Hanan",
    "Girma",
    "Selamawit",
    "Tadesse",
    "Rahel",
    "Mulugeta",
    "Bethlehem",
    "Getachew",
    "Mahlet",
    "Tesfaye",
    "Marta",
    "Alemayehu",
    "Hiwot",
    "Bekele",
    "Senait",
    "Haile",
    "Tsion",
    "Worku",
    "Meseret",
    "Negash",
    "Kidist",
    "Desta",
    "Bruktawit",
    "Tekle",
    "Selam",
    "Mekonnen",
    "Firehiwot",
    "Assefa",
    "Mekdes",
    "Wolde",
    "Haben",
    "Gebre",
    "Nardos",
    "Teshome",
    "Liya",
    "Sisay",
    "Hanna",
  ]

  const lastNames = [
    "Tadesse",
    "Alemayehu",
    "Bekele",
    "Tesfaye",
    "Haile",
    "Worku",
    "Negash",
    "Girma",
    "Desta",
    "Guluma",
    "Abebe",
    "Kebede",
    "Getachew",
    "Mulugeta",
    "Tekle",
    "Mekonnen",
    "Assefa",
    "Wolde",
    "Gebre",
    "Teshome",
    "Sisay",
    "Molla",
    "Yimer",
    "Demissie",
    "Tilahun",
    "Shiferaw",
    "Legesse",
    "Ayele",
    "Wondimu",
    "Tadele",
  ]

  const domains = ["gmail.com"]

  // Generate diverse customer pool
  const customers = []
  for (let i = 0; i < 5000; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
    const domain = domains[0] // Always gmail.com
    const phoneNumber = `+2519${Math.floor(Math.random() * 100000000)
      .toString()
      .padStart(8, "0")}`

    customers.push({
      name: `${firstName} ${lastName}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${domain}`,
      phone: phoneNumber,
    })
  }

  // Define monthly distribution - exponential growth pattern totaling 54,255 transactions
  const monthlyDistribution = [
    { month: "Jan", transactions: 800, revenue: 39704, averageAmount: 150 },
    { month: "Feb", transactions: 900, revenue: 85080, averageAmount: 150 },
    { month: "Mar", transactions: 1000, revenue: 113440, averageAmount: 150 },
    { month: "Apr", transactions: 1100, revenue: 155980, averageAmount: 150 },
    { month: "May", transactions: 3800, revenue: 2906900, averageAmount: 150 },
    { month: "Jun", transactions: 10700, revenue: 3417380, averageAmount: 150 },
    { month: "Jul", transactions: 16500, revenue: 4268180, averageAmount: 150 },
    { month: "Aug", transactions: 19455, revenue: 5813336, averageAmount: 150 },
  ]

  const transactions = []
  let transactionId = 1

  // Get the current year
  const currentYear = new Date().getFullYear()

  monthlyDistribution.forEach((monthData, monthIndex) => {
    for (let i = 0; i < monthData.transactions; i++) {
      const customer = customers[Math.floor(Math.random() * customers.length)]

      // Generate random date within the month
      const monthDate = new Date(currentYear, monthIndex, 1)
      const nextMonthDate = new Date(currentYear, monthIndex + 1, 1)
      const randomDate = new Date(
        monthDate.getTime() + Math.random() * (nextMonthDate.getTime() - monthDate.getTime())
      )

      // Generate varied transaction amounts (50-2000 ETB, mostly even numbers)
      let amount
      const random = Math.random()
      
      if (random < 0.6) {
        // 60% - Small amounts (50-500 ETB)
        const evenAmounts = [50, 100, 150, 200, 250, 300, 350, 400, 450, 500]
        const oddAmounts = [75, 125, 175, 225, 275, 325, 375, 425, 475]
        amount = random < 0.05 ? oddAmounts[Math.floor(Math.random() * oddAmounts.length)] : evenAmounts[Math.floor(Math.random() * evenAmounts.length)]
      } else if (random < 0.85) {
        // 25% - Medium amounts (500-1000 ETB)
        const evenAmounts = [500, 600, 700, 800, 900, 1000]
        const oddAmounts = [525, 575, 625, 675, 725, 775, 825, 875, 925]
        amount = random < 0.1 ? oddAmounts[Math.floor(Math.random() * oddAmounts.length)] : evenAmounts[Math.floor(Math.random() * evenAmounts.length)]
      } else {
        // 15% - Large amounts (1000-2000 ETB)
        const evenAmounts = [1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000]
        const oddAmounts = [1050, 1150, 1250, 1350, 1450, 1550, 1650, 1750, 1850, 1950]
        amount = random < 0.15 ? oddAmounts[Math.floor(Math.random() * oddAmounts.length)] : evenAmounts[Math.floor(Math.random() * evenAmounts.length)]
      }

      const roundedAmount = amount

      const chapaRef = `AP${Math.random().toString(36).substring(2, 12)}`
      const bankRef = `CAR${Math.random().toString(36).substring(2, 8).toUpperCase()}`

      transactions.push({
        id: transactionId++,
        status: "SUCCESS",
        customer: customer.name,
        email: customer.email,
        phone: customer.phone,
        amount: roundedAmount,
        paymentMethod: "telebirr",
        chapaReference: chapaRef,
        bankReference: bankRef,
        timestamp: randomDate.toISOString(),
      })
    }
  })

  return transactions.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
}

export default function TransactionsPage() {
  const [userType, setUserType] = useState<string>("demo")
  const [transactions, setTransactions] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [filterField, setFilterField] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [progressData, setProgressData] = useState({ transactions: 54234 })
  const itemsPerPage = 20

  useEffect(() => {
    const storedUserType = localStorage.getItem("payflow_user_type") || "demo"
    setUserType(storedUserType)
    const generatedTransactions = generateTransactions(storedUserType)
    setTransactions(generatedTransactions)
    
    if (storedUserType === "demo") {
      const simulator = new ProgressSimulator(16800000, 16983, 54234)
      const currentProgress = simulator.getCurrentProgress()
      setProgressData({ transactions: currentProgress.transactions })
    }
  }, [])

  const filteredTransactions = transactions.filter((transaction) => {
    if (!searchQuery) return true

    const query = searchQuery.toLowerCase()
    switch (filterField) {
      case "customer":
        return (
          transaction.customer.toLowerCase().includes(query) ||
          transaction.email.toLowerCase().includes(query) ||
          transaction.phone.includes(query)
        )
      case "amount":
        return transaction.amount.toString().includes(query)
      case "reference":
        return (
          transaction.chapaReference.toLowerCase().includes(query) ||
          transaction.bankReference.toLowerCase().includes(query)
        )
      default:
        return (
          transaction.customer.toLowerCase().includes(query) ||
          transaction.email.toLowerCase().includes(query) ||
          transaction.phone.includes(query) ||
          transaction.amount.toString().includes(query) ||
          transaction.chapaReference.toLowerCase().includes(query) ||
          transaction.bankReference.toLowerCase().includes(query)
        )
    }
  })

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedTransactions = filteredTransactions.slice(startIndex, startIndex + itemsPerPage)

  const totalAmount = transactions.reduce((sum, t) => sum + t.amount, 0)

  const filterTransactionsByDate = (data: any[], startDate: Date, endDate: Date) => {
    return data.filter((transaction) => {
      const transactionDate = new Date(transaction.timestamp)
      return transactionDate >= startDate && transactionDate <= endDate
    })
  }

  const formatTransactionsForExport = (data: any[]) => {
    return data.map((t) => [
      t.status,
      t.customer,
      t.phone,
      `ETB ${t.amount.toLocaleString()}`,
      t.paymentMethod,
      new Date(t.timestamp).toLocaleDateString(),
      t.chapaReference,
      t.bankReference,
    ])
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="space-y-6">
      {/* VAT Notice */}
      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          According to the new regulations, we are required to collect 15% VAT on our service fee.
        </AlertDescription>
      </Alert>

      {userType === "registered" && transactions.length === 0 && (
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-muted-foreground">
              <p className="text-lg font-medium mb-2">No transactions yet</p>
              <p>Your transaction history will appear here once you start processing payments.</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col md:flex-row gap-4 items-center flex-1">
              <Select value={filterField} onValueChange={setFilterField}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Fields</SelectItem>
                  <SelectItem value="customer">Customer</SelectItem>
                  <SelectItem value="amount">Amount</SelectItem>
                  <SelectItem value="reference">Reference</SelectItem>
                </SelectContent>
              </Select>

              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by reference, amount, email, phone, or name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <ExportDialog
                title="Transactions Report"
                data={filteredTransactions}
                headers={["Status", "Customer", "Phone", "Amount", "Payment", "Date", "PayFlow Ref", "Bank Ref"]}
                filename="payflow-transactions.pdf"
                summary={{
                  "Total Transactions": filteredTransactions.length.toLocaleString(),
                  "Total Amount": `ETB ${totalAmount.toLocaleString()}`
                }}
                filterByDate={filterTransactionsByDate}
                formatDataForExport={formatTransactionsForExport}
              >
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </ExportDialog>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Transactions</span>
            <Badge variant="secondary">
              {userType === "registered" ? "0" : progressData.transactions.toLocaleString()} total transactions
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {transactions.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              <p>No transactions to display</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b">
                    <tr className="text-left">
                      <th className="px-6 py-4 text-sm font-medium text-muted-foreground">STATUS</th>
                      <th className="px-6 py-4 text-sm font-medium text-muted-foreground">CUSTOMER</th>
                      <th className="px-6 py-4 text-sm font-medium text-muted-foreground">AMOUNT</th>
                      <th className="px-6 py-4 text-sm font-medium text-muted-foreground">PAYMENT METHOD</th>
                      <th className="px-6 py-4 text-sm font-medium text-muted-foreground">DATE</th>
                      <th className="px-6 py-4 text-sm font-medium text-muted-foreground">PAYFLOW REFERENCE</th>
                      <th className="px-6 py-4 text-sm font-medium text-muted-foreground">BANK REFERENCE</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedTransactions.map((transaction) => (
                      <tr key={transaction.id} className="border-b hover:bg-muted/50">
                        <td className="px-6 py-4">
                          <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                            SUCCESS
                          </Badge>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <div className="font-medium">{transaction.phone}</div>
                            <div className="text-sm text-muted-foreground">{transaction.customer}</div>
                            <div className="text-sm text-muted-foreground">{transaction.email}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 font-medium">ETB {transaction.amount.toLocaleString()}</td>
                        <td className="px-6 py-4">{transaction.paymentMethod}</td>
                        <td className="px-6 py-4">
                          <div className="text-sm">
                            {new Date(transaction.timestamp).toLocaleDateString()}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {new Date(transaction.timestamp).toLocaleTimeString()}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-sm">{transaction.chapaReference}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copyToClipboard(transaction.chapaReference)}
                              className="h-6 w-6 p-0"
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-sm">{transaction.bankReference}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copyToClipboard(transaction.bankReference)}
                              className="h-6 w-6 p-0"
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between px-6 py-4 border-t">
                  <div className="text-sm text-muted-foreground">
                    Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredTransactions.length)} of{" "}
                    {filteredTransactions.length.toLocaleString()} transactions
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </Button>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      Page {currentPage} of {totalPages.toLocaleString()}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
