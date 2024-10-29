import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.less'
})
export class LayoutComponent implements OnInit {
  private vehicleIdSubject = new BehaviorSubject<number | null>(null); 
  public vehicleId$ = this.vehicleIdSubject.asObservable();
  public vehicleId: number | null = null;  

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    const savedVehicleId = localStorage.getItem("selectedVehicleId");
    if (savedVehicleId) {
      this.updateVehicleId(+savedVehicleId); 
    }

    this.activeRoute.paramMap.subscribe((params: ParamMap) => {
      const paramVehicleId = params.get("vehicleId");
      if (paramVehicleId) {
        this.updateVehicleId(+paramVehicleId);
      }
    });

    this.vehicleId$.subscribe((vehicleId) => {
      if (vehicleId !== null) {
        this.vehicleId = vehicleId;
        this.cdr.detectChanges();
      }
    });
  }

  public isActive(route: string): boolean {
    return this.router.url.endsWith(route);
  }

  private updateVehicleId(vehicleId: number): void { 
    if (this.vehicleIdSubject.value !== vehicleId) {
      this.vehicleIdSubject.next(vehicleId);
      localStorage.setItem("selectedVehicleId", vehicleId.toString()); 
      this.router.navigate(["/vehicle", vehicleId, "history"]);
    }
  }
}
