import { ServiceType } from '@@services/models';
import { Injectable } from '@angular/core';
import { ServiceTypeModel } from '@api/models';
import { ServiceTypeApiService } from '@api/service';
import { map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ServiceTypeService {
  constructor(private serviceType: ServiceTypeApiService) {}

  public getServiceTypes(): Observable<ServiceType[]> {
    return this.serviceType.getServiceTypes().pipe(
      map((x) => {
        const result: ServiceType[] = [];
        for (let i = 0; i < x.length; i++) {
          const model = this.toClass(x[i]);
          result.push(model);
        }

        return result;
      })
    );
  }

  public postServiceType(expenseType: ServiceType): Observable<ServiceType> {
    return this.serviceType
      .addServiceType({
        name: expenseType.name,
      })
      .pipe(
        map((x) => {
          const result = this.toClass(x);
          return result;
        })
      );
  }

  private toClass(source: ServiceTypeModel): ServiceType {
    const model = new ServiceType();
    model.name = source.name;
    model.id = source.id ?? 0;
    return model;
  }
}
