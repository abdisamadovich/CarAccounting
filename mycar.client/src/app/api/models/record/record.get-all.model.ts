import { RecordTypeGetAllModel } from './record-type';

export interface RecordGetAllModel {
  recordType: RecordTypeGetAllModel;
  recordId: number;
  date: string;
  odometer: number;
  description: string;
  place: string;
  cost: number;
}
