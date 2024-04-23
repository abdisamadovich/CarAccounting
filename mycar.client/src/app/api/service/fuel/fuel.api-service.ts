import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FuelGetAllModel } from '@api/models/fuel/fuel-get-all.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FuelApiService {
  private apiUrl = 'api/Fuel'; // API address
  constructor(private client: HttpClient) {}

  public getFuels(): Observable<FuelGetAllModel[]> {
    const url = `${this.apiUrl}`;
    return this.client.get<FuelGetAllModel[]>(url);
  }
}
