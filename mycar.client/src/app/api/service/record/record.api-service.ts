import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaginationResult, RecordModel } from '@api/models';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RecordApiService {
  private apiUrl = `api/Record`;
  constructor(private http: HttpClient) {}

  public getRecords(vehicleId: number, offset: number = 0, limit: number = 5): Observable<PaginationResult<RecordModel>> {
    const params = new HttpParams().set('offset', offset.toString()).set('limit', limit.toString());
    return this.http.get<PaginationResult<RecordModel>>(`${this.apiUrl}/${vehicleId}`, { params });
  }
}
