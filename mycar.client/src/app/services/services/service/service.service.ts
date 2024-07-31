import { Service } from '@@services/models';
import { Injectable } from '@angular/core';
import { ServiceModel } from '@api/models';
import { ServiceApiService } from '@api/service';
import { map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ServiceService {
  constructor(private service: ServiceApiService) {}

  public getService(): Observable<Service[]> {
    return this.service.getServices().pipe(
      map((x) => {
        const result: Service[] = [];
        for (let i = 0; i < x.length; i++) {
          const model = this.toClass(x[i]);
          result.push(model);
        }

        return result;
      })
    );
  }

  public postService(service: Service): Observable<Service> {
    return this.service
      .addService({
        vehicleId: service.vehicleId,
        date: service.date,
        odometer: service.odometer,
        serviceTypeId: service.serviceTypeId,
        place: service.place,
        price: service.price,
        notes: service.notes,
      })
      .pipe(
        map((x) => {
          const result = this.toClass(x);
          return result;
        })
      );
  }

  private toClass(source: ServiceModel): Service {
    const model = new Service();
    model.id = source.id || null;
    model.vehicleId = source.vehicleId;
    model.date = source.date;
    model.odometer = source.odometer;
    model.serviceTypeId = source.serviceTypeId;
    model.place = source.place;
    model.price = source.price;
    model.notes = source.notes;
    return model;
  }
}
