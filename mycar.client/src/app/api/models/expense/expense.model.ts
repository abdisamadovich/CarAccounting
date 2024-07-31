export interface ExpenseModel {
  id?: number;
  vehicleId: number;
  date: Date;
  odometer: number;
  expenseTypeId: number;
  place: string;
  description: string;
  cost: number;
}
