import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';

import Invoice from './invoiceModel.js';
import Item from './itemModel.js';

@Table({ tableName: 'invoice_items', timestamps: false })
export class InvoiceItem extends Model {
  @ForeignKey(() => Invoice)
  @Column({ field: 'invoice_id', type: DataType.UUID })
  declare invoiceId: string;

  @ForeignKey(() => Item)
  @Column({ field: 'item_id', type: DataType.UUID })
  declare itemId: string;

  @Column({ field: 'quantity', type: DataType.INTEGER })
  declare quantity: number;

  toJSON() {
    const res = super.toJSON();
    delete res.invoiceId;
    delete res.itemId;
    return res;
  }
}
