import { Record } from '@@services/models';
import { Injectable } from '@angular/core';
import { PaginationResult, RecordModel } from '@api/models';
import { RecordApiService } from '@api/service';
import { map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RecordService {
  constructor(private record: RecordApiService) {}

  public getRecords(
    vehicleId: number,
    offset: number = 0,
    limit: number = 5
  ): Observable<PaginationResult<RecordModel>> {
    return this.record.getRecords(vehicleId, offset, limit).pipe(
      map((x) => {
        const recordModels: RecordModel[] = x.records.map(this.toClass);
        return {
          records: recordModels,
          pagination: x.pagination
        };
      })
    );
  }
  
  private toClass(source: RecordModel): Record {
    const model = new Record();
    model.recordType = source.recordType;
    model.recordId = source.recordId;
    model.date = source.date;
    model.odometer = source.odometer;
    model.description = source.description;
    model.place = source.place;
    model.cost = source.cost;
    model.vehicleId = source.vehicleId;
    return model;
  }
}
