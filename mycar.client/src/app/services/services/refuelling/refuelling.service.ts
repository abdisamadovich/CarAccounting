import { RefuellingCreate } from '@@services/models/refuelling/refuellingCreate';
import { Injectable } from '@angular/core';
import { RefuellingApiService } from '@api/service/refuelling/refuelling.api-service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RefuellingService {
  constructor(private refuelling: RefuellingApiService) {}

  public postRefuelling(refuellingCreate: RefuellingCreate): Observable<RefuellingCreate> {
    return this.refuelling.addRefuelling(refuellingCreate);
  }
}
