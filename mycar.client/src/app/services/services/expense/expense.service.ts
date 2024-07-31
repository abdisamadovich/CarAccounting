import { Expense } from '@@services/models';
import { Injectable } from '@angular/core';
import { ExpenseModel } from '@api/models';
import { ExpenseApiService } from '@api/service';
import { Observable, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ExpenseService {
  constructor(private expense: ExpenseApiService) {}

  public postExpense(expense: Expense): Observable<Expense> {
    return this.expense
      .addExpense({
        date: expense.date,
        description: expense.description,
        expenseTypeId: expense.expenseTypeId,
        odometer: expense.odometer,
        place: expense.place,
        cost: expense.cost,
        vehicleId: expense.vehicleId,
      })
      .pipe(
        map((x) => {
          const result = this.toClass(x);
          return result;
        })
      );
  }

  public getExpense(): Observable<Expense[]> {
    return this.expense.getExpense().pipe(
      map((x) => {
        const result: Expense[] = [];
        for (let i = 0; i < x.length; i++) {
          const model = this.toClass(x[i]);
          result.push(model);
        }

        return result;
      })
    );
  }

  private toClass(source: ExpenseModel): Expense {
    const model = new Expense();
    model.date = source.date;
    model.description = source.description;
    model.expenseTypeId = source.expenseTypeId;
    model.id = source.id || null;
    model.odometer = source.odometer;
    model.place = source.place;
    model.cost = source.cost;
    model.vehicleId = source.vehicleId;
    return model;
  }
}
