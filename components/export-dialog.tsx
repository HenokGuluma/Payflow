
"use client"

import { useState } from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon, Download, FileText, Mail, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import { ExportService } from "@/lib/export-service"

interface ExportDialogProps {
  title: string
  data: any[]
  summary?: Record<string, any>
  children: React.ReactNode
}

export function ExportDialog({ title, data, summary = {}, children }: ExportDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const [email, setEmail] = useState("")
  const [emailSubject, setEmailSubject] = useState(`${title} Export Report`)
  const [emailMessage, setEmailMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const filterDataByDateRange = (data: any[], start?: Date, end?: Date) => {
    if (!start && !end) return data

    return data.filter((item) => {
      const itemDate = new Date(item.date || item.createdAt || item.timestamp)
      if (start && itemDate < start) return false
      if (end && itemDate > end) return false
      return true
    })
  }

  const calculateFilteredSummary = (filteredData: any[], originalSummary: Record<string, any>) => {
    if (!filteredData.length) {
      return {
        totalTransactions: 0,
        totalAmount: 0,
        ...Object.keys(originalSummary).reduce((acc, key) => {
          if (!key.toLowerCase().includes('total')) {
            acc[key] = originalSummary[key]
          } else if (key.toLowerCase().includes('transaction')) {
            acc[key] = 0
          } else if (key.toLowerCase().includes('amount')) {
            acc[key] = 0
          }
          return acc
        }, {} as Record<string, any>)
      }
    }

    const newSummary: Record<string, any> = {}

    // Calculate transaction count
    newSummary.totalTransactions = filteredData.length

    // Calculate total amount
    const totalAmount = filteredData.reduce((sum, item) => {
      const amount = item.amount || item.value || item.total || 0
      return sum + (typeof amount === 'string' ? parseFloat(amount) || 0 : amount)
    }, 0)
    newSummary.totalAmount = totalAmount

    // Copy other summary fields that might not be amount-related
    Object.keys(originalSummary).forEach(key => {
      if (!key.toLowerCase().includes('total') ||
          (!key.toLowerCase().includes('transaction') && !key.toLowerCase().includes('amount'))) {
        newSummary[key] = originalSummary[key]
      }
    })

    return newSummary
  }

  const handleDownload = async () => {
    try {
      setIsLoading(true)
      
      const filteredData = filterDataByDateRange(data, startDate, endDate)
      const filteredSummary = calculateFilteredSummary(filteredData, summary)
      
      // Extract headers from the first data item or use default headers
      const headers = filteredData.length > 0 
        ? Object.keys(filteredData[0])
        : ['Date', 'Amount', 'Description']
      
      const exportData = {
        title,
        headers,
        data: filteredData,
        summary: filteredSummary,
        startDate: startDate?.toLocaleDateString(),
        endDate: endDate?.toLocaleDateString(),
      }

      const filename = `${title.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.pdf`
      ExportService.downloadPDF(exportData, filename)
    } catch (error) {
      console.error("Export failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleEmailSend = async () => {
    if (!email) return

    try {
      setIsLoading(true)
      
      const filteredData = filterDataByDateRange(data, startDate, endDate)
      const filteredSummary = calculateFilteredSummary(filteredData, summary)
      
      // Extract headers from the first data item or use default headers
      const headers = filteredData.length > 0 
        ? Object.keys(filteredData[0])
        : ['Date', 'Amount', 'Description']
      
      const exportData = {
        title,
        headers,
        data: filteredData,
        summary: filteredSummary,
        startDate: startDate?.toLocaleDateString(),
        endDate: endDate?.toLocaleDateString(),
      }

      const filename = `${title.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.pdf`
      const emailOptions = {
        to: email,
        subject: emailSubject,
        message: emailMessage || `Please find attached the ${title} report.`,
      }

      const success = await ExportService.sendEmail(exportData, filename, emailOptions)
      
      if (success) {
        setIsOpen(false)
        setEmail("")
        setEmailMessage("")
        // You could add a toast notification here
      }
    } catch (error) {
      console.error("Email sending failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Export {title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Info message */}
          <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
            <div className="flex items-start gap-2">
              <FileText className="w-4 h-4 text-blue-600 mt-0.5" />
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-1">Export Information</p>
                <p>
                  The export will generate an HTML report that can be opened in any browser and printed as PDF.
                  {startDate || endDate ? " Data will be filtered by the selected date range." : " All data will be included."}
                </p>
              </div>
            </div>
          </div>

          {/* Date Range Selection */}
          <div className="space-y-3">
            <Label>Date Range (Optional)</Label>
            <div className="flex gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "justify-start text-left font-normal",
                      !startDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, "PPP") : "Start date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
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
                      "justify-start text-left font-normal",
                      !endDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, "PPP") : "End date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Email Section */}
          <div className="space-y-2">
            <Label htmlFor="email">Email to (Optional)</Label>
            <Input
              id="email"
              type="email"
              placeholder="recipient@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {email && (
            <>
              <div className="space-y-2">
                <Label htmlFor="subject">Email Subject</Label>
                <Input
                  id="subject"
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Email Message</Label>
                <Textarea
                  id="message"
                  placeholder="Additional message..."
                  value={emailMessage}
                  onChange={(e) => setEmailMessage(e.target.value)}
                  rows={3}
                />
              </div>
            </>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2 pt-4">
            <Button onClick={handleDownload} className="flex-1">
              <Download className="w-4 h-4 mr-2" />
              Export & Print
            </Button>

            {email && (
              <Button onClick={handleEmailSend} disabled={isLoading} variant="secondary">
                {isLoading ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Mail className="w-4 h-4 mr-2" />
                )}
                Send Email
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
