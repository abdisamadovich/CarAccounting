import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { ManufacturerGetAllModel } from '@api/models/manufacturer/manufacturer-get-all.model';

@Injectable({ providedIn: 'root' })
export class ManufacturerApiService {
  private apiUrl = 'api/Manufacturer'; // API address
  constructor(private client: HttpClient) {}

  public getManufacturers(): Observable<ManufacturerGetAllModel[]> {
    const url = `${this.apiUrl}`;
    return this.client.get<ManufacturerGetAllModel[]>(url);
  }
}
