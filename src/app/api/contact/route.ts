
import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const { name, email, message } = await request.json();

        // Check empty fields
        if (!name || !email || !message) {
            return NextResponse.json(
                { message: "Please fill in all fields" },
                { status: 400 }
            );
        }

        // Send email
        const { data, error } = await resend.emails.send({
            from: "Miraz Portfolio <onboarding@resend.dev>",
            to: process.env.CONTACT_EMAIL!,
            replyTo: email,
            subject: `New Message from ${name}`,
            text: `Name: ${name} Email: ${email} Message:${message}`,
         });

        if (error) {
            return NextResponse.json(
                { message: "Email sending failed" },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            message: "Message sent successfully!",
        });

    } catch (error) {
        return NextResponse.json(
            { message: "Something went wrong" },
            { status: 500 }
        );
    }
}
