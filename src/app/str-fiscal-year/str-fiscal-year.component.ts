import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { StrFiscalYearDialogComponent } from '../str-fiscal-year-dialog/str-fiscal-year-dialog.component';
import { ApiService } from '../services/api.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-str-fiscal-year',
  templateUrl: './str-fiscal-year.component.html',
  styleUrls: ['./str-fiscal-year.component.css'],
})
export class StrFiscalYearComponent {
  title = 'angular13crud';
  displayedColumns: string[] = ['fiscalyear', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private dialog: MatDialog, private api: ApiService) {}
  ngOnInit(): void {
    this.getAllFiscal();
  }
  openDialog() {
    this.dialog
      .open(StrFiscalYearDialogComponent, {
        width: '30%',
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'save') {
          this.getAllFiscal();
        }
      });
  }
  getAllFiscal() {
    this.api.getFiscal().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        alert('خطأ عند استدعاء البيانات');
      },
    });
  }
  editunit(row: any) {
    this.dialog
      .open(StrFiscalYearDialogComponent, {
        width: '30%',
        data: row,
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'update') {
          this.getAllFiscal();
        }
      });
  }
  daleteunit(id: number) {
    if (confirm('Are you sure to delete ')) {
      console.log('Implement delete functionality here');
    }
    this.api.deleteFiscal(id).subscribe({
      next: (res) => {
        alert('تأكيد حذف الوحدة');
        this.getAllFiscal();
      },
      error: () => {
        alert('خطأ عند الحذف');
      },
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
