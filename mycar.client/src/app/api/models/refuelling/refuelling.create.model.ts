export interface RefuellingCreateModel {
  date: Date;
  odometer: number;
  fuelId: number;
  price: number;
  totalCost: number;
  quantity: number;
  isFilled: boolean;
  station: string;
}
