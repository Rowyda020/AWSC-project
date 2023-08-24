import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../services/api.service';
import { StrEmployeeExchangeDialogComponent } from '../str-employee-exchange-dialog/str-employee-exchange-dialog.component';

@Component({
  selector: 'app-str-employee-exchange-container',
  templateUrl: './str-employee-exchange-container.component.html',
  styleUrls: ['./str-employee-exchange-container.component.css']
})
export class StrEmployeeExchangeContainerComponent implements OnInit{
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private api: ApiService){}

  ngOnInit(): void {
  }

  openEmployeeExchangeDialog() {
    this.dialog.open(StrEmployeeExchangeDialogComponent, {
      width: '100%'
    }).afterClosed().subscribe(val => {
      if (val === 'save') {
      }
    })
  }

}
