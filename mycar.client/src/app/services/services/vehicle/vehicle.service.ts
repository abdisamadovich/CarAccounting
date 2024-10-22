import { Injectable, inject, model } from '@angular/core';
import { map, Observable } from 'rxjs';
import { VehicleApiService } from '@api/service';
import { VehicleModel } from '@api/models';
import { Vehicle } from '@@services/models';

@Injectable({ providedIn: 'root' })
export class VehicleService {
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
    return this.vehicle.deleteVehicle(id);
  }

  private toClass(source: VehicleModel): Vehicle {
    const model = new Vehicle();
    model.id = source.id ?? 0;
    model.name = source.name;
    model.manufacturerId = source.manufacturerId;
    model.manufacturerName = source.manufacturer?.name || "";
    model.model = source.model;
    model.fuelTypeId = source.fuelTypeId;
    model.fuelTypeName = source.fuelType?.name || "";
    model.fuelCapacity = source.fuelCapacity;
    model.description = source.description;
    return model;
  }
}
