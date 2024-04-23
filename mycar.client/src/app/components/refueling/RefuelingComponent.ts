import { FuelGetAll } from '@@services/models/fuel/fuelGetAll';
import { RefuellingCreate } from '@@services/models/refuelling/refuellingCreate';
import { FuelService } from '@@services/services/fuel/fuel.service';
import { RefuellingService } from '@@services/services/refuelling/refuelling.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-refueling',
  templateUrl: './refueling.component.html',
  styleUrl: './refueling.component.less',
})
export class RefuelingComponent implements OnInit {
  //Inject
  constructor(
    private refuellingService: RefuellingService,
    private fuelService: FuelService
  ) {}

  ngOnInit(): void {
    this.getFuel();
  }

  // Refuelling
  public id: number = 0;
  public date: Date = new Date();
  public odometer: number = 0;
  public fuelId: number = 0;
  public price: number = 0;
  public totalCost: number = 0;
  public quantity: number = 0;
  public isFilled: boolean = true;
  public station: string = '';
  //For ModalWindow
  public modalRefuellingCreate: boolean = false;
  public fuels: FuelGetAll[] = [];

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
    this.fuelService.getFuels().subscribe((res) => {
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
    const refuellingCreateModel = new RefuellingCreate();
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
          this.resetRefuelling();
        },
        error: (err) => {
          this.resetRefuelling();
        },
      });
    this.modalRefuellingCreate = false;
  }

  private resetRefuelling(): void {
    this.date = new Date();
    this.odometer = 0;
    this.fuelId = 0;
    this.price = 0;
    this.totalCost = 0;
    this.quantity = 0;
    this.isFilled = true;
    this.station = '';
  }
}
