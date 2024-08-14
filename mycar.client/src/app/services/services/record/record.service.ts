import { Record } from '@@services/models';
import { Injectable } from '@angular/core';
import { RecordModel } from '@api/models';
import { RecordApiService } from '@api/service';
import { map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RecordService {
  constructor(private record: RecordApiService) {}

  public getRecords(
    vehicleId: number,
  ): Observable<Record[]> {
    return this.record.getRecords(vehicleId).pipe(
      map((x) => {
        const result: Record[] = [];
        for (let i = 0; i < x.length; i++) {
          const model = this.toClass(x[i]);
          result.push(model);
        }

        return result;
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
    return model;
  }
}
