import { Chat } from './chat.model';
import { User } from './user.model';
import {
    BelongsTo,
    Column,
    DataType,
    Default,
    DefaultScope,
    ForeignKey,
    Model,
    Table
} from 'sequelize-typescript';

@DefaultScope({
    attributes: { exclude: [ 'password', 'groupId' ] },
    include: [ () => Chat ]
})
@Table
export class Message extends Model<Message> {

    @Column(DataType.TEXT)
    public content: string;

    @Column(DataType.TEXT)
    public sent: string;

    @Default(false)
    @Column(DataType.BOOLEAN)
    public read: boolean;

    @BelongsTo(() => Chat, { onDelete: 'cascade' })
    public chat: Chat;

    @BelongsTo(() => User)
    public user: User;

    @ForeignKey(() => Chat)
    @Column(DataType.INTEGER)
    public chatId: number;

    @ForeignKey(() => User)
    @Column(DataType.INTEGER)
    public userId: number;
}
