import { Manufacturer } from '@@services/models';
import { Injectable } from '@angular/core';
import { ManufacturerModel } from '@api/models';
import { ManufacturerApiService } from '@api/service';
import { Observable, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ManufacturerService {
  constructor(private manufacturer: ManufacturerApiService) {}

  public getManufacturers(): Observable<Manufacturer[]> {
    return this.manufacturer.getManufacturers().pipe(
      map((x) => {
        const result: Manufacturer[] = [];
        for (let i = 0; i < x.length; i++) {
          const model = this.toClass(x[i]);
          result.push(model);
        }

        return result;
      })
    );
  }

  private toClass(source: ManufacturerModel): Manufacturer {
    const model = new Manufacturer();
    model.name = source.name;
    model.id = source.id ?? 0;
    return model;
  }
}
