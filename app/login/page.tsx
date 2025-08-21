"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, CreditCard, Loader2, ArrowLeft } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [loadingStep, setLoadingStep] = useState("")
  const [progress, setProgress] = useState(0)
  const [isRegistering, setIsRegistering] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState("")
  const [companyName, setCompanyName] = useState("")
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setProgress(0)

    try {
      // Step 1: Validating credentials
      setLoadingStep("Validating credentials...")
      setProgress(20)
      await new Promise((resolve) => setTimeout(resolve, 1200))

      if (!email || !password) {
        throw new Error("Please enter both email and password")
      }

      if (email === "henokt@payethio.com" && password === "tdashuluqa") {
        // Step 2: Authenticating user
        setLoadingStep("Authenticating user...")
        setProgress(40)
        await new Promise((resolve) => setTimeout(resolve, 800))

        // Step 3: Loading user profile
        setLoadingStep("Loading user profile...")
        setProgress(60)
        await new Promise((resolve) => setTimeout(resolve, 600))

        // Step 4: Preparing dashboard
        setLoadingStep("Preparing dashboard...")
        setProgress(80)
        await new Promise((resolve) => setTimeout(resolve, 700))

        // Step 5: Finalizing
        setLoadingStep("Almost ready...")
        setProgress(100)
        await new Promise((resolve) => setTimeout(resolve, 500))

        // Store auth token and redirect
        localStorage.setItem("payethio_auth", "authenticated")
        localStorage.setItem("payethio_login_time", Date.now().toString())
        localStorage.setItem("payethio_user_email", email)
        localStorage.setItem("payethio_user_type", "demo")
        router.push("/dashboard")
      } else {
        throw new Error("Invalid email or password")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authentication failed")
      setIsLoading(false)
      setProgress(0)
      setLoadingStep("")
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setProgress(0)

    try {
      if (!email || !password || !confirmPassword || !companyName) {
        throw new Error("Please fill in all fields")
      }

      if (password !== confirmPassword) {
        throw new Error("Passwords do not match")
      }

      // Registration steps
      setLoadingStep("Creating your account...")
      setProgress(25)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setLoadingStep("Setting up payment gateway...")
      setProgress(50)
      await new Promise((resolve) => setTimeout(resolve, 1200))

      setLoadingStep("Configuring dashboard...")
      setProgress(75)
      await new Promise((resolve) => setTimeout(resolve, 800))

      setLoadingStep("Finalizing setup...")
      setProgress(100)
      await new Promise((resolve) => setTimeout(resolve, 600))

      // Store auth token and user data
      localStorage.setItem("payethio_auth", "authenticated")
      localStorage.setItem("payethio_login_time", Date.now().toString())
      localStorage.setItem("payethio_user_email", email)
      localStorage.setItem("payethio_company_name", companyName)
      localStorage.setItem("payethio_user_type", "registered")
      router.push("/dashboard")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed")
      setIsLoading(false)
      setProgress(0)
      setLoadingStep("")
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-between mb-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>

          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="p-2 bg-emerald-600 rounded-lg">
              <CreditCard className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-emerald-600">PayEthio</h1>
          </div>
          <CardTitle>{isRegistering ? "Create Account" : "Welcome Back"}</CardTitle>
          <CardDescription>
            {isRegistering
              ? "Sign up for PayEthio to start accepting payments"
              : "Sign in to your PayEthio dashboard to manage transactions and customers"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={isRegistering ? handleRegister : handleLogin} className="space-y-4">
            {isRegistering && (
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  type="text"
                  placeholder="Enter your company name"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            {isRegistering && (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
            )}

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {isLoading && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {loadingStep}
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            )}

            <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700" disabled={isLoading}>
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {isRegistering ? "Creating Account..." : "Signing in..."}
                </div>
              ) : isRegistering ? (
                "Create Account"
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              {isRegistering ? "Already have an account?" : "Don't have an account?"}{" "}
              <Button
                variant="link"
                className="p-0 h-auto text-emerald-600 hover:text-emerald-700"
                onClick={() => {
                  setIsRegistering(!isRegistering)
                  setError("")
                  setEmail("")
                  setPassword("")
                  setConfirmPassword("")
                  setCompanyName("")
                }}
                disabled={isLoading}
              >
                {isRegistering ? "Sign In" : "Sign Up"}
              </Button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}