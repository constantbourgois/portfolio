import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: `"Constant Bourgois" <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_TO,
      subject: "Contact site web",
      text: `From ${name} <${email}>\n\n${message}`,
      html: `from ${name} <br> ${email} <br> ${message}`,
    });

    console.log("Message sent:", info.messageId);
    return NextResponse.json({ message: "Email sent", id: info.messageId });
  } catch (error: unknown) {
    console.error("Email send failed:", error);
    const errorMessage = error instanceof Error ? error.message : "Internal error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
