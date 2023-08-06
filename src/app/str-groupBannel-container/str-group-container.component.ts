import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { ApiService } from '../services/api.service';
import { StrGroupFormComponent } from '../str-groupBannel-form/str-group-form.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-str-group-container',
  templateUrl: './str-group-container.component.html',
  styleUrls: ['./str-group-container.component.css']
})
export class StrGroupContainerComponent implements OnInit{
  displayedColumns: string[] = ['groupCode','groupName', 'groupCommdityCode', 'groupCommdity', 'action'];

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private api: ApiService){}

  ngOnInit(): void {
    this.getAllGroups();
  }

  openGroupDialog() {
    this.dialog.open(StrGroupFormComponent, {
      width: '70%'
    }).afterClosed().subscribe(val => {
      if (val === 'save') {
        this.getAllGroups();
      }
    })
  }

  getAllGroups() {
    this.api.getGroup()
      .subscribe({
        next: (res) => {
          // console.log("response of get all getGroup from api: ", res);
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: () => {
          alert("خطأ أثناء جلب سجلات المجموعة !!");
        }
      })
  }
}
