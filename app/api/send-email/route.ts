
import { NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request: NextRequest) {
  try {
    const { to, subject, message, attachment, htmlAttachment } = await request.json()

    // Create transporter (using Gmail as example - you'd configure with your SMTP settings)
    const transporter = nodemailer.createTransporter({
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
          <h2 style="color: #10b981;">PayFlow Export Report</h2>
          <p>${message}</p>
          <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; color: #6b7280;">
              This email was sent from PayFlow Dashboard. The report is attached as an HTML file that can be opened in any web browser and printed as PDF.
            </p>
          </div>
        </div>
      `,
      attachments,
    }

    // For demo purposes, just log the email details
    console.log('Email would be sent with the following details:')
    console.log('To:', to)
    console.log('Subject:', subject)
    console.log('Attachments:', attachments.length)

    // In a real implementation, you would:
    // await transporter.sendMail(mailOptions)

    return NextResponse.json({ 
      success: true, 
      message: 'Email sent successfully (demo mode)' 
    })
  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    )
  }
}
