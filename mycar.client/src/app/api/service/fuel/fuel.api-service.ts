import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FuelModel } from '@api/models';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FuelApiService {
  private apiUrl = 'api/Fuel'; // API address
  constructor(private client: HttpClient) {}

  public getFuels(): Observable<FuelModel[]> {
    const url = `${this.apiUrl}`;
    return this.client.get<FuelModel[]>(url);
  }
}
