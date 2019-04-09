import { Chat } from './chat.model';
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
import { IntegerDataType } from 'sequelize/types';


@Table
export class User extends Model<User> {
    @Unique
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    public id: number;
    
    @Unique
    @Column(DataType.TEXT)
    public username: string;

    @Unique
    @Column(DataType.TEXT)
    public email: string;

    @Column(DataType.TEXT)
    public password: string;

    @Column(DataType.BLOB)
    public picture: string;

    @Column(DataType.TEXT)
    public status: string;

    @BelongsToMany(() => Chat, {through: 'UserInChat'})
    public chats: Chat[];
}
