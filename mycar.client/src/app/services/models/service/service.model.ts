export class Service {
  public id: number | null = null;
  public vehicleId: number = 0;
  public date: Date = new Date();
  public odometer: number = 0;
  public serviceTypeId: number = 0;
  public place: string = '';
  public price: number = 0;
  public notes: string = '';
}
