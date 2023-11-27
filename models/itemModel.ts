import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  BelongsToMany,
} from 'sequelize-typescript';

import Invoice from './invoiceModel.js';
import User from './userModel.js';
import { InvoiceItem } from './relationshipModels.js';

@Table({ tableName: 'items', timestamps: false })
class Item extends Model {
  @Column({
    defaultValue: DataType.UUIDV4,
    type: DataType.UUID,
    primaryKey: true,
  })
  declare id: string;

  @Column({ field: 'item_name', type: DataType.STRING })
  declare itemName: string;

  @Column({ field: 'unit_price', type: DataType.FLOAT })
  declare unitPrice: number;

  @Column({ field: 'quantity', type: DataType.INTEGER })
  declare quantity: number;

  @Column({ field: 'discount', type: DataType.FLOAT })
  declare discount: number;

  @ForeignKey(() => User)
  @Column({ field: 'user_id', type: DataType.UUID })
  declare userId: string;

  @BelongsTo(() => User)
  declare user: User;

  @BelongsToMany(() => Invoice, () => InvoiceItem)
  declare invoices: Invoice[];
}

export default Item;
