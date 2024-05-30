import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ExpenseCreateModel } from '@api/models/expense/expense.create.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ExpenseApiService {
  private apiUrl = 'api/Expense';
  constructor(private client: HttpClient) {}

  public addExpense(
    expenseCreateModel: ExpenseCreateModel
  ): Observable<ExpenseCreateModel> {
    return this.client.post<ExpenseCreateModel>(
      this.apiUrl,
      expenseCreateModel
    );
  }
}
