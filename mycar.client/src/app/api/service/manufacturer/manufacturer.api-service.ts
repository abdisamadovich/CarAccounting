import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ManufacturerModel } from '@api/models';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ManufacturerApiService {
  private apiUrl = 'api/Manufacturer'; // API address
  constructor(private client: HttpClient) {}

  public getManufacturers(): Observable<ManufacturerModel[]> {
    const url = `${this.apiUrl}`;
    return this.client.get<ManufacturerModel[]>(url);
  }
}
