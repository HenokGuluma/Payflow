"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Filter, Download, Mail, Phone, Eye } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ExportDialog } from "@/components/export-dialog"

// Generate comprehensive customer data
const generateCustomers = (userType: string) => {
  // Return empty array for new registered users
  if (userType === "registered") {
    return []
  }

  const firstNames = [
    "Abebe",
    "Almaz",
    "Bereket",
    "Chaltu",
    "Daniel",
    "Eyerusalem",
    "Fikadu",
    "Genet",
    "Henok",
    "Iman",
    "Jemal",
    "Kalkidan",
    "Lemlem",
    "Meron",
    "Nardos",
    "Olana",
    "Petros",
    "Rahel",
    "Sara",
    "Tadesse",
    "Urael",
    "Veronica",
    "Wondwossen",
    "Xenia",
    "Yonas",
    "Zara",
    "Dawit",
    "Hanan",
    "Kidist",
    "Mulugeta",
    "Amanuel",
    "Bethlehem",
    "Chala",
    "Desta",
    "Elias",
    "Frehiwot",
    "Girma",
    "Hiwot",
    "Ibrahim",
    "Jember",
    "Kebede",
    "Liya",
    "Meseret",
    "Natnael",
    "Oliyad",
    "Paulos",
    "Qedest",
    "Robel",
    "Selamawit",
    "Tewodros",
  ]

  const lastNames = [
    "Alemayehu",
    "Bekele",
    "Tesfaye",
    "Haile",
    "Worku",
    "Tadesse",
    "Negash",
    "Girma",
    "Desta",
    "Mulatu",
    "Kebede",
    "Getachew",
    "Assefa",
    "Wolde",
    "Mengistu",
    "Abera",
    "Demissie",
    "Teshome",
    "Yimer",
    "Shiferaw",
    "Gebre",
    "Tilahun",
    "Mekonnen",
    "Ayele",
    "Tekle",
    "Gebremariam",
    "Woldegiorgis",
    "Asfaw",
    "Berhane",
    "Fisseha",
  ]

  const domains = ["gmail.com"]
  const customers = []

  for (let i = 0; i < 16983; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i > 0 ? i : ""}@${domains[0]}`
    const phone = `+251${9}${Math.floor(Math.random() * 100000000)
      .toString()
      .padStart(8, "0")}`

    const baseAmount = 200 + Math.random() * 1800
    const multiplier = Math.random() > 0.9 ? 2 + Math.random() * 3 : 1
    const totalSpent = Math.floor(baseAmount * multiplier)

    const transactionCount = Math.floor(Math.random() * 25) + 1
    const avgTransaction = totalSpent / transactionCount
    const lastTransaction = new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000)
    const joinDate = new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000)

    customers.push({
      id: i + 1,
      firstName,
      lastName,
      fullName: `${firstName} ${lastName}`,
      email,
      phone,
      totalSpent,
      transactionCount,
      avgTransaction,
      lastTransaction,
      joinDate,
      status: Math.random() > 0.1 ? "active" : "inactive",
      riskLevel: Math.random() > 0.95 ? "high" : Math.random() > 0.85 ? "medium" : "low",
    })
  }

  return customers.sort((a, b) => b.totalSpent - a.totalSpent)
}

export default function CustomersPage() {
  const [userType, setUserType] = useState<string>("demo")
  const [customers, setCustomers] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [riskFilter, setRiskFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null)
  const itemsPerPage = 20

  useEffect(() => {
    const storedUserType = localStorage.getItem("payflow_user_type") || "demo"
    setUserType(storedUserType)
    setCustomers(generateCustomers(storedUserType))
  }, [])

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      !searchQuery ||
      customer.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery)

    const matchesStatus = statusFilter === "all" || customer.status === statusFilter
    const matchesRisk = riskFilter === "all" || customer.riskLevel === riskFilter

    return matchesSearch && matchesStatus && matchesRisk
  })

  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedCustomers = filteredCustomers.slice(startIndex, startIndex + itemsPerPage)

  const totalCustomers = customers.length
  const activeCustomers = customers.filter((c) => c.status === "active").length
  const totalRevenue = userType === "registered" ? 0 : 16823567
  const avgCustomerValue = totalCustomers > 0 ? totalRevenue / totalCustomers : 0

  const filterCustomersByDate = (data: any[], startDate: Date, endDate: Date) => {
    return data.filter((customer) => {
      const joinDate = new Date(customer.joinDate)
      return joinDate >= startDate && joinDate <= endDate
    })
  }

  const formatCustomersForExport = (data: any[]) => {
    return data.map((c) => [
      c.fullName,
      c.email,
      c.phone,
      c.status,
      `ETB ${c.totalSpent.toLocaleString()}`,
      c.transactionCount.toString(),
      c.joinDate.toLocaleDateString(),
    ])
  }

  const getRiskBadgeColor = (risk: string) => {
    switch (risk) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-green-100 text-green-800 border-green-200"
    }
  }

  return (
    <div className="space-y-6">
      {/* Customer Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCustomers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">{activeCustomers.toLocaleString()} active customers</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">ETB {totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">From all customers</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Customer Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">ETB {avgCustomerValue.toFixed(0)}</div>
            <p className="text-xs text-muted-foreground">Per customer lifetime</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Growth Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userType === "registered" ? "+0%" : "+12.5%"}</div>
            <p className="text-xs text-muted-foreground">New customers this month</p>
          </CardContent>
        </Card>
      </div>

      {userType === "registered" && customers.length === 0 && (
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-muted-foreground">
              <p className="text-lg font-medium mb-2">No customers yet</p>
              <p>Your customer list will appear here once you start processing payments.</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col md:flex-row gap-4 items-center flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search customers by name, email, or phone..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>

              <Select value={riskFilter} onValueChange={setRiskFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Risk</SelectItem>
                  <SelectItem value="low">Low Risk</SelectItem>
                  <SelectItem value="medium">Medium Risk</SelectItem>
                  <SelectItem value="high">High Risk</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <ExportDialog
                title="Customers Report"
                data={filteredCustomers}
                headers={["Name", "Email", "Phone", "Status", "Total Spent", "Transactions", "Join Date"]}
                filename="payflow-customers.pdf"
                summary={{
                  "Total Customers": totalCustomers.toLocaleString(),
                  "Active Customers": activeCustomers.toLocaleString(),
                  "Total Revenue": `ETB ${totalRevenue.toLocaleString()}`,
                  "Avg Customer Value": `ETB ${avgCustomerValue.toFixed(0)}`
                }}
                filterByDate={filterCustomersByDate}
                formatDataForExport={formatCustomersForExport}
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

      {/* Customers Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Customers</span>
            <Badge variant="secondary">{filteredCustomers.length} customers</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {customers.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              <p>No customers to display</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b">
                    <tr className="text-left">
                      <th className="px-6 py-4 text-sm font-medium text-muted-foreground">CUSTOMER</th>
                      <th className="px-6 py-4 text-sm font-medium text-muted-foreground">CONTACT</th>
                      <th className="px-6 py-4 text-sm font-medium text-muted-foreground">STATUS</th>
                      <th className="px-6 py-4 text-sm font-medium text-muted-foreground">TOTAL SPENT</th>
                      <th className="px-6 py-4 text-sm font-medium text-muted-foreground">TRANSACTIONS</th>
                      <th className="px-6 py-4 text-sm font-medium text-muted-foreground">RISK LEVEL</th>
                      <th className="px-6 py-4 text-sm font-medium text-muted-foreground">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedCustomers.map((customer) => (
                      <tr key={customer.id} className="border-b hover:bg-muted/50">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <Avatar className="w-10 h-10">
                              <AvatarImage
                                src={`/abstract-geometric-shapes.png?height=40&width=40&query=${customer.fullName}`}
                              />
                              <AvatarFallback>
                                {customer.firstName[0]}
                                {customer.lastName[0]}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{customer.fullName}</div>
                              <div className="text-sm text-muted-foreground">
                                Joined {customer.joinDate.toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm">
                              <Mail className="w-3 h-3" />
                              {customer.email}
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Phone className="w-3 h-3" />
                              {customer.phone}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <Badge
                            variant="secondary"
                            className={
                              customer.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                            }
                          >
                            {customer.status}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 font-medium">ETB {customer.totalSpent.toLocaleString()}</td>
                        <td className="px-6 py-4">
                          <div>
                            <div className="font-medium">{customer.transactionCount}</div>
                            <div className="text-sm text-muted-foreground">
                              Avg: ETB {customer.avgTransaction.toFixed(0)}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <Badge variant="secondary" className={getRiskBadgeColor(customer.riskLevel)}>
                            {customer.riskLevel}
                          </Badge>
                        </td>
                        <td className="px-6 py-4">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="sm" onClick={() => setSelectedCustomer(customer)}>
                                <Eye className="w-4 h-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Customer Details</DialogTitle>
                              </DialogHeader>
                              {selectedCustomer && (
                                <div className="space-y-6">
                                  <div className="flex items-center gap-4">
                                    <Avatar className="w-16 h-16">
                                      <AvatarImage
                                        src={`/abstract-geometric-shapes.png?height=64&width=64&query=${selectedCustomer.fullName}`}
                                      />
                                      <AvatarFallback className="text-lg">
                                        {selectedCustomer.firstName[0]}
                                        {selectedCustomer.lastName[0]}
                                      </AvatarFallback>
                                    </Avatar>
                                    <div>
                                      <h3 className="text-xl font-semibold">{selectedCustomer.fullName}</h3>
                                      <p className="text-muted-foreground">{selectedCustomer.email}</p>
                                      <p className="text-muted-foreground">{selectedCustomer.phone}</p>
                                    </div>
                                  </div>

                                  <div className="grid grid-cols-2 gap-4">
                                    <Card>
                                      <CardHeader className="pb-2">
                                        <CardTitle className="text-sm">Total Spent</CardTitle>
                                      </CardHeader>
                                      <CardContent>
                                        <div className="text-2xl font-bold">
                                          ETB {selectedCustomer.totalSpent.toLocaleString()}
                                        </div>
                                      </CardContent>
                                    </Card>

                                    <Card>
                                      <CardHeader className="pb-2">
                                        <CardTitle className="text-sm">Transactions</CardTitle>
                                      </CardHeader>
                                      <CardContent>
                                        <div className="text-2xl font-bold">{selectedCustomer.transactionCount}</div>
                                      </CardContent>
                                    </Card>

                                    <Card>
                                      <CardHeader className="pb-2">
                                        <CardTitle className="text-sm">Avg Transaction</CardTitle>
                                      </CardHeader>
                                      <CardContent>
                                        <div className="text-2xl font-bold">
                                          ETB {selectedCustomer.avgTransaction.toFixed(0)}
                                        </div>
                                      </CardContent>
                                    </Card>

                                    <Card>
                                      <CardHeader className="pb-2">
                                        <CardTitle className="text-sm">Last Transaction</CardTitle>
                                      </CardHeader>
                                      <CardContent>
                                        <div className="text-lg font-medium">
                                          {selectedCustomer.lastTransaction.toLocaleDateString()}
                                        </div>
                                      </CardContent>
                                    </Card>
                                  </div>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>
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
                    Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredCustomers.length)} of{" "}
                    {filteredCustomers.length} customers
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
