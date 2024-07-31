import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RefuellingModel } from '@api/models';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RefuellingApiService {
  private apiUrl = 'api/Refuelling';
  constructor(private client: HttpClient) {}

  public addRefuelling(
    refuelling: RefuellingModel
  ): Observable<RefuellingModel> {
    return this.client.post<RefuellingModel>(
      this.apiUrl,
      refuelling
    );
  }

  public getRefuelling(): Observable<RefuellingModel[]> {
    const url = `${this.apiUrl}`;
    return this.client.get<RefuellingModel[]>(url);
  }
}
