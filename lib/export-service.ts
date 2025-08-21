
"use client"

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
  static generateHTMLTable(exportData: ExportData): string {
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>${exportData.title}</title>
        <style>
          body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
            margin: 40px; 
            color: #333; 
          }
          .header { 
            text-align: center; 
            margin-bottom: 30px; 
            border-bottom: 2px solid #10b981; 
            padding-bottom: 20px; 
            position: relative;
          }
          .logo { 
            font-size: 18px; 
            font-weight: bold; 
            color: #10b981; 
            margin-bottom: 10px; 
          }
          .watermark {
            position: absolute;
            top: 10px;
            right: 10px;
            opacity: 0.1;
            font-size: 48px;
            font-weight: bold;
            color: #10b981;
            transform: rotate(-15deg);
            pointer-events: none;
          }
          .title { 
            font-size: 24px; 
            font-weight: bold; 
            color: #1f2937; 
            margin-bottom: 10px; 
          }
          .date-range { 
            font-size: 14px; 
            color: #6b7280; 
            margin-bottom: 5px; 
          }
          .generated { 
            font-size: 12px; 
            color: #9ca3af; 
          }
          .summary { 
            background: #f9fafb; 
            padding: 20px; 
            border-radius: 8px; 
            margin-bottom: 30px; 
            border-left: 4px solid #10b981; 
          }
          .summary-item { 
            display: flex; 
            justify-content: space-between; 
            margin-bottom: 8px; 
            font-size: 14px; 
          }
          .summary-label { 
            font-weight: 600; 
            color: #374151; 
          }
          .summary-value { 
            color: #1f2937; 
          }
          table { 
            width: 100%; 
            border-collapse: collapse; 
            margin-top: 20px; 
            background: white; 
            box-shadow: 0 1px 3px rgba(0,0,0,0.1); 
          }
          th { 
            background: #10b981; 
            color: white; 
            padding: 12px 8px; 
            text-align: left; 
            font-weight: 600; 
            font-size: 12px; 
            text-transform: uppercase; 
            letter-spacing: 0.5px; 
          }
          td { 
            padding: 10px 8px; 
            border-bottom: 1px solid #e5e7eb; 
            font-size: 13px; 
          }
          tr:nth-child(even) { 
            background: #f9fafb; 
          }
          tr:hover { 
            background: #f3f4f6; 
          }
          .no-data { 
            text-align: center; 
            padding: 40px; 
            color: #6b7280; 
            font-style: italic; 
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="watermark">PayEthio</div>
          <div class="logo">PayEthio Payment Solutions</div>
          <div class="title">${exportData.title}</div>
          ${exportData.startDate && exportData.endDate ? 
            `<div class="date-range">Date Range: ${exportData.startDate} to ${exportData.endDate}</div>` : 
            ''
          }
          <div class="generated">Generated: ${new Date().toLocaleDateString()}</div>
        </div>
        
        ${exportData.summary ? `
          <div class="summary">
            ${Object.entries(exportData.summary).map(([key, value]) => 
              `<div class="summary-item">
                <span class="summary-label">${key}:</span>
                <span class="summary-value">${value}</span>
              </div>`
            ).join('')}
          </div>
        ` : ''}
        
        ${exportData.data.length > 0 ? `
          <table>
            <thead>
              <tr>
                ${exportData.headers.map(header => `<th>${header}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
              ${exportData.data.map(row => 
                `<tr>${Array.isArray(row) ? 
                  row.map(cell => `<td>${cell}</td>`).join('') :
                  exportData.headers.map(header => `<td>${row[header] || ''}</td>`).join('')
                }</tr>`
              ).join('')}
            </tbody>
          </table>
        ` : `
          <div class="no-data">No data available for the selected criteria</div>
        `}
      </body>
      </html>
    `
    return html
  }

  static async generatePDF(exportData: ExportData): Promise<Uint8Array> {
    const html = this.generateHTMLTable(exportData)
    
    try {
      // Try PDFShift API first (you'd need to sign up for a free account)
      const response = await fetch('https://api.pdfshift.io/v3/convert/pdf', {
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + btoa('api:sk-demo'), // Use demo key for now
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          source: html,
          format: 'A4',
          margin: '20mm',
          landscape: false,
        }),
      })

      if (response.ok) {
        const arrayBuffer = await response.arrayBuffer()
        return new Uint8Array(arrayBuffer)
      }
    } catch (error) {
      console.log('PDFShift API failed, trying alternative method:', error)
    }

    // Fallback: Use browser's print API to generate PDF
    return this.generatePDFFromBrowser(html)
  }

  static async generatePDFFromBrowser(html: string): Promise<Uint8Array> {
    return new Promise((resolve, reject) => {
      // Create a hidden iframe
      const iframe = document.createElement('iframe')
      iframe.style.position = 'absolute'
      iframe.style.top = '-9999px'
      iframe.style.left = '-9999px'
      iframe.style.width = '1px'
      iframe.style.height = '1px'
      document.body.appendChild(iframe)

      iframe.onload = () => {
        try {
          const iframeWindow = iframe.contentWindow
          if (!iframeWindow) {
            reject(new Error('Could not access iframe window'))
            return
          }

          // Write HTML to iframe
          iframeWindow.document.open()
          iframeWindow.document.write(html)
          iframeWindow.document.close()

          // Give it a moment to render
          setTimeout(() => {
            try {
              // Use the browser's print functionality
              iframeWindow.print()
              
              // Clean up
              document.body.removeChild(iframe)
              
              // For demo purposes, create a simple PDF-like response
              const demoContent = `PDF Export: ${new Date().toISOString()}\n\nThis is a fallback PDF generation method.`
              const encoder = new TextEncoder()
              resolve(encoder.encode(demoContent))
            } catch (printError) {
              document.body.removeChild(iframe)
              reject(printError)
            }
          }, 1000)
        } catch (error) {
          document.body.removeChild(iframe)
          reject(error)
        }
      }

      iframe.onerror = () => {
        document.body.removeChild(iframe)
        reject(new Error('Failed to load iframe'))
      }

      // Set a basic HTML page
      iframe.src = 'about:blank'
    })
  }

  static downloadPDF(exportData: ExportData, filename: string) {
    // For immediate download, generate HTML and open print dialog
    const html = this.generateHTMLTable(exportData)
    
    // Create a new window with the HTML content
    const printWindow = window.open('', '_blank')
    if (printWindow) {
      printWindow.document.write(html)
      printWindow.document.close()
      
      // Add print styles and trigger print dialog
      printWindow.onload = () => {
        printWindow.print()
        // Don't close automatically, let user close after printing
      }
    } else {
      // Fallback: download as HTML file
      const blob = new Blob([html], { type: 'text/html' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = filename.replace('.pdf', '.html')
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    }
  }

  static async sendEmail(exportData: ExportData, filename: string, emailOptions: EmailOptions): Promise<boolean> {
    try {
      const html = this.generateHTMLTable(exportData)

      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: emailOptions.to,
          subject: emailOptions.subject,
          message: emailOptions.message || `Please find attached the ${exportData.title} report.`,
          htmlAttachment: {
            filename: filename.replace('.pdf', '.html'),
            content: html,
            contentType: "text/html",
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
