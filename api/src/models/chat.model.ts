import { User } from './user.model';
import { Message } from './message.model';
import { UserInChat } from './userInChat.model';
import { BelongsToMany, Table, Column, Model, HasMany, DataType, AutoIncrement, PrimaryKey, Unique, DefaultScope } from 'sequelize-typescript';

@DefaultScope({
    include: [ { model: () => Message, order: ['date','DESC'], limit: 1 } ]
}) //gib letzte Nachricht zum Chat aus 
@Table
export class Chat extends Model<Chat> {

    @Column(DataType.TEXT)
    public chatname: string;

    @Column(DataType.BLOB)
    public picture: string;

    @BelongsToMany(() => User, () => UserInChat)
    public users: User[];
}
