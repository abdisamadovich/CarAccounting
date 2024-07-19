import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceCreateModel } from '@api/models/service/service.create.model';
import { ServiceGetAllModel } from '@api/models/service/service.get-all.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ServiceApiService {
  private apiUrl = 'api/Service';
  constructor(private client: HttpClient) {}

  public addService(
    serviceCreateModel: ServiceCreateModel
  ): Observable<ServiceCreateModel> {
    return this.client.post<ServiceCreateModel>(
      this.apiUrl,
      serviceCreateModel
    );
  }

  public getServices(): Observable<ServiceGetAllModel[]> {
    const url = `${this.apiUrl}`;
    return this.client.get<ServiceGetAllModel[]>(url);
  }
}
