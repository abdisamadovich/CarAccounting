import { ExpenseService, RecordService, RefuellingService, ServiceService } from '@@services/services';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecordModel, RecordType } from '@api/models';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrl: './history.component.less',
})
export class HistoryComponent implements OnInit {
  constructor(
    private expenseService: ExpenseService,
    private refuellingService: RefuellingService,
    private serviceService: ServiceService,
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
  }

  private deleteRecordById(recordType: RecordType, id: number): void {
    let deleteObservable: Observable<void>;
    switch (recordType) {
      case RecordType.Expense:
        deleteObservable = this.expenseService.deleteExpense(id);
        break;
      case RecordType.Refueling:
        deleteObservable = this.refuellingService.deleteRefuelling(id);
        break;
      case RecordType.Service:
        deleteObservable = this.serviceService.deleteService(id);
        break;
      default:
        this.toastr.error('Unknown record type');
        return;
    }

    this.spinner.show();
    deleteObservable.subscribe({
      next: () => {
        this.toastr.success(`${this.getRecordTypeName(recordType)} deleted`);
        this.records = this.records.filter(record => record.recordId !== id);
        this.spinner.hide();
      },
      error: () => {
        this.toastr.error(`Failed to delete ${this.getRecordTypeName(recordType)}`);
        this.spinner.hide();
      }
    });
  }

  public deleteRecord(record: RecordModel): void {
    this.deleteRecordById(record.recordType, record.recordId);
  }

  public getRecords(): void {
    this.spinner.show();
    this.record.getRecords(this.vehicleId).subscribe({
      next: data => {
        this.records = data;
        this.spinner.hide();
      },
      error: () => {
        this.toastr.warning('No records!');
        this.spinner.hide();
      }
    });
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
