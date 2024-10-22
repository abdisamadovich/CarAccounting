export interface VehicleModel {
  id?: number | null;
  name: string;
  manufacturerId: number;
  manufacturer?: {
    id: number;
    name: string;
  };
  model: string;
  fuelTypeId: number;
  fuelType?: {
    id: number;
    name: string;
  };
  fuelCapacity: number;
  description: string;
}
