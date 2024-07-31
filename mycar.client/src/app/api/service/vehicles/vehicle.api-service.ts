import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { VehicleModel } from '@api/models';

@Injectable({ providedIn: 'root' })
export class VehicleApiService {
  private apiUrl = 'api/Vehicle';
  constructor(private client: HttpClient) {}

  public addVehicle(vehicle: VehicleModel): Observable<VehicleModel> {
    return this.client.post<VehicleModel>(this.apiUrl, vehicle);
  }

  public getVehicles(): Observable<VehicleModel[]> {
    const url = `${this.apiUrl}`;
    return this.client.get<VehicleModel[]>(url);
  }
}
