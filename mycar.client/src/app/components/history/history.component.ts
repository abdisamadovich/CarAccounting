import { RecordService } from '@@services/services';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecordModel, RecordType } from '@api/models';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrl: './history.component.less',
})
export class HistoryComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private record: RecordService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  public records: RecordModel[] = [];
  public vehicleId: number = 1;
  public offset: number = 0;
  public limit: number = 10;

  ngOnInit(): void {
    this.spinner.show();
    this.route.paramMap.subscribe((params) => {
      const vehicleIdParam = +params.get('vehicleId')!;
      if (vehicleIdParam) {
        this.vehicleId = vehicleIdParam;
      } else {
        this.vehicleId = +localStorage.getItem('vehicleId')! || 0;
      }
      if (this.vehicleId) {
        this.getRecords();
      } else {
        this.toastr.warning('Vehicle ID is not set!');
      }
    });

    setTimeout(() => {
      this.spinner.hide();
    }, 3000);
  }

  public getRecords(): void {
    this.record.getRecords(this.vehicleId).subscribe(
      (data) => (this.records = data),
      (error) => this.toastr.warning('No records!')
    );
  }

  public getRecordTypeName(type: number): string {
    switch (type) {
      case RecordType.Expense:
        return 'Expense';
      case RecordType.Service:
        return 'Service';
      case RecordType.Refueling:
        return 'Refueling';
      default:
        return 'Unknown';
    }
  }
}
