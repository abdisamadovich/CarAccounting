import { Vehicle } from '@@services/models';
import { RecordType } from './record-type';

export interface RecordModel {
  vehicleId: number
  recordType: RecordType;
  recordId: number;
  date: Date;
  odometer: number;
  description: string;
  place: string;
  cost: number;
}
