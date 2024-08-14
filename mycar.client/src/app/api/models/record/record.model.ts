import { RecordType } from './record-type';

export interface RecordModel {
  recordType: RecordType;
  recordId: number;
  date: Date;
  odometer: number;
  description: string;
  place: string;
  cost: number;
}
