import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  HasMany,
} from 'sequelize-typescript';
import Task from './taskModel.js';

@Table({ tableName: 'users', createdAt: 'created_at', updatedAt: false })
class User extends Model {
  @Column({
    defaultValue: DataType.UUIDV4,
    type: DataType.UUID,
    primaryKey: true,
  })
  declare id: string;

  @Column({ field: 'first_name', type: DataType.STRING })
  declare firstName: string;

  @Column({ field: 'last_name', type: DataType.STRING })
  declare lastName: string;

  @Column(DataType.STRING)
  declare email: string;

  @Column(DataType.STRING)
  declare phone: string;

  @Column({ type: DataType.STRING, field: 'hashed_password' })
  declare hashedPassword: string;

  @Column({ type: DataType.STRING, field: 'refresh_token' })
  declare refreshToken: string;

  @Column({ type: DataType.STRING, field: 'google_id' })
  declare googleId: string;
  @Column({ type: DataType.STRING, field: 'github_id' })
  declare githubId: string;
  @Column({ type: DataType.BOOLEAN, field: 'is_verified' })
  declare isVerified: boolean;

  @Column({ type: DataType.STRING, field: 'verification_token' })
  declare verificationToken: string | null;

  @Column({ type: DataType.STRING, field: 'business_name' })
  declare businessName: string | null;

  @HasMany(() => Task, 'userId')
  declare tasks: Task[];

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  @CreatedAt
  declare createdAt: Date;

  toJSON() {
    const data = super.toJSON();
    delete data.hashedPassword;
    delete data.refreshToken;
    delete data.googleId;
    delete data.githubId;
    return data;
  }
}

export default User;
