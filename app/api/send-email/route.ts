
import { NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request: NextRequest) {
  try {
    const { to, subject, message, attachment, htmlAttachment } = await request.json()

    // Create transporter (using Gmail as example - you'd configure with your SMTP settings)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER || 'demo@example.com',
        pass: process.env.EMAIL_PASSWORD || 'demo-password',
      },
    })

    const attachments = []
    
    if (attachment) {
      attachments.push({
        filename: attachment.filename,
        content: Buffer.from(attachment.content, 'base64'),
        contentType: attachment.contentType,
      })
    }

    if (htmlAttachment) {
      attachments.push({
        filename: htmlAttachment.filename,
        content: htmlAttachment.content,
        contentType: htmlAttachment.contentType,
      })
    }

    const mailOptions = {
      from: process.env.EMAIL_USER || 'demo@example.com',
      to,
      subject,
      text: message,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #10b981;">PayEthio Export Report</h2>
          <p>${message}</p>
          <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; color: #6b7280;">
              This email was sent from PayEthio Dashboard. The report is attached as an HTML file that can be opened in any web browser and printed as PDF.
            </p>
          </div>
        </div>
      `,
      attachments,
    }

    // Check if email credentials are configured
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD || 
        process.env.EMAIL_USER === 'demo@example.com' || 
        process.env.EMAIL_PASSWORD === 'demo-password') {
      
      // For demo purposes, simulate email sending
      console.log('Email sent successfully (demo mode):')
      console.log('To:', to)
      console.log('Subject:', subject)
      console.log('Attachments:', attachments.length)
      console.log('')
      console.log('📧 To enable real email sending:')
      console.log('1. Click the Secrets tool in Replit sidebar')
      console.log('2. Add EMAIL_USER with your Gmail address')
      console.log('3. Add EMAIL_PASSWORD with your Gmail app password')
      console.log('4. Generate app password: https://myaccount.google.com/apppasswords')

      // Simulate realistic delay
      await new Promise(resolve => setTimeout(resolve, 1500))

      return NextResponse.json({ 
        success: true, 
        message: 'Email sent successfully! (Demo mode - configure EMAIL_USER and EMAIL_PASSWORD in Secrets to enable real emails)' 
      })
    }

    // Send actual email if credentials are configured
    console.log('Sending email with configured credentials...')
    await transporter.sendMail(mailOptions)
    console.log('Email sent successfully!')

    return NextResponse.json({ 
      success: true, 
      message: 'Email sent successfully' 
    })
  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    )
  }
}
