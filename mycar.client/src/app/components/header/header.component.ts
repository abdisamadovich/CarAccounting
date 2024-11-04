import { Vehicle } from '@@services/models';
import { VehicleService, ManufacturerService, FuelTypeService } from '@@services/services';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { SelectModel } from '@@components/models';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { changeVehicle } from 'app/store/vehicle/vehicle.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.less',
})
export class HeaderComponent implements OnInit {
  public count: Observable<number>;
  public myForm!: FormGroup;
  public vehicles: Vehicle[] = [];
  public manufacturerSelectModel: SelectModel[] = [];
  public fuelTypeSelectModel: SelectModel[] = [];
  public vehicleId: number = 0;
  public modalCarCreate: boolean = false;

  constructor(
    private fb: FormBuilder,
    private vehicleService: VehicleService,
    private manufacturerService: ManufacturerService,
    private fuelTypeService: FuelTypeService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private store: Store<{ vehicleId: number }>
  ) {
    this.count = store.select("vehicleId");
  }

  ngOnInit(): void {
    this.initializeForm();
    this.loadVehicleId().then(() => {
      this.loadVehiclesBasedOnId();
    });
    this.getManufacturers();
    this.getFuelType();
    this.subscribeToVehicleDeletion();
  }

  public getVehicles(getLast?: boolean): void {
    this.spinner.show();
    this.vehicleService.getVehicle().subscribe((res) => {
      this.vehicles = res;
      const count = res.length;
      if(getLast && count > 0) {
        this.onVehicleChange(res[count - 1].id);
      } else {
        if(count === 0) {
          this.showModalCarCreate()
        }
      }
    });
    this.spinner.hide();
  }

  public handleChangeVehicle(vehicleId: number): void {
    this.onVehicleChange(vehicleId);
    this.getVehicles();
  }

  public getManufacturers(): void {
    this.spinner.show();
    this.manufacturerService.getManufacturers().subscribe((res) => {
      this.manufacturerSelectModel = res.map(Manufacturer => ({
        label: Manufacturer.name,
        value: Manufacturer.id!
      }))
    });
    this.spinner.hide();
  }

  public getFuelType(): void {
    this.spinner.show(); 
    this.fuelTypeService.getFuelTypes().subscribe((res) => {
      this.fuelTypeSelectModel = res.map(fuel => ({
        label: fuel.name,
        value: fuel.id!
      }));
      this.spinner.hide(); 
    }, () => {
      this.spinner.hide();
      this.toastr.error("Error fetching fuels!");
    });
  }

  public showModalCarCreate(): void {
    this.modalCarCreate = true;
  }

  public hideModalCarCreate(canClose: boolean = true): void {
    if(canClose) {
      this.modalCarCreate = false;
    }
  }

  public saveAddChanges(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      this.toastr.warning("Please fill out all required fields correctly");
      return;
    }

    const vehicleCreateModel = new Vehicle();
    vehicleCreateModel.name = this.myForm.value.name;
    vehicleCreateModel.model = this.myForm.value.model;
    vehicleCreateModel.manufacturerId = this.myForm.value.manufacturer;
    vehicleCreateModel.fuelTypeId = this.myForm.value.fuelType;
    vehicleCreateModel.fuelCapacity = this.myForm.value.fuelCapacity;
    vehicleCreateModel.description = this.myForm.value.description;

    this.vehicleService.postVehicle(vehicleCreateModel).subscribe({
      next: (response: Vehicle) => {
        this.toastr.success("Vehicle successfully added!");
        this.vehicles.push(response);
        this.resetForm();
        this.hideModalCarCreate(true);
        this.onVehicleChange(response.id);
      },
      error: () => {
        this.toastr.warning("Error while adding vehicle!");
      },
    });
  }

  public getSelectedVehicleName(): string {
    const selectedVehicle = this.vehicles.find((v) => v.id === this.vehicleId);
    return selectedVehicle ? selectedVehicle.name : "Select a vehicle";
  }

  public onVehicleChange(vehicleId: number): void {
    this.store.dispatch(changeVehicle({ vehicleId }));
    this.setVehicleId(vehicleId);
  }

  private initializeForm(): void {
    this.myForm = this.fb.group({
      name: ["", [Validators.required, Validators.maxLength(20)]],
      model: ["", [Validators.required, Validators.maxLength(20)]],
      manufacturer: [null, Validators.required],
      fuelType: [null, Validators.required],
      fuelCapacity: [0, [Validators.required, Validators.min(1)]],
      description: [""],
    });
  }

  private loadVehicleId(): Promise<void> {
    return new Promise((resolve) => {
      this.route.paramMap.subscribe((params) => {
        const vehicleIdParam = params.get("vehicleId");
        if (vehicleIdParam) {
          this.vehicleId = +vehicleIdParam;
        } else {
          const savedVehicleId = this.getVehicleId();
          if (savedVehicleId) {
            this.setVehicleId(+savedVehicleId);
          }
        }
        resolve();
      });
    });
  }

  private loadVehiclesBasedOnId(): void {
    if (this.vehicleId === 0) {
      this.getVehicles(true);
    } else {
      this.getVehicles();
    }
  }

  private subscribeToVehicleDeletion(): void {
    this.vehicleService
      .getVehicleDeletedNotification()
      .subscribe((deletedVehicleId: number) => {
        this.vehicles = this.vehicles.filter(
          (vehicle) => vehicle.id !== deletedVehicleId
        );
        
        if (this.vehicleId === deletedVehicleId) {
          if (this.vehicles.length > 0) {
            this.onVehicleChange(this.vehicles[0].id);
          } else {
            this.vehicleId = 0;
          }
        }
        this.getVehicles();
      });
  }

  private setVehicleId(vehicleId: number): void {
    this.vehicleId = vehicleId;
    localStorage.setItem("selectedVehicleId", this.vehicleId.toString());
    this.router.navigate(["/vehicle", this.vehicleId, "history"], {
      onSameUrlNavigation: "reload",
    });
    this.store.dispatch(changeVehicle({ vehicleId }));
  }

  private getVehicleId(): string | null {
    return localStorage.getItem("selectedVehicleId");
  }

  private resetForm(): void {
    this.myForm.reset({
      name: "",
      model: "",
      manufacturer: null,
      fuelType: null,
      fuelCapacity: 0,
      description: "",
    });
  }
}
