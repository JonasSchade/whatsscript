import { Chat } from './chat.model';
import { User } from './user.model';
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

@DefaultScope({
    attributes: { exclude: [ 'password', 'groupId' ] },
    include: [ () => Chat ]
})
@Table
export class Message extends Model<Message> {
    @Unique
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    public id: number;
   
    @Unique
    @Column(DataType.TEXT)
    public content: string;
    
    @Column(DataType.TEXT)
    public sent: string;

    @Default(false)
    @Column(DataType.BOOLEAN)
    public read: boolean;

    @BelongsTo(() => Chat)
    public chat: Chat;

    @BelongsTo(() => User)
    public user: User;
}
