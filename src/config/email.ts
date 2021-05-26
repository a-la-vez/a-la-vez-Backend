import nodemailer from "nodemailer";
import smtpTransport from "nodemailer-smtp-transport";

const Transport = nodemailer.createTransport(smtpTransport({
    service: "GMAIL",
    host:"smtp.gmail.com",
    auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PWD
    },
    tls: {
        rejectUnauthorized: false
    }
}))

export default Transport