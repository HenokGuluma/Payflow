
"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Download, Mail, Loader2, FileText } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { ExportService, ExportData, EmailOptions } from "@/lib/export-service"

interface ExportDialogProps {
  title: string
  data: any[]
  headers: string[]
  filename: string
  summary?: { [key: string]: any }
  children: React.ReactNode
  filterByDate?: (data: any[], startDate: Date, endDate: Date) => any[]
  formatDataForExport?: (data: any[]) => any[]
}

export function ExportDialog({
  title,
  data,
  headers,
  filename,
  summary,
  children,
  filterByDate,
  formatDataForExport
}: ExportDialogProps) {
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const [email, setEmail] = useState("")
  const [emailSubject, setEmailSubject] = useState(`${title} Export`)
  const [emailMessage, setEmailMessage] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const getFilteredData = () => {
    let filteredData = data
    
    if (startDate && endDate && filterByDate) {
      filteredData = filterByDate(data, startDate, endDate)
    }
    
    if (formatDataForExport) {
      return formatDataForExport(filteredData)
    }
    
    return filteredData
  }

  const handleDownload = () => {
    const filteredData = getFilteredData()
    
    const exportData: ExportData = {
      title,
      headers,
      data: filteredData,
      summary,
      startDate: startDate?.toLocaleDateString(),
      endDate: endDate?.toLocaleDateString(),
    }

    ExportService.downloadPDF(exportData, filename)
  }

  const handleEmailSend = async () => {
    if (!email.trim()) {
      alert("Please enter an email address")
      return
    }

    setIsLoading(true)
    try {
      const filteredData = getFilteredData()
      
      const exportData: ExportData = {
        title,
        headers,
        data: filteredData,
        summary,
        startDate: startDate?.toLocaleDateString(),
        endDate: endDate?.toLocaleDateString(),
      }

      const emailOptions: EmailOptions = {
        to: email,
        subject: emailSubject || `${title} Export`,
        message: emailMessage || `Please find attached the ${title} report.`,
      }

      const success = await ExportService.sendEmail(exportData, filename, emailOptions)
      
      if (success) {
        alert("Email sent successfully! The report has been sent as an HTML file that can be printed as PDF.")
        setIsOpen(false)
        setEmail("")
        setEmailMessage("")
      } else {
        alert("Failed to send email. Please try again.")
      }
    } catch (error) {
      console.error("Error sending email:", error)
      alert("Failed to send email. Please try again.")
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
                <p className="font-medium">Export Method</p>
                <p>Downloads will open a print dialog where you can save as PDF or print directly.</p>
              </div>
            </div>
          </div>

          {/* Date Range */}
          <div className="space-y-2">
            <Label>Date Range (Optional)</Label>
            <div className="grid grid-cols-2 gap-2">
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
