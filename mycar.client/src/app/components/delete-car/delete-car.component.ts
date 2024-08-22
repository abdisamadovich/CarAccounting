import { Vehicle } from '@@services/models';
import { VehicleService } from '@@services/services';
import { Component } from '@angular/core';

@Component({
  selector: 'app-more',
  templateUrl: './delete-car.component.html',
  styleUrl: './delete-car.component.less',
})
export class DeleteCarComponent {
  constructor(private vehicleService: VehicleService) {}

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

  public deleteVehicle(id: number | null): void {
    if (id !== null) {
      this.vehicleService.deleteVehicle(id).subscribe(() => {
        this.vehicles = this.vehicles.filter(vehicle => vehicle.id !== id);
      });
    }
  }
}
