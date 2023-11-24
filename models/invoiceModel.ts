import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
} from 'sequelize-typescript';

@Table({ tableName: 'invoices', createdAt: 'created_at', updatedAt: false })
class Invoice extends Model {
  @Column({
    defaultValue: DataType.UUIDV4,
    type: DataType.UUID,
    primaryKey: true,
  })
  declare id: string;

  @Column({ field: 'invoice_number', type: DataType.STRING })
  declare invoiceNumber: string;

  @Column({ field: 'issue_date', type: DataType.DATE })
  declare issueDate: Date;

  @Column({ field: 'due_date', type: DataType.DATE })
  declare dueDate: Date;

  @Column({ field: 'notes', type: DataType.STRING })
  declare notes: string;

  @Column({ field: 'payment_mode', type: DataType.ENUM('CASH', 'CARD') })
  declare paymentMode: string;

  @Column({ field: 'client_name', type: DataType.STRING })
  declare clientName: string;

  @Column({ field: 'client_email', type: DataType.STRING })
  declare clientEmail: string;

  @Column({ field: 'client_phone', type: DataType.STRING })
  declare clientPhone: string;

  @Column({ field: 'client_address', type: DataType.STRING })
  declare clientAddress: string;

  @Column({ field: 'client_state', type: DataType.STRING })
  declare clientState: string;

  @Column({ field: 'client_city', type: DataType.STRING })
  declare clientCity: string;

  @Column({ field: 'client_country', type: DataType.STRING })
  declare clientCountry: string;

  @Column({ field: 'client_lga', type: DataType.STRING })
  declare clientLga: string;

  @Column({ field: 'status', type: DataType.STRING })
  declare status: string;
  //
  // @Column({ field: 'sender_address', type: DataType.STRING })
  // declare senderAddress: string;
  //
  // @Column({ field: 'client_address', type: DataType.STRING })
  // declare clientAddress: string;

  @Column({ field: 'items', type: DataType.JSON })
  declare items: string;

  @Column({ field: 'total', type: DataType.FLOAT })
  declare total: number;

  @Column({ field: 'discount', type: DataType.FLOAT })
  declare discount: number;

  @Column({ field: 'amount_paid', type: DataType.FLOAT })
  declare amountPaid: number;

  @Column({ field: 'amount_due', type: DataType.FLOAT })
  declare amountDue: number;

  @Column({ field: 'owner_id', type: DataType.UUID })
  declare ownerId: string;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  @CreatedAt
  declare createdAt: Date;

  toJSON() {
    const data = super.toJSON();
    return data;
  }
}

export default Invoice;
