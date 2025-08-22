
import { NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request: NextRequest) {
  try {
    const { to, subject, message, attachment, htmlAttachment } = await request.json()

    console.log('Email request received:', { to, subject, hasAttachment: !!attachment })

    // Check if email credentials are configured
    const emailUser = process.env.EMAIL_USER
    const emailPassword = process.env.EMAIL_PASSWORD

    if (!emailUser || !emailPassword || 
        emailUser === 'demo@example.com' || 
        emailPassword === 'demo-password') {
      
      console.log('Email credentials not configured - running in demo mode')
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

    // Create transporter with proper Gmail configuration
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: emailUser,
        pass: emailPassword,
      },
      tls: {
        rejectUnauthorized: false
      }
    })

    // Verify transporter configuration
    try {
      await transporter.verify()
      console.log('SMTP connection verified successfully')
    } catch (verifyError) {
      console.error('SMTP verification failed:', verifyError)
      return NextResponse.json(
        { error: 'Email server configuration error. Please check your email credentials.' },
        { status: 500 }
      )
    }

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
      from: `"PayEthio Dashboard" <${emailUser}>`,
      to,
      subject,
      text: message,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="text-align: center; margin-bottom: 30px; border-bottom: 2px solid #10b981; padding-bottom: 20px;">
            <div style="font-size: 20px; font-weight: bold; color: #10b981; margin-bottom: 10px; display: flex; align-items: center; justify-content: center; gap: 10px;">
              <div style="width: 32px; height: 32px; background: #10b981; border-radius: 6px; display: inline-flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 16px;">P</div>
              PayEthio
            </div>
            <h2 style="color: #10b981; margin: 0;">Export Report</h2>
          </div>
          <p style="line-height: 1.6;">${message}</p>
          <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; color: #6b7280; font-size: 14px;">
              This email was sent from PayEthio Dashboard. The report is attached as an HTML file that can be opened in any web browser and printed as PDF.
            </p>
          </div>
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #9ca3af; font-size: 12px; margin: 0;">© 2024 PayEthio. All rights reserved.</p>
          </div>
        </div>
      `,
      attachments,
    }

    console.log('Sending email...')
    await transporter.sendMail(mailOptions)
    console.log('Email sent successfully!')

    return NextResponse.json({ 
      success: true, 
      message: 'Email sent successfully!' 
    })

  } catch (error) {
    console.error('Error sending email:', error)
    
    // Provide more specific error messages
    if (error instanceof Error) {
      if (error.message.includes('Invalid login')) {
        return NextResponse.json(
          { error: 'Invalid email credentials. Please check your EMAIL_USER and EMAIL_PASSWORD in Secrets.' },
          { status: 500 }
        )
      }
      if (error.message.includes('self signed certificate')) {
        return NextResponse.json(
          { error: 'SSL certificate error. This is usually a temporary issue.' },
          { status: 500 }
        )
      }
    }

    return NextResponse.json(
      { error: 'Failed to send email. Please try again or check your email configuration.' },
      { status: 500 }
    )
  }
}
