import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ExpenseModel } from '@api/models';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ExpenseApiService {
  private apiUrl = 'api/Expense';
  constructor(private client: HttpClient) {}

  public addExpense(expense: ExpenseModel): Observable<ExpenseModel> {
    return this.client.post<ExpenseModel>(this.apiUrl, expense);
  }

  public getExpense(): Observable<ExpenseModel[]> {
    const url = `${this.apiUrl}`;
    return this.client.get<ExpenseModel[]>(url);
  }
}
