import {createTransport} from "nodemailer";
import smtpTransport from "nodemailer-smtp-transport";

const Transport = createTransport(smtpTransport({
    service: "GMAIL",
    host:"smtp.gmail.com",
    auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PWD
    }
}))

export default Transport