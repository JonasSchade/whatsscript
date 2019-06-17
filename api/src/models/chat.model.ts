import { User } from './user.model';
import { Message } from './message.model';
import { UserInChat } from './userInChat.model';
import { BelongsToMany, HasMany, Table, Column, Model, DataType, DefaultScope } from 'sequelize-typescript';

@DefaultScope({
    include: [ { model: () => Message,  order: [['id', 'DESC']], limit: 1, include: { model: () => User } } ]
}) // gib letzte Nachricht zum Chat aus
@Table
export class Chat extends Model<Chat> {

    @Column(DataType.TEXT)
    public chatname: string;

    @Column(DataType.TEXT)
    public picture: string;

    @BelongsToMany(() => User, () => UserInChat)
    public users: User[];

    @HasMany(() => Message, { foreignKey: 'chatId' })
    private messages: Message[];
}
