import { Fuel, Refuelling } from '@@services/models';
import { FuelService, RefuellingService } from '@@services/services';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-refueling',
  templateUrl: './refueling.component.html',
  styleUrl: './refueling.component.less',
})
export class RefuelingComponent implements OnInit {
  //Inject
  constructor(
    private refuellingService: RefuellingService,
    private fuelService: FuelService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.vehicleId = +params.get('vehicleId')!;
    });
    this.getFuel();
  }

  public vehicleId: number = 0;
  // Refuelling
  public id: number = 0;
  public date: Date = new Date();
  public format = "MM/dd/yyyy HH:mm";
  public odometer: number = 0;
  public fuelId: number = 0;
  public price: number = 0;
  public totalCost: number = 0;
  public quantity: number = 0;
  public isFilled: boolean = true;
  public station: string = '';
  //For ModalWindow
  public modalRefuellingCreate: boolean = false;
  public fuels: Fuel[] = [];
  //Variables For Error
  public odometerError: string = "";
  public fuelError: string = "";
  public priceError: string = "";
  public quantityError: string = "";
  public totalCostError: string = "";
  public stationError: string = "";

  public calculateQuantity(): void {
    if (this.price !== 0 && this.totalCost !== 0) {
      this.quantity = this.totalCost / this.price;
    } else {
      this.quantity = 0;
    }
  }

  public calculateTotalCost(): void {
    this.totalCost = this.quantity * this.price;
  }

  public calculatePrice(): void {
    if (this.totalCost !== 0 && this.quantity !== 0) {
      this.price = this.totalCost / this.quantity;
    } else {
      this.price = 0;
    }
  }

  // Fuels
  public getFuel(): void {
    this.fuelService.getFuel().subscribe((res) => {
      this.fuels = res;
    });
  }

  public showModalRefuellingCreate(): void {
    this.modalRefuellingCreate = true;
  }
  public hideModalRefuellingCreate(): void {
    this.modalRefuellingCreate = false;
  }

  public saveAddChanges(): void {
    this.station = this.station.trim();
    if (
      !this.validatForm(
        this.odometer,
        this.fuelId,
        this.price,
        this.quantity,
        this.totalCost,
        this.station
      )
    ) {
      return;
    }
    const refuellingCreateModel = new Refuelling();
    (refuellingCreateModel.vehicleId = this.vehicleId),
      (refuellingCreateModel.date = this.date),
      (refuellingCreateModel.odometer = this.odometer),
      (refuellingCreateModel.fuelId = this.fuelId),
      (refuellingCreateModel.price = this.price),
      (refuellingCreateModel.totalCost = this.quantity * this.price),
      (refuellingCreateModel.quantity = this.quantity),
      (refuellingCreateModel.isFilled = this.isFilled),
      (refuellingCreateModel.station = this.station),
      this.refuellingService.postRefuelling(refuellingCreateModel).subscribe({
        next: (response) => {
          this.toastr.success('Succes add Refueling!');
          this.router.navigate(['/vehicle', this.vehicleId, 'history']);
        },
        error: (err) => {
          this.toastr.warning('Error during add!');
        },
      });
    this.modalRefuellingCreate = false;
  }

  public cancel(): void {
    this.router.navigate(['/vehicle', this.vehicleId, 'history']);
  }

  public onInputChange(field: string): void {
    switch (field) {
      case "odometer":
        if (this.odometer >= 0) {
          this.odometerError = "";
        }
        break;
      case "fuel":
        if (this.fuelId && this.fuelId != 0) {
          this.fuelError = "";
        }
        break;

      case "price":
        if (this.price >= 0) {
          this.priceError = "";
        }
        break;
      case "quantity":
        if (this.quantity >= 0) {
          this.quantityError = "";
        }
        break;
      case "totalCost":
        if (this.totalCost >= 0) {
          this.totalCostError = "";
        }
        break;

      case "station":
        if (this.station && this.station.trim() !== "") {
          this.stationError = "";
        }
        break;
    }
  }

  // Validate form
  private validatForm(
    odometer: number,
    fuelId: number,
    price: number,
    quantity: number,
    totalCost: number,
    station: string
  ): boolean {
    let isValid = true;

    if (odometer < 0) {
      this.odometerError = "Odometer cannot be a negative value!";
      isValid = false;
    }

    if (!fuelId) {
      this.fuelError = "Fuel is required!";
      isValid = false;
    }

    if (price < 0) {
      this.priceError = "Price cannot be a negative value!";
      isValid = false;
    }

    if (quantity < 0) {
      this.quantityError = "Quantity cannot be a negative value!";
      isValid = false;
    }

    if (totalCost < 0) {
      this.totalCostError = "Totalcost cannot be a negative value!";
      isValid = false;
    }

    if (!station || station.trim() === "") {
      this.stationError = "Gas station is required!";
      isValid = false;
    }

    return isValid;
  }
}
