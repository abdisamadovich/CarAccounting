import { ExpenseTypeCreate } from '@@services/models/expense-type/expense-type.create.view-model';
import { ExpenseTypeGetAll } from '@@services/models/expense-type/expense-type.get-all.view-model';
import { ExpenseCreate } from '@@services/models/expense/expense.create.view-model';
import { ExpenseTypeService } from '@@services/services/expense-type/expense-type.service';
import { ExpenseService } from '@@services/services/expense/expense.service';
import { Component, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrl: './expense.component.less',
})
export class ExpenseComponent {
  public constructor(
    private expenseService: ExpenseService,
    private expenseTypeService: ExpenseTypeService,
    private toastr: ToastrService
  ) {}

  public ngOnInit(): void {
    this.getExpenseType();
  }

  // Expense
  public id: number = 0;
  public vehicleId: number = 0;
  public date: Date = new Date();
  public odometer: number = 0;
  public expenseTypeId: number = 0;
  public place: string = '';
  public description: string = '';
  public value: number = 0;

  // ExpenseType
  public name: string = '';
  public expenseTypes: ExpenseTypeGetAll[] = [];

  //For ModalWindow
  public modalExpenseTypeCreate: boolean = false;

  public showModalExpenseTypeCreate(): void {
    this.modalExpenseTypeCreate = true;
  }

  public hideModalExpenseTypeCreate(): void {
    this.modalExpenseTypeCreate = false;
  }

  // ServiceType
  public getExpenseType(): void {
    this.expenseTypeService.getExpenseTypes().subscribe((res) => {
      this.expenseTypes = res;
    });
  }

  public saveAddExpenseChanges(): void {
    const expenseCreateModel = new ExpenseCreate();
    (expenseCreateModel.vehicleId = this.vehicleId),
      (expenseCreateModel.date = this.date),
      (expenseCreateModel.odometer = this.odometer),
      (expenseCreateModel.expenseTypeId = this.expenseTypeId),
      (expenseCreateModel.place = this.place),
      (expenseCreateModel.description = this.description),
      (expenseCreateModel.value = this.value),
      this.expenseService.postExpense(expenseCreateModel).subscribe({
        next: (response) => {
          this.toastr.success("Succes add Expense!");
          this.resetExpense();
        },
        error: (err) => {
          this.toastr.warning("Error during add!");
          this.resetExpense();
        },
      });
  }

  public saveAddExpenseTypeChanges(): void {
    const expenseTypeCreateModel = new ExpenseTypeCreate();
    expenseTypeCreateModel.name = this.name;
    this.expenseTypeService.postExpenseType(expenseTypeCreateModel).subscribe({
      next: (response) => {
        this.toastr.success("Succes add ExpenseType!");
        this.resetExpenseType();
        this.getExpenseType();
      },
      error: (err) => {
        this.toastr.warning("Error during add!");
        this.resetExpenseType();
        this.getExpenseType();
      },
    });
  }

  private resetExpense(): void {
    this.vehicleId = 0;
    this.date = new Date();
    this.odometer = 0;
    this.expenseTypeId = 0;
    this.place = '';
    this.description = '';
    this.value = 0;
  }

  private resetExpenseType(): void {
    this.name = '';
  }
}
