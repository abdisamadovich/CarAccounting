import { RecordService } from '@@services/services/record/record.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecordGetAllModel } from '@api/models/record/record.get-all.model';
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
    private toastr: ToastrService
  ) {}

  public records: RecordGetAllModel[] = [];
  public vehicleId: number = 1;
  public offset: number = 0;
  public limit: number = 10;

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.vehicleId = +params.get('vehicleId')!;
      this.getRecords();
    });
  }

  public getRecords(): void {
    this.record.getRecords(this.vehicleId, this.offset, this.limit).subscribe(
      (data) => (this.records = data),
      (error) => this.toastr.warning('No records!')
    );
  }
}
