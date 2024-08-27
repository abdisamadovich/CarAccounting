import { Refuelling } from '@@services/models';
import { Injectable } from '@angular/core';
import { RefuellingModel } from '@api/models';
import { RefuellingApiService } from '@api/service';
import { map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RefuellingService {
  constructor(private refuelling: RefuellingApiService) {}

  public postRefuelling(refuelling: Refuelling): Observable<Refuelling> {
    return this.refuelling
      .addRefuelling({
        vehicleId: refuelling.vehicleId,
        date: refuelling.date,
        odometer: refuelling.odometer,
        fuelId: refuelling.fuelId,
        price: refuelling.price,
        totalCost: refuelling.totalCost,
        quantity: refuelling.quantity,
        isFilled: refuelling.isFilled,
        station: refuelling.station,
      })
      .pipe(
        map((x) => {
          const result = this.toClass(x);
          return result;
        })
      );
  }

  public getExpense(): Observable<Refuelling[]> {
    return this.refuelling.getRefuelling().pipe(
      map((x) => {
        const result: Refuelling[] = [];
        for (let i = 0; i < x.length; i++) {
          const model = this.toClass(x[i]);
          result.push(model);
        }

        return result;
      })
    );
  }

  public deleteRefuelling(id: number): Observable<void> {
    return this.refuelling.deleteRefuelling(id);
  }

  private toClass(source: RefuellingModel): Refuelling {
    const model = new Refuelling();
    model.date = source.date;
    model.fuelId = source.fuelId;
    model.price = source.price;
    model.totalCost = source.price;
    model.quantity = source.quantity;
    model.isFilled = source.isFilled;
    model.station = source.station;
    model.id = source.id || null;
    model.odometer = source.odometer;
    model.vehicleId = source.vehicleId;
    return model;
  }
}
