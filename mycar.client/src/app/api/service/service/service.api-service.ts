import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceModel } from '@api/models';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ServiceApiService {
  private apiUrl = 'api/Service';
  constructor(private client: HttpClient) {}

  public addService(service: ServiceModel): Observable<ServiceModel> {
    return this.client.post<ServiceModel>(this.apiUrl, service);
  }

  public getServices(): Observable<ServiceModel[]> {
    const url = `${this.apiUrl}`;
    return this.client.get<ServiceModel[]>(url);
  }

  public deleteService(id: number): Observable<void> {
    const url = `${this.apiUrl}?id=${id}`;
    return this.client.delete<void>(url);
  }
}
