import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-str-report-add-item',
  templateUrl: './str-report-add-item.component.html',
  styleUrls: ['./str-report-add-item.component.css'],
  providers: [DatePipe],
})
export class StrReportAddItemComponent {
  myDate: any = new Date();

  constructor(private api: ApiService, private datePipe: DatePipe) {
    this.myDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
  }
}
