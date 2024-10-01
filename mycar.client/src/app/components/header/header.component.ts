import { Fuel, Manufacturer,Vehicle } from '@@services/models';
import { FuelTypeService, ManufacturerService, VehicleService} from '@@services/services';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

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
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService
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

  // History
  public setVehicleId(id: number): void {
    this.vehicleId = id;
    localStorage.setItem('vehicleId', id.toString());
  }

  public goToHistory(): void {
    this.router.navigate(['/vehicle', this.vehicleId, 'history']);
  }

  // Vehicle
  public vehicleId: number | null = null;
  public name: string = '';
  public manufacturerId: number = 0;
  public model: string = '';
  public fuelTypeId: number = 0;
  public fuelCapacity: number = 0;
  public description: string = '';

  //Variables For Error
  public nameError: string = '';
  public manufacturerError: string = '';
  public modelError: string = '';
  public fuelTypeError: string = '';
  public fuelCapacityError: string = '';

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
    this.name = this.name.trim();
    this.model = this.model.trim();
    this.description = this.description.trim();
    if (
      !this.validateForm(
        this.name,
        this.model,
        this.manufacturerId,
        this.fuelTypeId,
        this.fuelCapacity
      )
    ) {
      return;
    }
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
    this.spinner.show();
    const element = <HTMLSelectElement>event.target;
    this.vehicleId = parseInt(element.value, 10);

    if (isNaN(this.vehicleId)) {
      this.showModalCarCreate();
      this.spinner.hide();
      return;
    }
    localStorage.setItem('selectedVehicleId', this.vehicleId.toString());
    this.router.navigate(['/vehicle', this.vehicleId, 'history']);
    setTimeout(() => {
      this.spinner.hide();
    }, 500);
  }

  public onInputChange(field: string): void {
    switch (field) {
      case 'name':
        if (this.name.trim()) {
          this.nameError = '';
        }
        break;
      case 'model':
        if (this.model.trim()) {
          this.modelError = '';
        }
        break;
      case 'manufacturer':
        if (this.manufacturerId && this.manufacturerId != 0) {
          this.manufacturerError = ''; 
        }
        break;
      case 'fuelType':
        if (this.fuelTypeId && this.fuelTypeId != 0) {
          this.fuelTypeError = ''; 
        }
        break;
    }
  }

  private resetVehicle(): void {
    this.name = '';
    this.manufacturerId = 0;
    this.model = '';
    this.fuelTypeId = 0;
    this.fuelCapacity = 0;
    this.description = '';
  }

  // validateForm
  private validateForm(
    name: string,
    model: string,
    manufacturerId: number,
    fuelTypeId: number,
    fuelCapacity: number
  ): boolean {
    let isValid = true;

    if (!name.trim()) {
      this.nameError = 'Name is required and cannot be empty!';
      isValid = false;
    } else if (name.length > 20) {
      this.nameError = 'Name cannot exceed 20 characters.';
      isValid = false;
    } else {
      this.nameError = '';
    }

    if (!model.trim()) {
      this.modelError = 'Model is required!';
      isValid = false;
    } else if (model.length > 20) {
      this.modelError = 'Model cannot exceed 20 characters.';
      isValid = false;
    } else {
      this.modelError = '';
    }

    if (!manufacturerId) {
      this.manufacturerError = 'Manufacturer is required!';
      isValid = false;
    }

    if (!fuelTypeId) {
      this.fuelTypeError = 'Fuel type is required!';
      isValid = false;
    }

    if (!fuelCapacity) {
      this.fuelCapacityError = 'Fuel capacity is required!';
      isValid = false;
    } else if (fuelCapacity < 1) {
      this.fuelCapacityError = 'Fuel capacity cannot be negative or zero.';
      isValid = false;
    } else {
      this.fuelCapacityError = '';
    }

    return isValid;
  }
}
