import { RecordType } from './record-type';

export interface RecordModel {
  recordType: RecordType;
  recordId: number;
  date: string;
  odometer: number;
  description: string;
  place: string;
  cost: number;
}
