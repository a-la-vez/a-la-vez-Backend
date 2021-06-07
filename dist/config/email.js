"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = require("nodemailer");
const Transport = nodemailer_1.createTransport({
    service: "GMAIL",
    host: "smtp.gmail.com",
    auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PWD
    },
    tls: {
        rejectUnauthorized: false
    }
});
exports.default = Transport;
//# sourceMappingURL=email.js.map