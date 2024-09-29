import nodemailer from 'nodemailer';
import {configs} from "../configs/configs";

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: configs.SMTP_USER,
        pass: configs.SMTP_PASS,
    }
});

export const emailService = {
    sendMail: async (to: string, action: string, context: {
        name: string,
        phoneNumber: string,
        comment?: string,
        date?: string
    }) => {
        let text: string;

        if (context?.comment) {
            text = `Зателефонуйте мені за номером: ${context.phoneNumber}, Коментар: ${context.comment}`;
        } else if (context?.date) {
            text = `Зателефонуйте мені за номером: ${context.phoneNumber}, Бажана дата: ${context.date}`;
        }

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject: `Привіт, я ${context.name}`,
            text
        };

        return transporter.sendMail(mailOptions);
    }
};


// import nodemailer, {Transporter} from "nodemailer";
// import hbs from "nodemailer-express-handlebars";
// import * as path from "path";
//
// import {configs} from "../configs/configs";
// import {emailTemplates} from "../constants/email.constants";
// import {EEmailActions} from "../enums/email-actions.enum";
//
// class EmailService {
//     private transporter: Transporter;
//
//     constructor() {
//         this.transporter = nodemailer.createTransport({
//             from: "No reply",
//             service: "gmail",
//             auth: {
//                 user: configs.SMTP_USER,
//                 pass: configs.SMTP_PASS,
//             },
//         });
//
//         const hbsOptions = {
//             viewEngine: {
//                 extname: ".hbs",
//                 defaultLayout: "main",
//                 layoutsDir: path.join(
//                     process.cwd(),
//                     "src",
//                     "email-templates",
//                     "layouts"
//                 ),
//                 partialsDir: path.join(
//                     process.cwd(),
//                     "src",
//                     "email-templates",
//                     "partials"
//                 ),
//             },
//             viewPath: path.join(process.cwd(), "src", "email-templates", "views"),
//             extName: ".hbs",
//         };
//
//         this.transporter.use("compile", hbs(hbsOptions));
//     }
//
//     public async sendMail(
//         email: string,
//         emailAction: EEmailActions,
//         context: Record<string, string | number> = {}
//     ) {
//         const {templateName, subject} = emailTemplates[emailAction];
//         context.frontUrl = configs.FRONT_URL;
//         const mailOptions = {
//             to: email,
//             subject,
//             template: templateName,
//             context,
//         };
//
//         return await this.transporter.sendMail(mailOptions);
//     }
// }
//
// export const emailService = new EmailService();