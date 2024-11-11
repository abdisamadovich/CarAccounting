import { SelectModel } from '@@components/models';
import { Fuel, Refuelling } from '@@services/models';
import { FuelService, RefuellingService } from '@@services/services';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-refueling',
  templateUrl: './refueling.component.html',
  styleUrl: './refueling.component.less',
})
export class RefuelingComponent implements OnInit {
  public refuelingForm!: FormGroup;
  public selectModel: SelectModel[] = [];
  public vehicleId: number = 0;

  constructor(
    private fb: FormBuilder,
    private refuellingService: RefuellingService,
    private fuelService: FuelService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.refuelingForm = this.fb.group({
      date: [new Date(), Validators.required],
      odometer: [0, [Validators.required, Validators.min(0), Validators.max(2147483647)]],
      fuel: [null, Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      quantity: [0, [Validators.required, Validators.min(0)]],
      totalCost: [0, [Validators.required, Validators.min(0)]],
      station: [""],
      isFilled: [true]
    });

    this.route.paramMap.subscribe((params) => {
      this.vehicleId = +params.get("vehicleId")!;
    });

    this.getFuels();
    this.setupValueChanges();
  }

  public getFuels(): void {
    this.spinner.show(); 
    this.fuelService.getFuel().subscribe((res) => {
      this.selectModel = res.map(fuel => ({
        label: fuel.name,
        value: fuel.id!
      }));
      this.spinner.hide(); 
    }, () => {
      this.spinner.hide();
      this.toastr.error("Error fetching fuels!");
    });
  }

  public saveAddChanges(): void {
    if (this.refuelingForm.invalid) {
      this.refuelingForm.markAllAsTouched();
      this.toastr.warning("Please fill out all required fields correctly");
      return;
    }

    const price = this.refuelingForm.value.price;
    const quantity = this.refuelingForm.value.quantity;
    const totalCost = this.refuelingForm.value.totalCost;
    const maxAllowedCost = 9999999999999998;

    if (price > maxAllowedCost) {
      this.toastr.warning("The Price value exceeds the maximum allowed for decimal(18, 2). Maximum allowed is ${maxAllowedCost}.");
      return;
    }

    if (quantity > maxAllowedCost) {
      this.toastr.warning("The Quantity value exceeds the maximum allowed for decimal(18, 2). Maximum allowed is ${maxAllowedCost}.");
      return;
    }

    if (totalCost > maxAllowedCost) {
      this.toastr.warning("The Total cost value exceeds the maximum allowed for decimal(18, 2). Maximum allowed is ${maxAllowedCost}.");
      return;
    }

    const refuellingCreateModel = new Refuelling();
    refuellingCreateModel.vehicleId = this.vehicleId;
    refuellingCreateModel.date = this.refuelingForm.value.date;
    refuellingCreateModel.odometer = this.refuelingForm.value.odometer;
    refuellingCreateModel.fuelId = this.refuelingForm.value.fuel;
    refuellingCreateModel.price = this.refuelingForm.value.price;
    refuellingCreateModel.quantity = this.refuelingForm.value.quantity;
    refuellingCreateModel.totalCost = this.refuelingForm.value.totalCost;
    refuellingCreateModel.station = this.refuelingForm.value.station;
    refuellingCreateModel.isFilled = this.refuelingForm.value.isFilled;

    this.spinner.show();
    this.refuellingService.postRefuelling(refuellingCreateModel).subscribe({
      next: () => {
        this.toastr.success("Successfully add Refueling!");
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

  public onPriceBlur(): void {
    this.calculateTotalCost();
  }

  public onTotalCostBlur(): void {
    this.calculateQuantity();
  }

  public onQuantityBlur(): void {
    this.calculatePrice();
  }
  
  public cancel(): void {
    this.router.navigate(["/vehicle", this.vehicleId, "history"]);
  }

  private setupValueChanges(): void {
    this.refuelingForm.get("price")?.valueChanges.subscribe(() => {
      const price = this.refuelingForm.get("price")?.value;
      const quantity = this.refuelingForm.get("quantity")?.value;

      if (price != null && quantity != null && price > 0 && quantity > 0) {
        this.refuelingForm.patchValue({ totalCost: price * quantity }, { emitEvent: false });
      } else {
        this.calculateQuantity();
      }
    });

    this.refuelingForm.get("totalCost")?.valueChanges.subscribe(() => {
      const totalCost = this.refuelingForm.get("totalCost")?.value;
      const price = this.refuelingForm.get("price")?.value;

      if (totalCost != null && price != null && price > 0) {
        this.refuelingForm.patchValue({ quantity: totalCost / price }, { emitEvent: false });
      } else {
        this.calculatePrice();
      }
    });

    this.refuelingForm.get("quantity")?.valueChanges.subscribe(() => {
      const totalCost = this.refuelingForm.get("totalCost")?.value;
      const quantity = this.refuelingForm.get("quantity")?.value;

      if (totalCost != null && quantity != null && quantity > 0) {
        this.refuelingForm.patchValue({ price: totalCost / quantity }, { emitEvent: false });
      } else {
        this.calculateTotalCost();
      }
    });
  }

  private calculateTotalCost(): void {
    const price = this.refuelingForm.get("price")?.value;
    const quantity = this.refuelingForm.get("quantity")?.value;

    if (price != null && quantity != null && price > 0 && quantity > 0) {
      this.refuelingForm.patchValue({ totalCost: price * quantity }, { emitEvent: false });
    }
  }

  private calculateQuantity(): void {
    const totalCost = this.refuelingForm.get("totalCost")?.value;
    const price = this.refuelingForm.get("price")?.value;

    if (totalCost != null && price != null && price > 0) {
      this.refuelingForm.patchValue({ quantity: totalCost / price }, { emitEvent: false });
    }
  }

  private calculatePrice(): void {
    const totalCost = this.refuelingForm.get("totalCost")?.value;
    const quantity = this.refuelingForm.get("quantity")?.value;

    if (totalCost != null && quantity != null && quantity > 0) {
      this.refuelingForm.patchValue({ price: totalCost / quantity }, { emitEvent: false });
    }
  }
}
