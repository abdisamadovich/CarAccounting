import { ServiceService, ServiceTypeService } from '@@services/services';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    private route: ActivatedRoute
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
          this.resetService();
        },
        error: (err) => {
          this.toastr.warning('Error during add!');
          this.resetService();
        },
      });

    this.modalServiceTypeCreate = false;
  }

  public saveAddServicetypeChanges(): void {
    const servicetypeCreateModel = new ServiceType();
    servicetypeCreateModel.name = this.name;
    this.serviceTypeService.postServiceType(servicetypeCreateModel).subscribe({
      next: (response) => {
        this.toastr.success('Succes add ServiceType!');
        this.resetServiceType();
        this.getServiceType();
      },
      error: (err) => {
        this.toastr.warning('Error during add!');
        this.resetServiceType();
        this.getServiceType();
      },
    });
  }

  private resetService(): void {
    this.date = new Date();
    this.odometer = 0;
    this.serviceTypeId = 0;
    this.price = 0;
    this.place = '';
    this.notes = '';
  }

  private resetServiceType(): void {
    this.name = '';
  }
}
