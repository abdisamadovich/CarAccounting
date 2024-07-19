import { ServiceCreate } from '@@services/models/service/service-create.view-model';
import { ServiceTypeCreate } from '@@services/models/service-type/service-type.create.view-model';
import { ServiceTypeGetAll } from '@@services/models/service-type/service-type.get-all.view-model';
import { ServiceService } from '@@services/services/service/service.service';
import { ServiceTypeService } from '@@services/services/service-type/service-type.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
