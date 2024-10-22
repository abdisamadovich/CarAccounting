import { ExpenseType } from '@@services/models';
import { Injectable } from '@angular/core';
import { ExpenseTypeModel } from '@api/models';
import { ExpenseTypeApiService } from '@api/service';
import { map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ExpenseTypeService {
  constructor(private expenseType: ExpenseTypeApiService) {}

  public postExpenseType(expenseType: ExpenseType): Observable<ExpenseType> {
    return this.expenseType
      .addExpenseType({
        name: expenseType.name,
      })
      .pipe(
        map((x) => {
          const result = this.toClass(x);
          return result;
        })
      );
  }

  public getExpenseTypes(): Observable<ExpenseType[]> {
    return this.expenseType.getExpenseTypes().pipe(
      map((x) => {
        const result: ExpenseType[] = [];
        for (let i = 0; i < x.length; i++) {
          const model = this.toClass(x[i]);
          result.push(model);
        }

        return result;
      })
    );
  }

  private toClass(source: ExpenseTypeModel): ExpenseType {
    const model = new ExpenseType();
    model.name = source.name;
    model.id = source.id ?? 0;
    return model;
  }
}
