import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { FuelTypeGetAllModel } from '@api/models/fuelType/fuelType-get-all.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FuelTypeApiService {
  private apiUrl = 'api/FuelType'; // API address
  constructor(private client: HttpClient) {}

  public getFuelTypes(): Observable<FuelTypeGetAllModel[]> {
    const url = `${this.apiUrl}`;
    return this.client.get<FuelTypeGetAllModel[]>(url);
  }
}
