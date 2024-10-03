import { ServiceService, ServiceTypeService } from '@@services/services';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Service, ServiceType } from '@@services/models';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrl: './service.component.less',
})
export class ServiceComponent {
  //Inject
  constructor(
    private serviceService: ServiceService,
    private serviceTypeService: ServiceTypeService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.vehicleId = +params.get('vehicleId')!;
    });
    this.getServiceType();
  }

  public vehicleId: number = 0;
  // Service
  public id: number = 0;
  public date: Date = new Date();
  public format = "MM/dd/yyyy HH:mm";
  public odometer: number = 0;
  public serviceTypeId: number = 0;
  public place: string = '';
  public price: number = 0;
  public notes: string = '';
  // Servicetype
  public name: string = '';
  public serviceTypes: ServiceType[] = [];
  //For ModalWindow
  public modalServiceTypeCreate: boolean = false;
  // Variables for error
  public nameError: string = "";
  public odometerError: string = "";
  public serviceTypeError: string = "";
  public priceError: string = "";
  public placeError: string = "";
  public notesError: string = "";

  public showModalServiceTypeCreate(): void {
    this.modalServiceTypeCreate = true;
  }

  public hideModalServiceTypeCreate(): void {
    this.modalServiceTypeCreate = false;
  }

  // ServiceType
  public getServiceType(): void {
    this.serviceTypeService.getServiceTypes().subscribe((res) => {
      this.serviceTypes = res;
    });
  }

  public saveAddServiceChanges(): void {
    this.place = this.place.trim();
    this.notes = this.notes.trim();
    if (
      !this.validatFormService(
        this.odometer,
        this.serviceTypeId,
        this.price,
        this.place
      )
    ) {
      return;
    }
    const serviceCreateModel = new Service();
    (serviceCreateModel.vehicleId = this.vehicleId),
      (serviceCreateModel.date = this.date),
      (serviceCreateModel.odometer = this.odometer),
      (serviceCreateModel.serviceTypeId = this.serviceTypeId),
      (serviceCreateModel.price = this.price),
      (serviceCreateModel.place = this.place),
      (serviceCreateModel.notes = this.notes),
      this.serviceService.postService(serviceCreateModel).subscribe({
        next: (response) => {
          this.toastr.success('Succes add Service!');
          this.router.navigate(['/vehicle', this.vehicleId, 'history']);
        },
        error: (err) => {
          this.toastr.warning('Error during add!');
        },
      });

    this.modalServiceTypeCreate = false;
  }

  public cancel(): void {
    this.router.navigate(['/vehicle', this.vehicleId, 'history']);
  }

  public saveAddServiceTypeChanges(): void {
    this.name = this.name.trim();
    if (
      this.serviceTypes.some(
        (serviceType) =>
          serviceType.name.toLowerCase() === this.name.toLowerCase()
      )
    ) {
      this.toastr.warning("Service type with the same name already exists!");
      return;
    }

    if (!this.validateFormServiceType(this.name)) {
      return;
    }
    const servicetypeCreateModel = new ServiceType();
    servicetypeCreateModel.name = this.name;
    this.serviceTypeService.postServiceType(servicetypeCreateModel).subscribe({
      next: (response) => {
        this.toastr.success('Succes add ServiceType!');
        this.resetServiceType();
        this.getServiceType();
        this.hideModalServiceTypeCreate();
      },
      error: (err) => {
        this.toastr.warning('Error during add!');
        this.resetServiceType();
        this.getServiceType();
      },
    });
  }

  public onInputChangeService(field: string): void {
    switch (field) {
      case "odometer":
        if (this.odometer >= 0) {
          this.odometerError = "";
        }
        break;
      case "service":
        if (this.serviceTypeId && this.serviceTypeId != 0) {
          this.serviceTypeError = "";
        }
        break;
      case "price":
        if (this.price >= 0) {
          this.priceError = "";
        }
        break;
      case "place":
        if (this.place && this.place.trim() !== "") {
          this.placeError = "";
        }
        break;
    }
  }

  public onInputChangeServiceType(field: string): void {
    switch (field) {
      case "name":
        if (this.name.trim()) {
          this.nameError = "";
        }
        break;
    }
  }

  private resetServiceType(): void {
    this.name = '';
  }

  // ValidateForm
  private validatFormService(
    odometer: number,
    serviceTypeId: number,
    price: number,
    place: string
  ): boolean {
    let isValid = true;

    if (odometer < 0) {
      this.odometerError = "Odometer cannot be a negative value!";
      isValid = false;
    }

    if (!serviceTypeId) {
      this.serviceTypeError = "Service is required!";
      isValid = false;
    }

    if (price < 0) {
      this.priceError = "Price cannot be a negative value!";
      isValid = false;
    }

    if (!place || place.trim() === "") {
      this.placeError = "Place is required!";
      isValid = false;
    }

    return isValid;
  }

  //Validate form service type
  private validateFormServiceType(name: string): boolean {
    let isValid = true;

    if (!name.trim()) {
      this.nameError = "Name is required and cannot be empty!";
      isValid = false;
    } else if (name.length > 30) {
      this.nameError = "Name cannot exceed 30 characters";
      isValid = false;
    } else {
      this.nameError = "";
    }

    return isValid;
  }
}
