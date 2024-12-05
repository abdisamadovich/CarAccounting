import { Fuel } from '@@services/models';
import { Injectable } from '@angular/core';
import { FuelModel } from '@api/models';
import { FuelApiService } from '@api/service';
import { map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FuelService {
  constructor(private fuel: FuelApiService) {}

  public getFuel(): Observable<Fuel[]> {
    return this.fuel.getFuels().pipe(
      map((x) => {
        const result: Fuel[] = [];
        for (let i = 0; i < x.length; i++) {
          const model = this.toClass(x[i]);
          result.push(model);
        }

        return result;
      })
    );
  }
  
  private toClass(source: FuelModel): Fuel {
    const model = new Fuel();
    model.id = source.id ?? 0;
    model.name = source.name;
    return model;
  }
}
