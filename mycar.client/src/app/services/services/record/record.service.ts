import { Injectable } from '@angular/core';
import { RecordGetAllModel } from '@api/models/record/record.get-all.model';
import { RecordApiService } from '@api/service/record/record.api-service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RecordService {
  constructor(private record: RecordApiService) {}

  public getRecords(
    vehicleId: number,
    offset: number = 0,
    limit: number = 10
  ): Observable<RecordGetAllModel[]> {
    return this.record.getRecords(vehicleId, offset, limit);
  }
}
