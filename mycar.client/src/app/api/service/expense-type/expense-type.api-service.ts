import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ExpenseTypeCreateModel } from '@api/models/expense-type/expense-type.create.model';
import { ExpenseTypeGetAllModel } from '@api/models/expense-type/expense-type.get-all.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ExpenseTypeApiService {
  private apiUrl = 'api/ExpenseType'; // API address
  constructor(private client: HttpClient) {}

  public getExpenseTypes(): Observable<ExpenseTypeGetAllModel[]> {
    const url = `${this.apiUrl}`;
    return this.client.get<ExpenseTypeGetAllModel[]>(url);
  }

  public addExpenseType(
    expenseTypeCreateModel: ExpenseTypeCreateModel
  ): Observable<ExpenseTypeCreateModel> {
    return this.client.post<ExpenseTypeCreateModel>(
      this.apiUrl,
      expenseTypeCreateModel
    );
  }
}
