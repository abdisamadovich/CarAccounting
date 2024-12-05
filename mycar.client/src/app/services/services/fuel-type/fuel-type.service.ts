import { map, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { FuelTypeApiService } from '@api/service';
import { FuelType } from '@@services/models';
import { FuelTypeModel } from '@api/models';

@Injectable({ providedIn: 'root' })
export class FuelTypeService {
  constructor(private fuelType: FuelTypeApiService) {}

  public getFuelTypes(): Observable<FuelType[]> {
    return this.fuelType.getFuelTypes().pipe(
      map((x) => {
        const result: FuelType[] = [];
        for (let i = 0; i < x.length; i++) {
          const model = this.toClass(x[i]);
          result.push(model);
        }

        return result;
      })
    );
  }

  private toClass(source: FuelTypeModel): FuelType {
    const model = new FuelType();
    model.name = source.name;
    model.id = source.id ?? 0;
    return model;
  }
}
