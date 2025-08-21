
"use client"

import jsPDF from "jspdf"
import "jspdf-autotable"

// Extend jsPDF type to include autoTable
declare module "jspdf" {
  interface jsPDF {
    autoTable: (options: any) => jsPDF
  }
}

export interface ExportData {
  title: string
  headers: string[]
  data: any[]
  summary?: { [key: string]: any }
  startDate?: string
  endDate?: string
}

export interface EmailOptions {
  to: string
  subject: string
  message?: string
}

export class ExportService {
  static generatePDF(exportData: ExportData): Uint8Array {
    const doc = new jsPDF()
    let yPosition = 20

    // Add title
    doc.setFontSize(20)
    doc.text(exportData.title, 20, yPosition)
    yPosition += 15

    // Add date range if provided
    if (exportData.startDate && exportData.endDate) {
      doc.setFontSize(12)
      doc.text(`Date Range: ${exportData.startDate} to ${exportData.endDate}`, 20, yPosition)
      yPosition += 10
    }

    // Add summary if provided
    if (exportData.summary) {
      doc.setFontSize(12)
      Object.entries(exportData.summary).forEach(([key, value]) => {
        doc.text(`${key}: ${value}`, 20, yPosition)
        yPosition += 8
      })
      yPosition += 5
    }

    // Add generation date
    doc.setFontSize(10)
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 20, yPosition)
    yPosition += 15

    // Add table
    try {
      doc.autoTable({
        head: [exportData.headers],
        body: exportData.data,
        startY: yPosition,
        styles: { fontSize: 8 },
        headStyles: { fillColor: [16, 185, 129] },
        margin: { top: 10 },
      })
    } catch (error) {
      console.error("Error generating table:", error)
      doc.text("Error generating table data", 20, yPosition)
    }

    return doc.output("arraybuffer") as Uint8Array
  }

  static downloadPDF(exportData: ExportData, filename: string) {
    try {
      const pdfBytes = this.generatePDF(exportData)
      const blob = new Blob([pdfBytes], { type: "application/pdf" })
      const url = URL.createObjectURL(blob)
      
      const link = document.createElement("a")
      link.href = url
      link.download = filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Error downloading PDF:", error)
      alert("Error generating PDF. Please try again.")
    }
  }

  static async sendEmail(exportData: ExportData, filename: string, emailOptions: EmailOptions): Promise<boolean> {
    try {
      const pdfBytes = this.generatePDF(exportData)
      const base64PDF = btoa(String.fromCharCode(...pdfBytes))

      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: emailOptions.to,
          subject: emailOptions.subject,
          message: emailOptions.message || `Please find attached the ${exportData.title} report.`,
          attachment: {
            filename,
            content: base64PDF,
            contentType: "application/pdf",
          },
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to send email")
      }

      return true
    } catch (error) {
      console.error("Error sending email:", error)
      return false
    }
  }
}
