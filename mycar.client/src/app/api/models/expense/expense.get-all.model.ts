export interface ExpenseGetAllModel {
  id: number;
  vehicleId: number;
  date: Date;
  odometer: number;
  expenseTypeId: number;
  place: string;
  description: string;
  value: number;
}
