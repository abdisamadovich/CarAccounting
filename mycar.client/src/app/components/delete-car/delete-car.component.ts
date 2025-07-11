import { Component, OnInit, TemplateRef } from '@angular/core';
import { ManufacturerService, VehicleService } from '@@services/services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Manufacturer, Vehicle } from '@@services/models';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-more',
  templateUrl: './delete-car.component.html',
  styleUrl: './delete-car.component.less',
})
export class DeleteCarComponent implements OnInit {
  public vehicles: Vehicle[] = [];
  public manufacturers: Manufacturer[] = [];
  public vehicleId: number | null = null;
  public vehicleName: string = "";

  constructor(
    private vehicleService: VehicleService,
    private manufacturerService: ManufacturerService,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.getVehicles();
    this.getManufacturers();
  }

  public getVehicles(): void {
    this.spinner.show();
    this.vehicleService.getVehicle().subscribe(
      (res) => {
        this.vehicles = res;
        this.spinner.hide();                                                        
      },
      (error) => {
        this.spinner.hide(); 
        this.toastr.error("Error fetching vehicles!"); 
      }
    );
  }

  public getManufacturers(): void {
    this.spinner.show();
    this.manufacturerService.getManufacturers().subscribe((res) => {
      this.manufacturers = res;
    });
    this.spinner.hide();
  }

  public getManufacturerName(manufacturerId: number): string {
    const manufacturer = this.manufacturers.find(m => m.id === manufacturerId);
    return manufacturer ? manufacturer.name : "Unknown";
  }

  public showModalDeleteCar(
    vehicle: Vehicle,
    modal: TemplateRef<any>
  ): void {
    this.vehicleId = vehicle.id;
    this.vehicleName = vehicle.name
    this.modalService.open(modal);
  }

  public hideModalDeleteCar(): void {
    this.modalService.dismissAll();
  }

  public confirmDelete(): void {
    if (this.vehicleId !== null) {
      this.deleteVehicle(this.vehicleId);
      this.hideModalDeleteCar();
    }
  }

  public deleteVehicle(id: number | null): void {
    if (id !== null) {
      this.vehicleService.deleteVehicle(id).subscribe(
        () => {
          this.vehicles = this.vehicles.filter(
            (vehicle) => vehicle.id!== id
          );
          this.toastr.success("Vehicle deleted successfully!");

          this.vehicleService.notifyVehicleDeleted(id);
        },
        (error) => {
          this.toastr.error("Failed to delete vehicle");
        }
      );
    }
  }
}
