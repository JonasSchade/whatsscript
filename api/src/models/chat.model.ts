import { User } from './user.model';
import { Message } from './message.model';
import { UserInChat } from './userInChat.model';
import { BelongsToMany, Table, Column, Model, HasMany, DataType, AutoIncrement, PrimaryKey, Unique } from 'sequelize-typescript';


@Table
export class Chat extends Model<Chat> {

    @Column(DataType.TEXT)
    public chatname: string;

    @Column(DataType.BLOB)
    public picture: string;

    @BelongsToMany(() => User, () => UserInChat)
    public users: User[];
}
