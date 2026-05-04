import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()

    const name    = formData.get('name')?.toString() ?? ''
    const email   = formData.get('email')?.toString() ?? ''
    const phone   = formData.get('phone')?.toString() ?? ''
    const service = formData.get('service')?.toString() ?? ''
    const message = formData.get('message')?.toString() ?? ''

    const fileEntries = formData.getAll('files') as File[]
    const fileNames = fileEntries
      .filter((f) => f && f.name)
      .map((f) => `• ${f.name} (${(f.size / 1024).toFixed(0)} KB)`)

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    })

    await transporter.sendMail({
      from: `"BARKS Folierung Website" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      replyTo: email,
      subject: `Neue Anfrage: ${service} – ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="border-bottom: 2px solid #e5e5e5; padding-bottom: 10px;">
            Neue Anfrage über barksfolierung.de
          </h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #666; width: 130px;"><strong>Name</strong></td>
              <td style="padding: 8px 0;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;"><strong>E-Mail</strong></td>
              <td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;"><strong>Telefon</strong></td>
              <td style="padding: 8px 0;">${phone || '–'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;"><strong>Leistung</strong></td>
              <td style="padding: 8px 0;">${service}</td>
            </tr>
          </table>
          <h3 style="margin-top: 20px;">Projektbeschreibung</h3>
          <p style="background: #f5f5f5; padding: 12px; border-radius: 4px; white-space: pre-wrap;">${message}</p>
          ${fileNames.length > 0 ? `
            <h3>Angehängte Dateien</h3>
            <p style="background: #f5f5f5; padding: 12px; border-radius: 4px; line-height: 1.8;">
              ${fileNames.join('<br>')}
            </p>
            <p style="color: #888; font-size: 13px;">
              Der Kunde hat Dateien hochgeladen. Bitte antworten Sie auf diese E-Mail und bitten Sie um erneute Zusendung falls nötig.
            </p>
          ` : ''}
          <hr style="margin-top: 30px; border: none; border-top: 1px solid #e5e5e5;" />
          <p style="color: #aaa; font-size: 12px;">Gesendet über das Kontaktformular auf barksfolierung.de</p>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Email error:', error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
