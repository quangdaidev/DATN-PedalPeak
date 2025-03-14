
import http from 'http';
import nodemailer from 'nodemailer';
 
// Configure the SMTP transporter
const transporter = nodemailer.createTransport({
    // host: 'live.smtp.mailtrap.io',
    // port: 587,
    // secure: false, // use SSL
    host: 'smtp.gmail.com', // e.g., 'smtp.gmail.com' for Gmail
    port: 465, // or 465 for secure
    secure: true, // true for port 465, false for other ports
    auth: {
        user: process.env.EMAIL, // your SMTP username
        pass: process.env.EMAIL_PASS, // your SMTP password
    },
    tls: {
        rejectUnauthorized: false
    }
});

// Function to send email

async function sendEmail(content) {
   
    try {
        // console.log("Send email with:", content);
        await transporter.sendMail({
            from: process.env.EMAIL, // sender address
            to: content.to,
            subject: content.subject, // Subject line
            text: content.text, // plain text body
            html: content.html, // html body
        });

        return { success: true };
    } catch (error) {
        console.error('Error sending email:', error);
        return { success: false, error: error.message };
    }
}

export {sendEmail};
