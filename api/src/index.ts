import * as express from 'express';
import * as bodyParser from 'body-parser';

import { Request, Response } from 'express';
import { Sequelize } from 'sequelize-typescript';

import { Message } from './models/message.model';
import { Chat } from './models/chat.model';
import { User } from './models/user.model';
import { UserInChat } from './models/userInChat.model';

import { UserRouter } from './routers/user.router';
import { ChatRouter } from './routers/chat.router';
import { MessageRouter } from './routers/message.router';

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

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    // tslint:disable-next-line:max-line-length
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    next();
});

app.get('/', (req: Request, res: Response) => {
    res.status(200).json(sequelize.options);
});

app.use('/user', UserRouter);
app.use('/chat', ChatRouter);
app.use('/message', MessageRouter);

const server = app.listen(PORT, () => {
    console.log(`server started at http://localhost:${PORT}`);
});

const io = require('socket.io')(server);

io.on('connection', function(socket: any) {
    console.log("A User has connected to: Socket"+socket.id)
    socket.on('SEND_MESSAGE', function(message: Message) {
        io.emit('MESSAGE', message);
        const messageToSave = new Message({content: message.content, sent: message.sent, read: message.read, chatId: message.chatId, userId: message.userId});
        messageToSave.save();
    });
});
