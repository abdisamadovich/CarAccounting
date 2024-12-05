import { ExpenseService, RecordService, RefuellingService, ServiceService } from '@@services/services';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecordModel, RecordType } from '@api/models';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrl: './history.component.less',
})
export class HistoryComponent implements OnInit {
  @ViewChild('deleteRecordModal') deleteRecordModal!: TemplateRef<any>;
  private recordToDelete!: RecordModel;

  constructor(
    private expenseService: ExpenseService,
    private refuellingService: RefuellingService,
    private serviceService: ServiceService,
    private route: ActivatedRoute,
    private record: RecordService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal
  ) {}

  public records: RecordModel[] = [];
  public vehicleId: number = 1;
  public offset: number = 0;
  public limit: number = 5;
  public totalPages: number = 0;
  public currentPage: number = 1;
  public totalItems: number = 0;
  public recordTypeName!: string;

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

  public showModalDeleteRecord(record: RecordModel): void {
    this.recordToDelete = record;
    this.recordTypeName = this.getRecordTypeName(record.recordType);
    this.modalService.open(this.deleteRecordModal);
  }
  
  public hideModalDeleteRecord(): void {
    this.modalService.dismissAll(); 
  }

  public confirmDelete(): void {
    this.deleteRecord(this.recordToDelete);
    this.hideModalDeleteRecord();
  }

  public deleteRecord(record: RecordModel): void {
    this.deleteRecordById(record.recordType, record.recordId);
  }

  public getRecords(): void {
    this.spinner.show();
    this.record.getRecords(this.vehicleId, this.offset, this.limit).subscribe({
      next: data => {
        this.records = data.records;
        this.totalPages = data.pagination.totalPages;
        this.totalItems = data.pagination.totalItems;
        this.currentPage = data.pagination.currentPage;
        this.spinner.hide();
      },
      error: () => {
        this.toastr.warning('No records!');
        this.spinner.hide();
      }
    });
  }

  public goToPage(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.offset = (pageNumber - 1) * this.limit;
      this.getRecords();
    }
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

  public getPages(): (number | string)[] {
    const totalPagesToShow = 5;
    const pages: (number | string)[] = [];
  
    if (this.totalPages <= totalPagesToShow) {
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (this.currentPage <= 3) {
        pages.push(1, 2, 3, '...', this.totalPages);
      } else if (this.currentPage >= this.totalPages - 2) {
        pages.push(1, '...', this.totalPages - 2, this.totalPages - 1, this.totalPages);
      } else {
        pages.push(1, '...', this.currentPage, this.currentPage + 1, '...', this.totalPages);
      }
    }
  
    return pages;
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

        if (this.records.length === 0 && this.currentPage > 1) {
          this.currentPage--;
          this.offset = (this.currentPage - 1) * this.limit;
        }
  
        this.getRecords();
        this.spinner.hide();
      },
      error: () => {
        this.toastr.error(`Failed to delete ${this.getRecordTypeName(recordType)}`);
        this.spinner.hide();
      }
    });
  }
}
