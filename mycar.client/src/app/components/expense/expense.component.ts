import { ExpenseType, Expense } from '@@services/models';
import { ExpenseTypeService, ExpenseService } from '@@services/services';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.vehicleId = +params.get('vehicleId')!;
    });
    this.getExpenseType();
  }

  // Expense
  public id: number = 0;
  public vehicleId: number = 0;
  public date: Date = new Date();
  public format = "MM/dd/yyyy HH:mm";
  public odometer: number = 0;
  public expenseTypeId: number = 0;
  public place: string = '';
  public description: string = '';
  public value: number = 0;

  // ExpenseType
  public name: string = '';
  public expenseTypes: ExpenseType[] = [];

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
    const expenseCreateModel = new Expense();
    (expenseCreateModel.vehicleId = this.vehicleId),
      (expenseCreateModel.date = this.date),
      (expenseCreateModel.odometer = this.odometer),
      (expenseCreateModel.expenseTypeId = this.expenseTypeId),
      (expenseCreateModel.place = this.place),
      (expenseCreateModel.description = this.description),
      (expenseCreateModel.cost = this.value),
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
    const expenseTypeCreateModel = new ExpenseType();
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
