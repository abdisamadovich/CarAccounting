import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RefuellingCreateModel } from '@api/models/refuelling/refuelling.create.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RefuellingApiService {
  private apiUrl = 'api/Refuelling';
  constructor(private client: HttpClient) {}

  public addRefuelling(
    refuellingCreateModel: RefuellingCreateModel
  ): Observable<RefuellingCreateModel> {
    return this.client.post<RefuellingCreateModel>(this.apiUrl, refuellingCreateModel);
  }
}
