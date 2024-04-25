import { ServiceTypeCreate } from '@@services/models/serviceType/serviceTypeCreate';
import { ServiceTypeGetAll } from '@@services/models/serviceType/serviceTypeGetAll';
import { Injectable } from '@angular/core';
import { ServiceTypeApiService } from '@api/service/serviceType/serviceType.api-service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ServiceTypeService {
  constructor(private serviceType: ServiceTypeApiService) {}

  // GetAll ServiceTypes
  public getServiceTypes(): Observable<ServiceTypeGetAll[]> {
    return this.serviceType.getServiceTypes();
  }

  public postServiceType(
    serviceTypeCreate: ServiceTypeCreate
  ): Observable<ServiceTypeCreate> {
    return this.serviceType.addServiceType(serviceTypeCreate);
  }
}
