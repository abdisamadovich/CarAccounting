import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { changeVehicle } from 'app/store/vehicle/vehicle.actions';
import { selectVehicleId } from 'app/store/vehicle/vehicle.selector';
import { VehicleState } from 'app/store/vehicle/vehicle.state';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.less'
})
export class LayoutComponent implements OnInit {
  public vehicleId$: Observable<number | null>;
  public vehicleIdSubject = new BehaviorSubject<number | null>(null);

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private store: Store<{ vehicle: VehicleState }>
  ) {
    this.vehicleId$ = this.store.pipe(select(selectVehicleId));
  }

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

    this.store.dispatch(
      changeVehicle({ vehicleId: savedVehicleId ? Number(savedVehicleId) : 0 })
    );
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
