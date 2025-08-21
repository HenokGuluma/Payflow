"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  CreditCard,
  Wallet,
  ArrowDownToLine,
  Banknote,
  Users,
  Settings,
  Menu,
  LogOut,
  Bell,
  Search,
  User
} from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ThemeToggle } from "@/components/ui/theme-toggle"


const navigation = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Transactions", href: "/dashboard/transactions", icon: CreditCard },
  { name: "Balance", href: "/dashboard/balance", icon: Wallet },
  { name: "Withdrawals", href: "/dashboard/withdrawals", icon: ArrowDownToLine },
  { name: "Account Funds", href: "/dashboard/funds", icon: Banknote },
  { name: "Customers", href: "/dashboard/customers", icon: Users },
  { name: "Customize Dashboard", href: "/dashboard/settings", icon: Settings },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userProfile, setUserProfile] = useState({
    name: "Henok Taddesse",
    email: "henokt@payflow.com",
    initials: "HT",
    userType: "demo",
  })

  useEffect(() => {
    const token = localStorage.getItem("payflow_auth")
    if (token !== "authenticated") {
      router.push("/login")
    } else {
      setIsAuthenticated(true)
      const storedUserType = localStorage.getItem("payflow_user_type") || "demo"
      const storedEmail = localStorage.getItem("payflow_user_email") || "henokt@payflow.com"

      if (storedUserType === "registered") {
        setUserProfile({
          name: storedEmail,
          email: storedEmail,
          initials: storedEmail.charAt(0).toUpperCase() + storedEmail.charAt(1).toUpperCase(),
          userType: "registered",
        })
      } else {
        setUserProfile({
          name: "Henok Taddesse",
          email: "henokt@payflow.com",
          initials: "HT",
          userType: "demo",
        })
      }
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("payflow_auth")
    router.push("/login")
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <div className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-sidebar-foreground">PayFlow</h1>
              <p className="text-xs text-muted-foreground">Merchant ID: 2862622</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.name}
              </Link>
            )
          })}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3 mb-3">
            <Avatar className="w-8 h-8">
              <AvatarImage src="/placeholder-dnqe5.png" />
              <AvatarFallback>{userProfile.initials}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">{userProfile.name}</p>
              <p className="text-xs text-muted-foreground truncate">{userProfile.email}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="w-full justify-start gap-2 text-muted-foreground hover:text-sidebar-foreground"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-card border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="md:hidden">
                <Menu className="w-4 h-4" />
              </Button>
              <h2 className="text-xl font-semibold text-foreground">
                {navigation.find((item) => item.href === pathname)?.name || "Dashboard"}
              </h2>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-foreground">Live Mode</span>
              </div>
              <Avatar className="w-8 h-8">
                <AvatarImage src="/placeholder-dnqe5.png" />
                <AvatarFallback>{userProfile.initials}</AvatarFallback>
              </Avatar>
              <Button size="icon" variant="outline">
                <Bell className="h-4 w-4" />
              </Button>
              <ThemeToggle />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}