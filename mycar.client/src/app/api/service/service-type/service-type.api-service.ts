import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceTypeCreateModel } from '@api/models/service-type/service-type.create.model';
import { ServiceTypeGetAllModel } from '@api/models/service-type/service-type.get-all.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ServiceTypeApiService {
  private apiUrl = 'api/ServiceType'; // API address
  constructor(private client: HttpClient) {}

  public getServiceTypes(): Observable<ServiceTypeGetAllModel[]> {
    const url = `${this.apiUrl}`;
    return this.client.get<ServiceTypeGetAllModel[]>(url);
  }

  public addServiceType(
    serviceTypeCreateModel: ServiceTypeCreateModel
  ): Observable<ServiceTypeCreateModel> {
    return this.client.post<ServiceTypeCreateModel>(
      this.apiUrl,
      serviceTypeCreateModel
    );
  }
}
