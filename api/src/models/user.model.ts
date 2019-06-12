import { Chat } from './chat.model';
import { IntegerDataType } from 'sequelize/types';
import { UserInChat } from './userInChat.model';
import {
    AutoIncrement,
    BelongsTo,
    BelongsToMany,
    Column,
    DataType,
    Default,
    DefaultScope,
    ForeignKey,
    Model,
    PrimaryKey,
    Table,
    Unique
} from 'sequelize-typescript';


@Table
export class User extends Model<User> {

    @Unique
    @Column(DataType.TEXT)
    public username: string;

    @Unique
    @Column(DataType.TEXT)
    public email: string;

    @Column(DataType.TEXT)
    public password: string;

    @Column(DataType.TEXT)
    public picture: string;

    @Column(DataType.TEXT)
    public status: string;

    @BelongsToMany(() => Chat, () => UserInChat)
    public chats: Chat[];
}
