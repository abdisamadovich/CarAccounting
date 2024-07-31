import { Injectable } from '@angular/core';
import { RecordModel } from '@api/models';
import { RecordApiService } from '@api/service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RecordService {
  constructor(private record: RecordApiService) {}

  public getRecords(
    vehicleId: number,
    offset: number = 0,
    limit: number = 10
  ): Observable<RecordModel[]> {
    return this.record.getRecords(vehicleId, offset, limit);
  }
}
