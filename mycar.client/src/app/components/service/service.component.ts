import { ServiceService, ServiceTypeService } from '@@services/services';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Service, ServiceType } from '@@services/models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { SelectModel } from '@@components/models';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.less'],
})
export class ServiceComponent implements OnInit {
  public myForm!: FormGroup;
  public serviceTypeForm!: FormGroup;
  public vehicleId: number = 0;
  public selectModel: SelectModel[] = [];
  public modalServiceTypeCreate: boolean = false;

  constructor(
    private serviceService: ServiceService,
    private serviceTypeService: ServiceTypeService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService
  ) {}

  public ngOnInit(): void {
    this.myForm = this.fb.group({
      date: [new Date(), Validators.required],
      odometer: [0, [Validators.required, Validators.min(0), Validators.max(2147483647)]],
      serviceType: [null, Validators.required],
      price: [0, [Validators.required, Validators.min(0), Validators.max(99999.99)]],
      place: ["", Validators.required],
      notes: [""],
    });

    this.serviceTypeForm = this.fb.group({
      name: ["", [Validators.required, Validators.maxLength(30)]],
    });

    this.route.paramMap.subscribe((params) => {
      this.vehicleId = +params.get("vehicleId")!;
    });

    this.getServiceType();
  }

  public showModalServiceTypeCreate(): void {
    this.modalServiceTypeCreate = true;
  }

  public hideModalServiceTypeCreate(): void {
    this.modalServiceTypeCreate = false;
    this.serviceTypeForm.reset();
  }

  public getServiceType(): void {
    this.spinner.show();
    this.serviceTypeService.getServiceTypes().subscribe((res) => {
      this.selectModel = res.map((service) => ({
        label: service.name,
        value: service.id!
      }));
    });
    this.spinner.hide();
  }

  public saveAddServiceChanges(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      this.toastr.warning("Please fill out all required fields correctly.");
      return;
    }

    const serviceCreateModel = new Service();
    serviceCreateModel.vehicleId = this.vehicleId;
    serviceCreateModel.date = this.myForm.value.date;
    serviceCreateModel.odometer = this.myForm.value.odometer;
    serviceCreateModel.serviceTypeId = this.myForm.value.serviceType;
    serviceCreateModel.price = this.myForm.value.price;
    serviceCreateModel.place = this.myForm.value.place;
    serviceCreateModel.notes = this.myForm.value.notes;

    this.spinner.show();
    this.serviceService.postService(serviceCreateModel).subscribe({
      next: () => {
        this.toastr.success("Successfully added Service!");
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

  public saveAddServiceTypeChanges(): void {
    if (this.serviceTypeForm.invalid) {
      this.serviceTypeForm.markAllAsTouched();
      this.toastr.warning("Service type name is required and must not exceed 30 characters.");
      return;
    }

    const serviceTypeCreateModel = new ServiceType();
    serviceTypeCreateModel.name = this.serviceTypeForm.value.name;

    this.spinner.show();
    if (
      this.selectModel.some(
        (serviceType) => String(serviceType["value"]).toLowerCase() === serviceTypeCreateModel.name.toLowerCase()
      )
    ) {
      this.toastr.warning("Service type with the same name already exists!");
      return;
    }
    
    this.serviceTypeService.postServiceType(serviceTypeCreateModel).subscribe({
      next: () => {
        this.toastr.success("Successfully added service type!");
        this.getServiceType();
        this.hideModalServiceTypeCreate();
        this.spinner.show();
      },
      error: () => {
        this.toastr.warning("Error during adding!");
        this.getServiceType();
        this.spinner.show();
      },
    });
  }
}
