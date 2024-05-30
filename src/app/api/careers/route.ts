import { NextResponse, NextRequest } from 'next/server'
import nodemailer from 'nodemailer';
import {Buffer} from "buffer";



export interface IValues {
    fullName: string
    email: string
    link: string
    contactNumber: string
    letter: string
    careers: string
    file: File | undefined
}

export async function POST(request: Request) {
    const formData = await request.formData();
    const fullName = formData.get("fullName");
    const email = formData.get("email");
    const link = formData.get("link");
    const contactNumber = formData.get("contactNumber");
    const letter = formData.get("letter");
    const careers = formData.get("careers");
    const file = formData.get("file");

    let buffer;
    if (file) {
        // @ts-ignore
        const arrayBuffer = await file.arrayBuffer()
        buffer = Buffer.from(arrayBuffer)
    }

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.NEXT_PUBLIC_SENDER_EMAIL,
            pass: process.env.NEXT_PUBLIC_EMAIL_APP_PASSWORD,
        }
    });

    await transporter.sendMail({
        from: process.env.NEXT_PUBLIC_SENDER_EMAIL,
        to: process.env.NEXT_PUBLIC_RECEIVER_EMAIL,
        subject: 'Question from BEM Funding / Contacts',
        text: "",
        html:
            `
                <div>
                     <p>Mail from BEM Funding / Careers</p>
                     <p>Career: ${careers}</p>
                     <p>Sender full name: ${fullName}</p>
                     <p>Sender email: ${email}</p>
                     <p>Sender linkedin/github link: ${link ? link : "-"}</p>
                     <p>Sender contact number: ${contactNumber}</p>
                     <p>Sender message: ${letter ? letter : "-"}</p>
                </div>
             `,
        attachments: [
            (buffer && file) ? {
                // @ts-ignore
                filename: file?.name || "file",
                content: buffer
            } : {}
        ]
    })

    return NextResponse.json("response - post api/careers")
}