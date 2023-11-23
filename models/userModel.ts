import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
} from 'sequelize-typescript';

@Table({ tableName: 'users', createdAt: 'created_at', updatedAt: false })
class User extends Model {
  @Column({
    defaultValue: DataType.UUIDV4,
    type: DataType.UUID,
    primaryKey: true,
  })
  id!: string;

  @Column({ field: 'first_name', type: DataType.STRING })
  firstName!: string;

  @Column({ field: 'last_name', type: DataType.STRING })
  lastName!: string;

  @Column(DataType.STRING)
  email!: string;

  @Column(DataType.STRING)
  phone!: string;

  @Column({ type: DataType.STRING, field: 'hashed_password' })
  hashedPassword!: string;

  @Column({ type: DataType.STRING, field: 'refresh_token' })
  refreshToken!: string;

  @Column({ type: DataType.STRING, field: 'google_id' })
  googleId!: string;
  @Column({ type: DataType.STRING, field: 'github_id' })
  githubId!: string;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  @CreatedAt
  createdAt!: Date;
}

export default User;
