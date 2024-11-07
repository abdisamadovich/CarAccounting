import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExpenseType, Expense } from '@@services/models';
import { ExpenseTypeService, ExpenseService } from '@@services/services';
import { NgxSpinnerService } from 'ngx-spinner';
import { SelectModel } from '@@components/models';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrl: './expense.component.less',
})
export class ExpenseComponent implements OnInit {
  public expenseForm!: FormGroup;
  public expenseTypeForm!: FormGroup;
  public vehicleId: number = 0;
  public selectModel: SelectModel[] = [];
  public modalExpenseTypeCreate: boolean = false;

  constructor(
    private fb: FormBuilder,
    private expenseService: ExpenseService,
    private expenseTypeService: ExpenseTypeService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}

  public ngOnInit(): void {
    this.expenseForm = this.fb.group({
      date: [new Date(), Validators.required],
      odometer: [0, [Validators.required, Validators.min(0), Validators.max(2147483647)]],
      expenseType: [null, Validators.required],
      place: ["", Validators.required],
      description: [""],
      cost: [0, [Validators.required, Validators.min(0), Validators.max(99999.99)]],
    });

    this.expenseTypeForm = this.fb.group({
      name: ["", [Validators.required, Validators.maxLength(30)]],
    });

    this.route.paramMap.subscribe((params) => {
      this.vehicleId = +params.get("vehicleId")!;
    });

    this.getExpenseType();
  }

  public showModalExpenseTypeCreate(): void {
    this.modalExpenseTypeCreate = true;
  }

  public hideModalExpenseTypeCreate(): void {
    this.modalExpenseTypeCreate = false;
    this.expenseTypeForm.reset();
  }

  public getExpenseType(): void {
    this.spinner.show();
    this.expenseTypeService.getExpenseTypes().subscribe((res) => {
      this.selectModel = res.map((expense) => ({
        label: expense.name,
        value: expense.id!,
      }));
    });
    this.spinner.hide();
  }

  public saveAddExpenseChanges(): void {
    if (this.expenseForm.invalid) {
      this.expenseForm.markAllAsTouched();
      this.toastr.warning("Please fill out all required fields correctly");
      return;
    }

    const expenseCreateModel = new Expense();
    expenseCreateModel.vehicleId = this.vehicleId;
    expenseCreateModel.date = this.expenseForm.value.date;
    expenseCreateModel.odometer = this.expenseForm.value.odometer;
    expenseCreateModel.expenseTypeId = this.expenseForm.value.expenseType;
    expenseCreateModel.cost = this.expenseForm.value.cost;
    expenseCreateModel.description = this.expenseForm.value.description;
    expenseCreateModel.place = this.expenseForm.value.place;

    this.spinner.show();
    this.expenseService.postExpense(expenseCreateModel).subscribe({
      next: (response) => {
        this.toastr.success("Successfully added expense!");
        this.router.navigate(["/vehicle", this.vehicleId, "history"]);
        this.spinner.hide();
      },
      error: (err) => {
        this.spinner.hide();
        if (err.error && err.error.Message) {
          this.toastr.error(err.error.Message);
        } else {
          this.toastr.warning("Error during add!");
        }
      }
    });
  }

  public cancel(): void {
    this.router.navigate(["/vehicle", this.vehicleId, "history"]);
  }

  public saveAddExpenseTypeChanges(): void {
    if (this.expenseTypeForm.invalid) {
      this.expenseTypeForm.markAllAsTouched();
      this.toastr.warning("Service type name is required and must not exceed 30 characters");
      return;
    }

    const expenseTypeCreateModel = new ExpenseType();
    expenseTypeCreateModel.name = this.expenseTypeForm.value.name;


    this.spinner.show();
    if (
      this.selectModel.some(
        (expenseType) =>
          String(expenseType["value"]).toLowerCase() ===
          expenseTypeCreateModel.name.toLowerCase()
      )
    ) {
      this.toastr.warning("Expense type with the same name already exists!");
      return;
    }

    this.expenseTypeService.postExpenseType(expenseTypeCreateModel).subscribe({
      next: () => {
        this.toastr.success("Successfully added expense type!");
        this.getExpenseType();
        this.hideModalExpenseTypeCreate();
        this.spinner.hide();
      },
      error: () => {
        this.toastr.warning("Error during adding!");
        this.getExpenseType();
        this.spinner.hide();
      },
    });
  }
}
