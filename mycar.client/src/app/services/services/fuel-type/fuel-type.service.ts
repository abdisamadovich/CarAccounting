import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { FuelTypeApiService } from '@api/service/fuel-type/fuel-type.api-service';
import { FuelTypeGetAll } from '@@services/models/fuel-type/fuel-type.get-all.view-model';

@Injectable({ providedIn: 'root' })
export class FuelTypeService {
  constructor(private fuelType: FuelTypeApiService) {}

  // GetAll FuelTypes
  public getFuelTypes(): Observable<FuelTypeGetAll[]> {
    return this.fuelType.getFuelTypes();
  }
}
