import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';
import { render } from '@react-email/render';
import { ContactFormEmail } from '@/app/emails/ContactFormEmail';

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);
    const body = await request.json();
    const { name, email, company, service, message } = body;

    const emailHtml = await render(
      <ContactFormEmail
        name={name}
        email={email}
        company={company}
        service={service}
        message={message}
      />
    );

    await resend.emails.send({
      from: 'contact@shaganplaatjies.co.za',
      to: 'plaatjiesshagan@gmail.com',
      subject: `New Contact Form Submission: ${service}`,
      html: emailHtml,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Email send error:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
