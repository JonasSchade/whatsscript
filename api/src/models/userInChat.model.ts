import { Chat } from './chat.model';
import { User } from './user.model';
import {
    Column,
    DataType,
    ForeignKey,
    Model,
    Table
} from 'sequelize-typescript';

@Table
export class UserInChat extends Model<UserInChat> {

  @ForeignKey(() => Chat)
  @Column(DataType.INTEGER)
  public chatId: number;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  public userId: number;
}
