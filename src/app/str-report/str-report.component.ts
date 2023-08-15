import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-str-report',
  templateUrl: './str-report.component.html',
  styleUrls: ['./str-report.component.css'],
})
export class StrReportComponent {
  displayedColumns: string[] = [
    'name',
    'commodityName',
    'gradeName',
    'platoonName',
    'groupName',
    'unitName',
    'isActive',
    'type',
  ];

  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadReportData();
  }

  loadReportData() {
    console.log(this.api.reportData);
    let report: any = this.api.reportData;
    this.dataSource = new MatTableDataSource(report);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
