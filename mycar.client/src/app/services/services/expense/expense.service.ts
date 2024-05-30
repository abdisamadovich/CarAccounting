import { ExpenseCreate } from '@@services/models/expense/expense.create.view-model';
import { Injectable } from '@angular/core';
import { ExpenseApiService } from '@api/service/expense/expense.api-service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ExpenseService {
  constructor(private expense: ExpenseApiService) {}

  public postExpense(expenseCreate: ExpenseCreate): Observable<ExpenseCreate> {
    return this.expense.addExpense(expenseCreate);
  }
}
