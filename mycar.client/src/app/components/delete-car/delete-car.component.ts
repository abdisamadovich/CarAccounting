import { Component, OnInit, TemplateRef } from '@angular/core';
import { Vehicle } from '@@services/models';
import { VehicleService } from '@@services/services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-more',
  templateUrl: './delete-car.component.html',
  styleUrl: './delete-car.component.less',
})
export class DeleteCarComponent implements OnInit {
  constructor(
    private vehicleService: VehicleService,
    private toastr: ToastrService,
    private modalService: NgbModal
  ) {}

  public vehicles: Vehicle[] = [];
  public vehicleId: number | null = null;

  ngOnInit(): void {
    this.getVehicles();
  }

  public getVehicles(): void {
    this.vehicleService.getVehicle().subscribe((res) => {
      this.vehicles = res;
    });
  }

  public showModalDeleteCar(vehicleId: number | null, modal: TemplateRef<any>): void {
    this.vehicleId = vehicleId; 
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
      this.vehicleService.deleteVehicle(id).subscribe(() => {
        this.vehicles = this.vehicles.filter(vehicle => vehicle.id !== id);
        this.toastr.success('Vehicle deleted successfully!');
      }, error => {
        this.toastr.error('Failed to delete vehicle');
      });
    }
  }
}
