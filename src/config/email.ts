import {createTransport} from "nodemailer";

const Transport = createTransport({
    service: "GMAIL",
    host:"smtp.gmail.com",
    auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PWD
    },
    tls: {
        rejectUnauthorized: false
    }
})

export default Transport