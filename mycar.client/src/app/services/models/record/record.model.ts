import { RecordType } from '@api/models';

export class Record {
  public recordType: RecordType = RecordType.Expense;
  public recordId: number = 0;
  public date: Date = new Date();
  public odometer: number = 0;
  public description: string = '';
  public place: string = '';
  public cost: number = 0;
}
