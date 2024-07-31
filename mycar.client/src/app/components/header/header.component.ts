import { Fuel, Manufacturer,Vehicle } from '@@services/models';
import { FuelTypeService, ManufacturerService, VehicleService} from '@@services/services';
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
  public vehicleId: number | null = null;
  public name: string = '';
  public manufacturerId: number = 0;
  public model: string = '';
  public fuelTypeId: number = 0;
  public fuelCapacity: number = 0;
  public description: string = '';

  public fuelTypes: Fuel[] = [];
  public vehicles: Vehicle[] = [];
  public manufacturers: Manufacturer[] = [];

  //For ModalWindow
  public modalCarCreate: boolean = false;

  public showModalCarCreate(): void {
    this.modalCarCreate = true;
  }
  public hideModalCarCreate(): void {
    this.modalCarCreate = false;
  }

  public saveAddChanges(): void {
    const vehicleCreateModel = new Vehicle();
    (vehicleCreateModel.name = this.name),
      (vehicleCreateModel.manufacturerId = this.manufacturerId),
      (vehicleCreateModel.model = this.model),
      (vehicleCreateModel.fuelTypeId = this.fuelTypeId),
      (vehicleCreateModel.fuelCapacity = this.fuelCapacity),
      (vehicleCreateModel.description = this.description);

    this.vehicleService.postVehicle(vehicleCreateModel).subscribe({
      next: (response: Vehicle) => {
        this.resetVehicle();
        this.vehicleId = response.id;
        if (this.vehicleId !== null) {
          localStorage.setItem('selectedVehicleId', this.vehicleId.toString());
          this.router.navigate(['/vehicle', this.vehicleId, 'history']);
          this.getVehicle();
        }
      },
      error: (err) => {
        this.resetVehicle();
      },
    });
    this.modalCarCreate = false;
    this.getVehicle();
  }

  // Vehicle
  public getVehicle(): void {
    this.vehicleService.getVehicle().subscribe((res) => {
      this.vehicles = res;
      if (this.vehicles.length > 0 && !this.vehicleId) {
        this.vehicleId = this.vehicles[0].id!; // Default select the first vehicle
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
