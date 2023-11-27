import {
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

import User from './userModel.js';

@Table({ tableName: 'tasks', timestamps: false })
class Task extends Model {
  @Column({
    defaultValue: DataType.UUIDV4,
    type: DataType.UUID,
    primaryKey: true,
  })
  declare id: string;

  @Column({ field: 'task_title', type: DataType.STRING })
  declare taskTitle: string;

  @Column({ field: 'task_description', type: DataType.STRING })
  declare taskDescription: string;

  @Column({ field: 'start_date', type: DataType.DATE })
  declare startDate: Date;

  @Column({ field: 'end_date', type: DataType.DATE })
  declare endDate: Date;

  @Column({ field: 'completed', type: DataType.BOOLEAN })
  declare completed: boolean;

  @ForeignKey(() => User)
  @Column({ field: 'user_id', type: DataType.UUID })
  declare userId: string;

  @CreatedAt
  declare createdAt: Date;
}

export default Task;
