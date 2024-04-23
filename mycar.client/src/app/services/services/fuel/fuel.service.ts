import { FuelGetAll } from '@@services/models/fuel/fuelGetAll';
import { Injectable } from '@angular/core';
import { FuelApiService } from '@api/service/fuel/fuel.api-service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FuelService {
  constructor(private fuel: FuelApiService) {}

  // GetAll Fuels
  public getFuels(): Observable<FuelGetAll[]> {
    return this.fuel.getFuels();
  }
}
