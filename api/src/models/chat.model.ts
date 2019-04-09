import { User } from './user.model';
import { Message } from './message.model';
import { BelongsToMany, Table, Column, Model, HasMany, DataType, AutoIncrement, PrimaryKey, Unique } from 'sequelize-typescript';


@Table
export class Chat extends Model<Chat> {
    @Unique
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    public id: number;

    @Column(DataType.TEXT)
    public chatname: string;

    @Column(DataType.BLOB)
    public picture: string;

    @BelongsToMany(() => User, {through: 'UserInChat'})
    public users: User[];
}
