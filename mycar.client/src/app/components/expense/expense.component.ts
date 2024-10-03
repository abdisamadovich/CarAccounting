import { ExpenseType, Expense } from '@@services/models';
import { ExpenseTypeService, ExpenseService } from '@@services/services';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private route: ActivatedRoute,
    private router: Router
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
  public cost: number = 0;
  //Expense type
  public name: string = '';
  public expenseTypes: ExpenseType[] = [];
  //Variables for error
  public nameError: string = "";
  public odometerError: string = "";
  public expenseError: string = "";
  public placeError: string = "";
  public costError: string = "";
  //For modal windows
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
    this.place = this.place.trim();
    this.description = this.description.trim();
    if (
      !this.validatForm(
        this.odometer,
        this.expenseTypeId,
        this.cost,
        this.place
      )
    ) {
      return;
    }
    const expenseCreateModel = new Expense();
    (expenseCreateModel.vehicleId = this.vehicleId),
      (expenseCreateModel.date = this.date),
      (expenseCreateModel.odometer = this.odometer),
      (expenseCreateModel.expenseTypeId = this.expenseTypeId),
      (expenseCreateModel.place = this.place),
      (expenseCreateModel.description = this.description),
      (expenseCreateModel.cost = this.cost),
      this.expenseService.postExpense(expenseCreateModel).subscribe({
        next: (response) => {
          this.toastr.success("Succes add Expense!");
          this.router.navigate(['/vehicle', this.vehicleId, 'history']);
        },
        error: (err) => {
          this.toastr.warning("Error during add!");
        },
      });
  }

  public cancel(): void {
    this.router.navigate(['/vehicle', this.vehicleId, 'history']);
  }

  public saveAddExpenseTypeChanges(): void {
    this.name = this.name.trim();
    if (
      this.expenseTypes.some(
        (expenseType) =>
          expenseType.name.toLowerCase() === this.name.toLowerCase()
      )
    ) {
      this.toastr.warning("Service type with the same name already exists!");
      return;
    }

    if (!this.validateFormServiceType(this.name)) {
      return;
    }
    const expenseTypeCreateModel = new ExpenseType();
    expenseTypeCreateModel.name = this.name;
    this.expenseTypeService.postExpenseType(expenseTypeCreateModel).subscribe({
      next: (response) => {
        this.toastr.success("Succes add ExpenseType!");
        this.resetExpenseType();
        this.getExpenseType();
        this.hideModalExpenseTypeCreate();
      },
      error: (err) => {
        this.toastr.warning("Error during add!");
        this.resetExpenseType();
        this.getExpenseType();
      },
    });
  }

  public onInputChangeExpense(field: string): void {
    switch (field) {
      case "odometer":
        if (this.odometer >= 0) {
          this.odometerError = "";
        }
        break;
      case "expense":
        if (this.expenseTypeId && this.expenseTypeId != 0) {
          this.expenseError = "";
        }
        break;
      case "cost":
        if (this.cost >= 0) {
          this.costError = "";
        }
        break;
      case "place":
        if (this.place && this.place.trim() !== "") {
          this.placeError = "";
        }
        break;
    }
  }

  // Validate form
  private validatForm(
    odometer: number,
    expenseTypeId: number,
    cost: number,
    place: string
  ): boolean {
    let isValid = true;

    if (odometer < 0) {
      this.odometerError = "Odometer cannot be a negative value!";
      isValid = false;
    }

    if (!expenseTypeId) {
      this.expenseError = "Expense is required!";
      isValid = false;
    }

    if (cost < 0) {
      this.costError = "Cost cannot be a negative value!";
      isValid = false;
    }

    if (!place || place.trim() === "") {
      this.placeError = "Place is required!";
      isValid = false;
    }

    return isValid;
  }

  public onInputChangeExpenseType(field: string): void {
    switch (field) {
      case "name":
        if (this.name.trim()) {
          this.nameError = "";
        }
        break;
    }
  }

  private resetExpenseType(): void {
    this.name = '';
  }

  //Validate form service type
  private validateFormServiceType(name: string): boolean {
    let isValid = true;

    if (!name.trim()) {
      this.nameError = "Name is required and cannot be empty!";
      isValid = false;
    } else if (name.length > 30) {
      this.nameError = "Name cannot exceed 30 characters";
      isValid = false;
    } else {
      this.nameError = "";
    }

    return isValid;
  }
}
