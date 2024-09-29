import express, {Request, Response} from 'express';
import {configs} from "./configs/configs";
import cors from 'cors';
import {emailService} from "./services/email.service";
import {EEmailActions} from "./enums/email-actions.enum";
import {FirstFormType} from "./types/first-form.type";
import {email} from "./constants/emails";
import {SecondFormType} from "./types/second-form.type";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({origin: true}))

const PORT = configs.PORT;

app.post('/users/first_form', async (req: Request, res: Response): Promise<void> => {
    const {name, phoneNumber, comment} = req.body as FirstFormType;
    const commentField = comment ? comment : 'немає';
    try {
        await emailService.sendMail(email, EEmailActions.WELCOME, {
            name,
            phoneNumber,
            comment: commentField
        });
        res.send('Дякую! Ми вам зателефонуємо.');
    } catch (e) {
        console.log(e);
    }
});

app.post('/users/second_form', async (req: Request, res: Response): Promise<void> => {
    const {name, phoneNumber, date} = req.body as SecondFormType;
    try {
        await emailService.sendMail(email, EEmailActions.WELCOME, {name, phoneNumber, date});
        res.send('Дякую! Ми вам зателефонуємо.');
    } catch (e) {
        console.log(e);
    }
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});