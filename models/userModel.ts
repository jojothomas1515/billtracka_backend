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

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  @CreatedAt
  declare createdAt: Date;
}

export default User;
