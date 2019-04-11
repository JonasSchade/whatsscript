import * as express from 'express';
import * as bodyParser from 'body-parser';

import { Request, Response } from 'express';
import { Sequelize } from 'sequelize-typescript';

import { Message } from './models/message.model';
import { Chat } from './models/chat.model';
import { User } from './models/user.model';
import { UserInChat } from './models/userInChat.model';

import { UserRouter } from './routers/user.router';

const sequelize =  new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite'
});

sequelize.addModels([ UserInChat, User, Chat, Message ]);
sequelize.sync({ force: true });

const app = express();


const bp = bodyParser.json();
app.use(bp);

// make port settable via environment variable
// default port = 3000
const {
    PORT = 3000
} = process.env;

app.get('/', (req: Request, res: Response) => {
    res.status(200).json(sequelize.options);
});

app.use('/user', UserRouter);

app.listen(PORT, () => {
    console.log(`server started at http://localhost:${PORT}`);
});
