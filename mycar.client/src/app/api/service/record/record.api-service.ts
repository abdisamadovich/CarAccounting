import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecordGetAllModel } from '@api/models/record/record.get-all.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RecordApiService {
  private apiUrl = `api/Record`;
  constructor(private http: HttpClient) {}

  public getRecords(vehicleId: number, offset: number = 0, limit: number = 10): Observable<RecordGetAllModel[]> {
    const params = new HttpParams().set('offset', offset.toString()).set('limit', limit.toString());
    return this.http.get<RecordGetAllModel[]>(`${this.apiUrl}/${vehicleId}`, { params });
  }
}
