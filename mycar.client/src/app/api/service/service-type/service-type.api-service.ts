import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceTypeModel } from '@api/models';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ServiceTypeApiService {
  private apiUrl = 'api/ServiceType'; // API address
  constructor(private client: HttpClient) {}

  public getServiceTypes(): Observable<ServiceTypeModel[]> {
    const url = `${this.apiUrl}`;
    return this.client.get<ServiceTypeModel[]>(url);
  }

  public addServiceType(
    serviceType: ServiceTypeModel
  ): Observable<ServiceTypeModel> {
    return this.client.post<ServiceTypeModel>(this.apiUrl, serviceType);
  }
}
