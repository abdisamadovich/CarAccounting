import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RefuellingCreateModel } from '@api/models/refuelling/refuelling.create.model';
import { RefuellingGetAllModel } from '@api/models/refuelling/refuelling.get-all.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RefuellingApiService {
  private apiUrl = 'api/Refuelling';
  constructor(private client: HttpClient) {}

  public addRefuelling(
    refuellingCreateModel: RefuellingCreateModel
  ): Observable<RefuellingCreateModel> {
    return this.client.post<RefuellingCreateModel>(
      this.apiUrl,
      refuellingCreateModel
    );
  }

  public getRefuelling(): Observable<RefuellingGetAllModel[]> {
    const url = `${this.apiUrl}`;
    return this.client.get<RefuellingGetAllModel[]>(url);
  }
}
