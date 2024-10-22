import { Vehicle, Manufacturer, Fuel, FuelType } from '@@services/models';
import { VehicleService, ManufacturerService, FuelTypeService } from '@@services/services';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { SelectModel } from '@@components/models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.less',
})
export class HeaderComponent implements OnInit {
  public expenseForm!: FormGroup;
  public vehicles: Vehicle[] = [];
  public selectModel: SelectModel[] = [];
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
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.expenseForm = this.fb.group({
      name: ["", [Validators.required, Validators.maxLength(20)]],
      model: ["", [Validators.required, Validators.maxLength(20)]],
      manufacturer: [null, Validators.required],
      fuelType: [null, Validators.required],
      fuelCapacity: [0, [Validators.required, Validators.min(1)]],
      description: [""],
    });

    this.route.paramMap.subscribe((params) => {
      const vehicleIdParam = params.get("vehicleId");
      if (vehicleIdParam) {
        this.vehicleId = +vehicleIdParam;
      } else {
        const savedVehicleId = localStorage.getItem("selectedVehicleId");
        if (savedVehicleId) {
          this.vehicleId = +savedVehicleId;
          this.router.navigate(["/vehicle", this.vehicleId, "history"]);
        }
      }
    });
    this.getVehicles();
    this.getManufacturers();
    this.getFuelType();
  }

  public getVehicles(): void {
    this.spinner.show();
    this.vehicleService.getVehicle().subscribe((res) => {
      this.vehicles = res;
    });
    this.spinner.hide();
  }

  public getManufacturers(): void {
    this.spinner.show();
    this.manufacturerService.getManufacturers().subscribe((res) => {
      this.selectModel = res.map(Manufacturer => ({
        label: Manufacturer.name,
        value: Manufacturer.id!
      }))
    });
    this.spinner.hide();
  }

  public getFuelType(): void {
    this.spinner.show(); 
    this.fuelTypeService.getFuelTypes().subscribe((res) => {
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
  public showModalCarCreate(): void {
    this.modalCarCreate = true;
  }

  public hideModalCarCreate(): void {
    this.modalCarCreate = false;
  }

  public saveAddChanges(): void {
    if (this.expenseForm.invalid) {
      this.expenseForm.markAllAsTouched();
      this.toastr.warning("Please fill out all required fields correctly");
      return;
    }

    const vehicleCreateModel = new Vehicle();
    vehicleCreateModel.name = this.expenseForm.value.name;
    vehicleCreateModel.model = this.expenseForm.value.model;
    vehicleCreateModel.manufacturerId = this.expenseForm.value.manufacturer;
    vehicleCreateModel.fuelTypeId = this.expenseForm.value.fuelType;
    vehicleCreateModel.fuelCapacity = this.expenseForm.value.fuelCapacity;
    vehicleCreateModel.description = this.expenseForm.value.description;

    this.vehicleService.postVehicle(vehicleCreateModel).subscribe({
      next: (response: Vehicle) => {
        this.toastr.success("Vehicle successfully added!");
        this.vehicleId = response.id!;
        localStorage.setItem('selectedVehicleId', this.vehicleId.toString());
        this.router.navigate(["/vehicle", this.vehicleId, "history"]);
        this.resetForm();
        this.hideModalCarCreate();
      },
      error: () => {
        this.toastr.warning("Error while adding vehicle!");
      }
    });
  }

  public resetForm(): void {
    this.expenseForm.reset({
      name: "",
      model: "",
      manufacturer: null,
      fuelType: null,
      fuelCapacity: 0,
      description: "",
    });
  }

  public cancel(): void {
    this.router.navigate(["/vehicle", this.vehicleId, "history"]);
  }

  public getSelectedVehicleName(): string {
    const selectedVehicle = this.vehicles.find(v => v.id === this.vehicleId);
    return selectedVehicle ? selectedVehicle.name : "Select a vehicle";
  }

  public onVehicleChange(vehicleId: number): void {
    this.vehicleId = vehicleId;
    localStorage.setItem("selectedVehicleId", this.vehicleId.toString());
    this.router.navigate(["/vehicle", this.vehicleId, "history"]);
  }
}
