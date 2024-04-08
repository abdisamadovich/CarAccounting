import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { VehicleApiService } from '@api/service/vehicles/vehicle.api-service';
import { VehicleGetAll } from '@@services/models/vehicle/vehicleGet';
import { VehicleDelete } from '@@services/models/vehicle/vehicleDelete';
import { VehicleCreate } from '@@services/models/vehicle/vehicleCreate';

@Injectable({ providedIn: 'root' })
export class VehicleService {
  constructor(private vehicle: VehicleApiService) {}

  public postVehicle(vehicleCreate: VehicleCreate): Observable<any> {
    return this.vehicle.addVehicle(vehicleCreate);
  }
  public getVehicle(): Observable<VehicleGetAll[]> {
    return this.vehicle.getAllVehicles();
  }
  public deleteVehicle(vehicleDelete: VehicleDelete): Observable<any> {
    return this.vehicle.deleteVehicle(vehicleDelete);
  }
}
