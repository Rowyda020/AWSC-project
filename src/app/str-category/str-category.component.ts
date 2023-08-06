

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { StrCategoryDialogComponent } from '../str-category-dialog/str-category-dialog.component';
import { ApiService } from '../services/api.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-str-category',
  templateUrl: './str-category.component.html',
  styleUrls: ['./str-category.component.css']
})
export class StrCategoryComponent implements OnInit {
  title = 'Category';

  displayedColumns: string[] = ['productName', 'Num', 'commodity', 'grade', 'platon','group','unit'
  ,'type','relation', 'action'];


  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private api: ApiService) {

  }
  ngOnInit(): void {
    this.getAllProducts();
  }
  openDialog() {
    this.dialog.open(StrCategoryDialogComponent, {
      width: '55%'
    }).afterClosed().subscribe(val => {
      if (val === 'حفظ') {
        this.getAllProducts();
      }
    });
  }

  getAllProducts() {
    this.api.getProduct()
      .subscribe({
        next: (res) => {
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: (err) => {
          alert("Error")
        }
      })
  }

  editProduct(row: any) {
    this.dialog.open(StrCategoryDialogComponent, {
      width: '55%',
      data: row
    }).afterClosed().subscribe(val => {
      if (val === 'تحديث') {
        this.getAllProducts();
      }
    })
  }

deleteProduct(id:number){
this.api.deleteProduct(id)
.subscribe({
next:(res)=>{
alert("تم الحذف");
this.getAllProducts();
},
error:()=>{
  alert("خطأ في الحذف")
}
})
}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}


