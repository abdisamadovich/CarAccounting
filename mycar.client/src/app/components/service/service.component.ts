import { ServiceCreate } from '@@services/models/service/serviceCreate';
import { ServiceTypeCreate } from '@@services/models/serviceType/serviceTypeCreate';
import { ServiceTypeGetAll } from '@@services/models/serviceType/serviceTypeGetAll';
import { ServiceService } from '@@services/services/service/service.service';
import { ServiceTypeService } from '@@services/services/serviceType/serviceType.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrl: './service.component.less',
})
export class ServiceComponent {
  //Inject
  constructor(
    private serviceService: ServiceService,
    private serviceTypeService: ServiceTypeService
  ) {}

  ngOnInit(): void {
    this.getServiceType();
  }

  // Service
  public id: number = 0;
  public date: Date = new Date();
  public odometer: number = 0;
  public serviceTypeId: number = 0;
  public place: string = '';
  public price: number = 0;
  public notes: string = '';
  // Servicetype
  public name: string = '';
  public serviceTypes: ServiceTypeGetAll[] = [];
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
    const serviceCreateModel = new ServiceCreate();
    (serviceCreateModel.date = this.date),
      (serviceCreateModel.odometer = this.odometer),
      (serviceCreateModel.serviceTypeId = this.serviceTypeId),
      (serviceCreateModel.price = this.price),
      (serviceCreateModel.place = this.place),
      (serviceCreateModel.notes = this.notes),
      this.serviceService.postService(serviceCreateModel).subscribe({
        next: (response) => {
          this.resetService();
        },
        error: (err) => {
          this.resetService();
        },
      });
  }

  public saveAddServicetypeChanges(): void {
    const servicetypeCreateModel = new ServiceTypeCreate();
    servicetypeCreateModel.name = this.name;
    this.serviceTypeService.postServiceType(servicetypeCreateModel).subscribe({
      next: (response) => {
        this.resetServiceType();
        this.getServiceType();
      },
      error: (err) => {
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
