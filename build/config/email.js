"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var nodemailer_1 = __importDefault(require("nodemailer"));
var Transport = nodemailer_1.default.createTransport({
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