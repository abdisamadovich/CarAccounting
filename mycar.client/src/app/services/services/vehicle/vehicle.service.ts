import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, Subject } from 'rxjs';
import { VehicleApiService } from '@api/service';
import { VehicleModel } from '@api/models';
import { Vehicle } from '@@services/models';

@Injectable({ providedIn: 'root' })
export class VehicleService {
  private vehicleDeletedSubject = new Subject<number>();

  constructor(private vehicle: VehicleApiService) {}

  public postVehicle(vehicle: Vehicle): Observable<Vehicle> {
    return this.vehicle
      .addVehicle({
        name:vehicle.name,
        manufacturerId:vehicle.manufacturerId,
        model:vehicle.model,
        fuelTypeId:vehicle.fuelTypeId,
        fuelCapacity:vehicle.fuelCapacity,
        description: vehicle.description,
      })
      .pipe(
        map((x) => {
          const result = this.toClass(x);
          return result;
        })
      );
  }

  public getVehicle(): Observable<Vehicle[]> {
    return this.vehicle.getVehicles().pipe(
      map((x) => {
        const result: Vehicle[] = [];
        for (let i = 0; i < x.length; i++) {
          const model = this.toClass(x[i]);
          result.push(model);
        }

        return result;
      })
    );
  }

  public deleteVehicle(id: number): Observable<void> {
    return this.vehicle.deleteVehicle(id).pipe(
      map(() => {
        this.notifyVehicleDeleted(id);
      })
    );
  }

  public notifyVehicleDeleted(id: number): void {
    this.vehicleDeletedSubject.next(id);
  }

  public getVehicleDeletedNotification(): Observable<number> {
    return this.vehicleDeletedSubject.asObservable();
  }

  private toClass(source: VehicleModel): Vehicle {
    const model = new Vehicle();
    model.id = source.id ?? 0;
    model.name = source.name;
    model.manufacturerId = source.manufacturerId;
    model.model = source.model;
    model.fuelTypeId = source.fuelTypeId;
    model.fuelCapacity = source.fuelCapacity;
    model.description = source.description;
    return model;
  }
}
