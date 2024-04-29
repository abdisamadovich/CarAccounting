import { Injectable, inject } from '@angular/core';
import { ManufacturerApiService } from '@api/service/manufacturer/manufacturer.api-service';
import { ManufacturerGetAll } from '@@services/models/manufacturer/manufacturer.get-all.view-model';
import { Observable, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ManufacturerService {
  constructor(private manufacturer: ManufacturerApiService) {}

  // GetAll Manufacturer
  public getManufacturers(): Observable<ManufacturerGetAll[]> {
    return this.manufacturer.getManufacturers();
  }
}
