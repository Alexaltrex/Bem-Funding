import { NextResponse, NextRequest } from 'next/server'
import nodemailer from 'nodemailer';

export interface IValues {
    fullName: string
    email: string
    contactNumber: string
    coverLetter: string
}

export async function POST(request: Request) {
    const body = (await request.json()) as IValues;
    console.log(body);

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
                     <p>Question from BEM Funding / Contacts</p> 
                     <p>Sender full name: ${body.fullName}</p>                         
                     <p>Sender email: ${body.email}</p>
                     <p>Sender contact number: ${body.contactNumber ? body.contactNumber : "-"}</p>                   
                     <p>Sender message: ${body.coverLetter ? body.coverLetter : "-"}</p> 
                </div>
             `
    })

    return NextResponse.json("post api/contacts")
}