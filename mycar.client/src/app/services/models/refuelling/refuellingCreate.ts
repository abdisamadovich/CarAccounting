export class RefuellingCreate {
  public date: Date = new Date();
  public odometer: number = 0;
  public fuelId: number = 0;
  public price: number = 0;
  public totalCost: number = 0;
  public quantity: number = 0;
  public isFilled: boolean = true;
  public station: string = '';
}
