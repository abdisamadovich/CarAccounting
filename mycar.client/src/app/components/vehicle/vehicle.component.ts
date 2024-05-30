import { Component, OnInit, inject } from '@angular/core';
import { FuelTypeGetAll } from '@@services/models/fuel-type/fuel-type.get-all.view-model';
import { ManufacturerGetAll } from '@@services/models/manufacturer/manufacturer.get-all.view-model';
import { VehicleCreate } from '@@services/models/vehicle/vehicle.create.view-model';
import { VehicleDelete } from '@@services/models/vehicle/vehicle.delete.view-model';
import { VehicleGetAll } from '@@services/models/vehicle/vehicle.get-all.view-model';
import { FuelTypeService } from '@@services/services/fuel-type/fuel-type.service';
import { ManufacturerService } from '@@services/services/manufacturer/manufacturer.service';
import { VehicleService } from '@@services/services/vehicle/vehicle.service';
import { Router, RouterModule, Routes } from '@angular/router';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrl: './vehicle.component.less',
})
export class VehicleComponent implements OnInit {
  // Inject
  constructor(
    private vehicleService: VehicleService,
    private manufacturerService: ManufacturerService,
    private fuelTypeService: FuelTypeService,
    private router: Router
  ) {}

  // ngOnInit
  ngOnInit(): void {
    this.getManufacturer();
    this.getFuelType();
    this.getVehicle();
  }

  // Vehicle
  public id: number = 0;
  public name: string = '';
  public manufacturerId: number = 0;
  public model: string = '';
  public fuelTypeId: number = 0;
  public fuelCapacity: number = 0;
  public description: string = '';

  //For ModalWindow
  public modalCarCreate: boolean = false;

  public showModalCarCreate(): void {
    this.modalCarCreate = true;
  }
  public hideModalCarCreate(): void {
    this.modalCarCreate = false;
  }

  public saveAddChanges(): void {
    const vehicleCreateModel = new VehicleCreate();
    (vehicleCreateModel.name = this.name),
      (vehicleCreateModel.manufacturerId = this.manufacturerId),
      (vehicleCreateModel.model = this.model),
      (vehicleCreateModel.fuelTypeId = this.fuelTypeId),
      (vehicleCreateModel.fuelCapacity = this.fuelCapacity),
      (vehicleCreateModel.description = this.description);

    this.vehicleService.postVehicle(vehicleCreateModel).subscribe({
      next: (response) => {
        this.resetVehicle();
      },
      error: (err) => {
        this.resetVehicle();
      },
    });
    this.modalCarCreate = false;
    this.getVehicle();
  }

  public deleteVehicle(): void {
    const vehicleDeleteModel = new VehicleDelete();
    vehicleDeleteModel.id = this.id;

    this.vehicleService.deleteVehicle(vehicleDeleteModel).subscribe({
      next: (response) => {
        this.getVehicle();
      },
    });
  }

  private resetVehicle(): void {
    this.name = '';
    this.manufacturerId = 0;
    this.model = '';
    this.fuelTypeId = 0;
    this.fuelCapacity = 0;
    this.description = '';
  }

  // VehicleGetAll
  public vehicles: VehicleGetAll[] = [];
  public getVehicle(): void {
    this.vehicleService.getVehicle().subscribe((res) => {
      this.vehicles = res;
    });
  }

  // Manufacturer
  public manufacturers: ManufacturerGetAll[] = [];
  public getManufacturer(): void {
    this.manufacturerService.getManufacturers().subscribe((res) => {
      this.manufacturers = res;
    });
  }

  // FuelType
  public fuelTypes: FuelTypeGetAll[] = [];
  public getFuelType(): void {
    this.fuelTypeService.getFuelTypes().subscribe((res) => {
      this.fuelTypes = res;
    });
  }

  public onVehicleChange(event: Event): void {
    const element = <HTMLSelectElement>event.target;
    this.id = parseInt(element.value, 10);
    this.router.navigate([`/vehicle/${this.id}/history`]);
  }
}
