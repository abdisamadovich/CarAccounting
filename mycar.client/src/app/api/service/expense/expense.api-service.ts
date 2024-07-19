import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ExpenseCreateModel } from '@api/models/expense/expense.create.model';
import { ExpenseGetAllModel } from '@api/models/expense/expense.get-all.model';
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

  public getExpense(): Observable<ExpenseGetAllModel[]> {
    const url = `${this.apiUrl}`;
    return this.client.get<ExpenseGetAllModel[]>(url);
  }
}
