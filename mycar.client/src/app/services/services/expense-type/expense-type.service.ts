import { ExpenseTypeCreate } from '@@services/models/expense-type/expense-type.create.view-model';
import { ExpenseTypeGetAll } from '@@services/models/expense-type/expense-type.get-all.view-model';
import { Injectable } from '@angular/core';
import { ExpenseTypeApiService } from '@api/service/expense-type/expense-type.api-service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ExpenseTypeService {
  constructor(private serviceType: ExpenseTypeApiService) {}

  // GetAll ExpenseTypes
  public getExpenseTypes(): Observable<ExpenseTypeGetAll[]> {
    return this.serviceType.getExpenseTypes();
  }

  public postExpenseType(
    expenseTypeCreate: ExpenseTypeCreate
  ): Observable<ExpenseTypeCreate> {
    return this.serviceType.addExpenseType(expenseTypeCreate);
  }
}
