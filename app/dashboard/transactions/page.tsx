"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Download, Copy, Calendar as CalendarIcon } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Info } from "lucide-react"
import { ExportDialog } from "@/components/export-dialog"
import { ProgressSimulator } from "@/lib/progress-simulator"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

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

  // Define monthly distribution - exponential growth pattern totaling exactly 16,800,000 ETB
  const targetTotal = 16800000 // 16.8M ETB
  const monthlyDistribution = [
    { month: "Jan", transactions: 800, targetRevenue: 400000 },   // 400K
    { month: "Feb", transactions: 900, targetRevenue: 500000 },   // 500K
    { month: "Mar", transactions: 1000, targetRevenue: 600000 },  // 600K
    { month: "Apr", transactions: 1100, targetRevenue: 800000 },  // 800K
    { month: "May", transactions: 3800, targetRevenue: 2000000 }, // 2M
    { month: "Jun", transactions: 10700, targetRevenue: 3200000 }, // 3.2M
    { month: "Jul", transactions: 16500, targetRevenue: 4100000 }, // 4.1M
    { month: "Aug", transactions: 19455, targetRevenue: 5200000 }, // 5.2M
  ]

  const transactions = []
  let transactionId = 1
  let totalGenerated = 0

  // Get the current year
  const currentYear = new Date().getFullYear()

  monthlyDistribution.forEach((monthData, monthIndex) => {
    let monthTotal = 0
    const avgAmount = monthData.targetRevenue / monthData.transactions

    for (let i = 0; i < monthData.transactions; i++) {
      const customer = customers[Math.floor(Math.random() * customers.length)]

      // Generate random date within the month
      const monthDate = new Date(currentYear, monthIndex, 1)
      const nextMonthDate = new Date(currentYear, monthIndex + 1, 1)
      const randomDate = new Date(
        monthDate.getTime() + Math.random() * (nextMonthDate.getTime() - monthDate.getTime())
      )

      let amount
      const isLastTransaction = i === monthData.transactions - 1
      
      if (isLastTransaction) {
        // For the last transaction, use remaining amount to hit exact target
        amount = monthData.targetRevenue - monthTotal
      } else {
        // Generate amounts around the average with mostly even numbers
        const random = Math.random()
        const variation = avgAmount * 0.8 // ±80% variation
        const baseAmount = avgAmount + (random - 0.5) * variation
        
        // Round to mostly even amounts
        if (random < 0.85) {
          // 85% even amounts (rounded to nearest 50)
          amount = Math.round(baseAmount / 50) * 50
        } else {
          // 15% odd amounts (rounded to nearest 25)
          amount = Math.round(baseAmount / 25) * 25
        }
        
        // Ensure minimum amount
        amount = Math.max(50, amount)
        
        // Adjust if this would exceed month target
        if (monthTotal + amount > monthData.targetRevenue) {
          amount = monthData.targetRevenue - monthTotal
        }
      }

      const roundedAmount = Math.max(50, Math.round(amount))

      const chapaRef = `AP${Math.random().toString(36).substring(2, 12)}`
      const bankRef = `CAR${Math.random().toString(36).substring(2, 8).toUpperCase()}`

      monthTotal += roundedAmount
      totalGenerated += roundedAmount

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
    
    console.log(`Month ${monthData.month}: Generated ${monthTotal.toLocaleString()} ETB (target: ${monthData.targetRevenue.toLocaleString()})`)
  })
  
  console.log(`Total generated: ${totalGenerated.toLocaleString()} ETB (target: ${targetTotal.toLocaleString()})`)

  return transactions.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
}

export default function TransactionsPage() {
  const [userType, setUserType] = useState<string>("demo")
  const [transactions, setTransactions] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [filterField, setFilterField] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [progressData, setProgressData] = useState({ transactions: 54234 })
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const [showDateFilter, setShowDateFilter] = useState(false)
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
    // Date filtering
    if (startDate || endDate) {
      const transactionDate = new Date(transaction.timestamp)
      
      if (startDate) {
        const startOfDay = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), 0, 0, 0, 0)
        if (transactionDate < startOfDay) return false
      }
      
      if (endDate) {
        const endOfDay = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate(), 23, 59, 59, 999)
        if (transactionDate > endOfDay) return false
      }
    }

    // Search filtering
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

  const totalAmount = filteredTransactions.reduce((sum, t) => sum + t.amount, 0)

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
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowDateFilter(!showDateFilter)}
                className={cn(showDateFilter && "bg-muted")}
              >
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <ExportDialog
                title="Transactions Report"
                data={formatTransactionsForExport(filteredTransactions)}
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

      {/* Date Filter Controls */}
      {showDateFilter && (
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="flex gap-2 items-center">
                <span className="text-sm font-medium">Filter by date:</span>
                
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "justify-start text-left font-normal w-[140px]",
                        !startDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, "MMM d") : "Start date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "justify-start text-left font-normal w-[140px]",
                        !endDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, "MMM d") : "End date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>

                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => {
                    setStartDate(undefined)
                    setEndDate(undefined)
                  }}
                  disabled={!startDate && !endDate}
                >
                  Clear
                </Button>
              </div>

              {(startDate || endDate) && (
                <div className="text-sm text-muted-foreground">
                  Showing {filteredTransactions.length.toLocaleString()} of {transactions.length.toLocaleString()} transactions
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

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
                      <th className="px-6 py-4 text-sm font-medium text-muted-foreground">PAYETHIO REFERENCE</th>
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
