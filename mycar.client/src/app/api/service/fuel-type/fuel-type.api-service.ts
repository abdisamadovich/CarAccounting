import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FuelTypeModel } from '@api/models';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FuelTypeApiService {
  private apiUrl = 'api/FuelType'; // API address
  constructor(private client: HttpClient) {}

  public getFuelTypes(): Observable<FuelTypeModel[]> {
    const url = `${this.apiUrl}`;
    return this.client.get<FuelTypeModel[]>(url);
  }

  public addFuelType(
    expenseType: FuelTypeModel
  ): Observable<FuelTypeModel> {
    return this.client.post<FuelTypeModel>(
      this.apiUrl,
      expenseType
    );
  }
}
