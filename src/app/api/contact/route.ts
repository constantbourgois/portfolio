import { NextResponse } from 'next/server';
import nodemailer from "nodemailer";


export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, message } = body;

  if (!name || !email || !message) {
    return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
  }

  console.log('Contact Form Submission:', { name, email, message });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "constantbourgois@gmail.com",
      pass: process.env.GOOGLE_APP_PASSWORD,
    },
  });
  
  // Wrap in an async IIFE so we can use await.
  (async () => {
    const info = await transporter.sendMail({
      from: 'contact site web" <maddison53@ethereal.email>',
      to: "constantbourgois@gmail.com",
      subject: "contact site web",
      text: "Hello world?", // plain‑text body
      html: "from " + name + "<br>" + email + "<br> " + message, // HTML body
    });
  
    console.log("Message sent:", info.messageId);
  })();

  return NextResponse.json({ message: 'Message received' }, { status: 200 });
}

