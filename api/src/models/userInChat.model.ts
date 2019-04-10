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
    Unique, 
    HasOne
} from 'sequelize-typescript';

@Table
export class UserInChat extends Model<UserInChat> {
 
  @ForeignKey(() => Chat)
  @Column(DataType.INTEGER)
  chatId: number;
 
  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  userId: number;
}
