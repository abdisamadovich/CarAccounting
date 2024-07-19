export interface RefuellingGetAllModel {
  id: number;
  vehicleId: number;
  date: Date;
  odometer: number;
  fuelId: number;
  price: number;
  totalCost: number;
  quantity: number;
  isFilled: boolean;
  station: string;
}
