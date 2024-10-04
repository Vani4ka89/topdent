import express, {Request, Response} from 'express';
import {configs} from "./configs/configs";
import cors from 'cors';
import {emailService} from "./services/email.service";
import {EEmailActions} from "./enums/email-actions.enum";
import {FirstFormType} from "./types/first-form.type";
import {email} from "./constants/emails";
import {SecondFormType} from "./types/second-form.type";
import {ApiError} from "./errors/api.error";
import * as path from "node:path";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({origin: true}))

const PORT = configs.PORT;

app.use(express.static('public_html'));

app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.resolve(__dirname, 'public_html', 'index.html'));
});

app.post('/users/first_form', async (req: Request, res: Response): Promise<void> => {
    const {name, phoneNumber, comment} = req.body as FirstFormType;
    const commentField = comment ? comment : 'немає';
    try {
        await emailService.sendMail(email, EEmailActions.WELCOME, {
            name,
            phoneNumber,
            comment: commentField
        });
        res.json({message: 'Дякую! Ми Вам перетелефонуємо.'});
    } catch (e) {
        throw new ApiError('Error sending message!', 400);
    }
});

app.post('/users/second_form', async (req: Request, res: Response): Promise<void> => {
    const {name, phoneNumber, date} = req.body as SecondFormType;
    try {
        await emailService.sendMail(email, EEmailActions.WELCOME, {name, phoneNumber, date});
        res.json({message: 'Дякую! Ми Вам перетелефонуємо.'});
    } catch (e) {
        throw new ApiError('Error sending message!', 400);
    }
});

app.use("*", (err: ApiError, req: Request, res: Response) => {
    const status = err.status || 500;
    res.json({
        message: err.message,
        status: status,
    });
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});