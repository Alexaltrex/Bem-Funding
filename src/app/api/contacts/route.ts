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

    

    return NextResponse.json("post api/contacts")
}