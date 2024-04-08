import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { FuelTypeApiService } from '@api/service/fuelType/fuelType.api-service';
import { FuelTypeGetAll } from '@@services/models/fuelType/fuelTypeGetAll';

@Injectable({ providedIn: 'root' })
export class FuelTypeService {
  constructor(private fuelType: FuelTypeApiService) {}

  // GetAll Manufacturer
  public getFuelTypes(): Observable<FuelTypeGetAll[]> {
    return this.fuelType.getFuelTypes();
  }
}
