import {config} from "dotenv";
import * as process from "node:process";

config({path: ".env"});

export const configs = {
    PORT: process.env.PORT,
    FRONT_URL: process.env.FRONT_URL,
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASS: process.env.SMTP_PASS,
};