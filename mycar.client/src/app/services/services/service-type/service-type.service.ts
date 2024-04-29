import { ServiceTypeCreate } from '@@services/models/service-type/service-type.create.view-model';
import { ServiceTypeGetAll } from '@@services/models/service-type/service-type.get-all.view-model';
import { Injectable } from '@angular/core';
import { ServiceTypeApiService } from '@api/service/service-type/service-type.api-service';
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
