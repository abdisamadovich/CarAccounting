import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ExpenseTypeModel } from '@api/models';

import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ExpenseTypeApiService {
  private apiUrl = 'api/ExpenseType'; // API address
  constructor(private client: HttpClient) {}

  public getExpenseTypes(): Observable<ExpenseTypeModel[]> {
    const url = `${this.apiUrl}`;
    return this.client.get<ExpenseTypeModel[]>(url);
  }

  public addExpenseType(
    expenseTypeCreateRequest: ExpenseTypeModel
  ): Observable<ExpenseTypeModel> {
    return this.client.post<ExpenseTypeModel>(
      this.apiUrl,
      expenseTypeCreateRequest
    );
  }
}
