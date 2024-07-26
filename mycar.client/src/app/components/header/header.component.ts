import { FuelTypeGetAll } from '@@services/models/fuel-type/fuel-type.get-all.view-model';
import { ManufacturerGetAll } from '@@services/models/manufacturer/manufacturer.get-all.view-model';
import { VehicleCreate } from '@@services/models/vehicle/vehicle.create.view-model';
import { VehicleDelete } from '@@services/models/vehicle/vehicle.delete.view-model';
import { VehicleGetAll } from '@@services/models/vehicle/vehicle.get-all.view-model';
import { FuelTypeService } from '@@services/services/fuel-type/fuel-type.service';
import { ManufacturerService } from '@@services/services/manufacturer/manufacturer.service';
import { VehicleService } from '@@services/services/vehicle/vehicle.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.less',
})
export class HeaderComponent implements OnInit {
  // Inject
  constructor(
    private vehicleService: VehicleService,
    private manufacturerService: ManufacturerService,
    private fuelTypeService: FuelTypeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['vehicleId']) {
        this.vehicleId = +params['vehicleId'];
      } else {
        const savedVehicleId = localStorage.getItem('selectedVehicleId');
        if (savedVehicleId) {
          this.vehicleId = +savedVehicleId;
          this.router.navigate(['/vehicle', this.vehicleId, 'history']);
        }
      }
    });
    this.getVehicle();
    this.getFuelType();
    this.getManufacturer();
  }

  // Vehicle
  public vehicleId: number = 0;
  public name: string = '';
  public manufacturerId: number = 0;
  public model: string = '';
  public fuelTypeId: number = 0;
  public fuelCapacity: number = 0;
  public description: string = '';

  public fuelTypes: FuelTypeGetAll[] = [];
  public vehicles: VehicleGetAll[] = [];
  public manufacturers: ManufacturerGetAll[] = [];

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
      next: (response: VehicleGetAll) => {
        this.resetVehicle();
        this.vehicleId = response.id;
        localStorage.setItem('selectedVehicleId', this.vehicleId.toString());
        this.getVehicle();
        this.router.navigate(['/vehicle', this.vehicleId, 'history']);
        this.getVehicle();
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
    vehicleDeleteModel.vehicleId = this.vehicleId;

    this.vehicleService.deleteVehicle(vehicleDeleteModel).subscribe({
      next: (response) => {
        this.getVehicle();
      },
    });
  }

  // Vehicle
  public getVehicle(): void {
    this.vehicleService.getVehicle().subscribe((res) => {
      this.vehicles = res;
      if (this.vehicles.length > 0 && !this.vehicleId) {
        this.vehicleId = this.vehicles[0].id; // Default select the first vehicle
        localStorage.setItem('selectedVehicleId', this.vehicleId.toString());
        this.router.navigate(['/vehicle', this.vehicleId, 'history']);
      }
    });
  }

  // Manufacturer
  public getManufacturer(): void {
    this.manufacturerService.getManufacturers().subscribe((res) => {
      this.manufacturers = res;
    });
  }

  // FuelType
  public getFuelType(): void {
    this.fuelTypeService.getFuelTypes().subscribe((res) => {
      this.fuelTypes = res;
    });
  }

  public onVehicleChange(event: Event): void {
    const element = <HTMLSelectElement>event.target;
    this.vehicleId = parseInt(element.value, 10);

    if (isNaN(this.vehicleId)) {
      this.showModalCarCreate();
      return;
    }
    localStorage.setItem('selectedVehicleId', this.vehicleId.toString());
    this.router.navigate(['/vehicle', this.vehicleId, 'history']);
  }

  private resetVehicle(): void {
    this.name = '';
    this.manufacturerId = 0;
    this.model = '';
    this.fuelTypeId = 0;
    this.fuelCapacity = 0;
    this.description = '';
  }
}
