import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.less'
})
export class LayoutComponent {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  public vehicleId: number | null = null;
  public name: string = "";
  public routes: { label: string, value: string }[] = []

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params["vehicleId"]) {
        this.vehicleId = +params["vehicleId"];
      } else {
        const savedVehicleId = localStorage.getItem("selectedVehicleId");
        if (savedVehicleId) {
          this.vehicleId = +savedVehicleId;
          this.router.navigate(["/vehicle", this.vehicleId, "history"]);
          this.updateRoutes()
        }
      }
    });
  }

  public isActive(route: string): boolean {
    return this.router.url === route;
  }

  public updateRoutes(): void {
    this.routes = [
      {
        label: "History",
        value: `/vehicle/${this.vehicleId}/history`
      },
      {
        label: "Add Refuelling",
        value: `/vehicle/${this.vehicleId}/refueling`
      },
      {
        label: "Add Service",
        value: `/vehicle/${this.vehicleId}/service`
      },
      {
        label: "Add Expense",
        value: `/vehicle/${this.vehicleId}/expense`
      },
      {
        label: "Delete Car",
        value: `/delete-car`
      }
    ];
  }
}
