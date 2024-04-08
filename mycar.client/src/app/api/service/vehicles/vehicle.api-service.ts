import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { VehicleCreateModel } from '@api/models/vehicle/vehicle-create.model';
import { VehicleGetAllModel } from '@api/models/vehicle/vehicle-get-all.model';
import { VehicleDeleteModel } from '@api/models/vehicle/vehicle-delete.model';

@Injectable({ providedIn: 'root' })
export class VehicleApiService {
  private apiUrl = 'api/Vehicle';
  constructor(private client: HttpClient) {}

  public addVehicle(vehicleCreateModel: VehicleCreateModel): Observable<any> {
    return this.client.post(this.apiUrl, vehicleCreateModel);
  }

  public getAllVehicles(): Observable<VehicleGetAllModel[]> {
    const url = `${this.apiUrl}`;
    return this.client.get<VehicleGetAllModel[]>(url);
  }

  public deleteVehicle(
    vehicleDeleteModel: VehicleDeleteModel
  ): Observable<any> {
    return this.client.delete(`${this.apiUrl}?id=${vehicleDeleteModel.id}`);
  }
}
