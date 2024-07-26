import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.less',
})
export class FooterComponent {

  constructor(private router: Router) {}
  public vehicleId: number = 0;

  public setVehicleId(id: number): void {
    this.vehicleId = id;
    localStorage.setItem('vehicleId', id.toString());
  }
  
  public goToHistory(): void {
    this.router.navigate(['/vehicle', this.vehicleId, 'history']);
  }
}
