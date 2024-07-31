export class Expense {
  public id: number | null = null;
  public vehicleId: number = 0;
  public date: Date = new Date();
  public odometer: number = 0;
  public expenseTypeId: number = 0;
  public place: string = '';
  public description: string = '';
  public cost: number = 0;
}
