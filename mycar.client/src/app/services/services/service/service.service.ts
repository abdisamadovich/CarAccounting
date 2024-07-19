import { ServiceCreate } from '@@services/models/service/service-create.view-model';
import { ServiceGetAll } from '@@services/models/service/service.get-all.view-model';
import { Injectable } from '@angular/core';
import { ServiceApiService } from '@api/service/service/service.api-service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ServiceService {
  constructor(private service: ServiceApiService) {}

  public postService(
    serviceCreate: ServiceCreate
  ): Observable<ServiceCreate> {
    return this.service.addService(serviceCreate);
  }

  public getServices(): Observable<ServiceGetAll[]> {
    return this.service.getServices();
  }
}
