import { VehicleGetAll } from '@@services/models/vehicle/vehicle.get-all.view-model';
import { VehicleService } from '@@services/services/vehicle/vehicle.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.less',
})
export class HeaderComponent {
  public selectedVehicleId: number | null = null;
  constructor(private vehicleService: VehicleService) {}

  public vehicles: VehicleGetAll[] = [];
  public onVehicleChange(event: any): void {
    this.selectedVehicleId = event.target.value;
  }

  public getVehicle(): void {
    this.vehicleService.getVehicle().subscribe((res) => {
      this.vehicles = res;
    });
  }
}
