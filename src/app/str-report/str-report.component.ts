import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ApiService } from '../services/api.service';
import { DatePipe } from '@angular/common';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-str-report',
  templateUrl: './str-report.component.html',
  styleUrls: ['./str-report.component.css'],
  providers: [DatePipe],
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

  myDate: any = new Date();

  reportLocal: any;

  pagesNumber: number = 0;
  pageNumber: number = 1;
  pageSize: number = 2;
  pageData: [] = [];

  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private api: ApiService, private datePipe: DatePipe) {
    this.myDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
  }

  ngOnInit(): void {
    this.loadReportData();
  }

  loadReportData() {
    // console.log(this.api.reportData);
    let reportFooter: any = document.getElementById('reportFooter');
    reportFooter.style.display = 'none';
    let local: any = localStorage.getItem('reportData');
    // console.log(local);
    this.reportLocal = JSON.parse(local);
    // // console.log(this.reportLocal);
    // this.pagesNumber = this.reportLocal.length / this.pageSize;
    // // console.log(this.pagesNumber);
    // this.pageData = this.reportLocal.slice(
    //   this.pageNumber - 1,
    //   this.pageNumber * this.pageSize
    // );
    // let report: any = this.pageData;
    // this.dataSource = new MatTableDataSource(report);
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;

    //  All Data

    let report: any = this.reportLocal;
    this.dataSource = new MatTableDataSource(report);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // loadAllData() {
  //   let local: any = localStorage.getItem('reportData');
  //   this.reportLocal = JSON.parse(local);
  //   let report: any = this.reportLocal;
  //   this.dataSource = new MatTableDataSource(report);
  //   this.dataSource.paginator = this.paginator;
  //   this.dataSource.sort = this.sort;
  //
  // }

  printReport() {
    // this.loadAllData();
    let reportFooter: any = document.getElementById('reportFooter');
    let date: any = document.getElementById('date');
    reportFooter.style.display = 'block';
    date.style.display = 'block';
    // let printContent: any = document.getElementById('content')?.innerHTML;
    // let originalContent: any = document.body.innerHTML;
    // document.body.innerHTML = printContent;
    // // console.log(document.body.children);
    // document.body.style.cssText =
    //   'direction:rtl;-webkit-print-color-adjust:exact;';
    window.print();
    // document.body.innerHTML = originalContent;
    // location.reload();
  }

  first() {
    this.pageNumber = 1;
    this.pageData = this.reportLocal.slice(
      (this.pageNumber - 1) * this.pageSize,
      this.pageNumber * this.pageSize
    );
    let data: any = this.pageData;
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  back() {
    if (this.pageNumber > 1) {
      this.pageNumber = this.pageNumber - 1;
      // console.log(this.pageNumber);
      this.pageData = this.reportLocal.slice(
        (this.pageNumber - 1) * this.pageSize,
        this.pageNumber * this.pageSize
      );
      let data: any = this.pageData;
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  next() {
    if (this.pageNumber < this.pagesNumber) {
      this.pageNumber = this.pageNumber + 1;
      console.log(this.pageNumber);
      this.pageData = this.reportLocal.slice(
        (this.pageNumber - 1) * this.pageSize,
        this.pageNumber * this.pageSize
      );
      let data: any = this.pageData;
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  last() {
    this.pageNumber = this.pagesNumber;
    // console.log(this.pageNumber);
    this.pageData = this.reportLocal.slice(
      (this.pageNumber - 1) * this.pageSize,
      this.pageNumber * this.pageSize
    );
    let data: any = this.pageData;
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
