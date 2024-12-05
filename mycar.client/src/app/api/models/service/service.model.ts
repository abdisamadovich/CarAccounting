export interface ServiceModel {
  id?: number;
  vehicleId: number;
  date: Date;
  odometer: number;
  serviceTypeId: number;
  place: string;
  price: number;
  notes: string;
}
