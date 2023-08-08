

import { Component, OnInit, inject, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { StrItemDialogComponent } from '../STR_item_dialog/STR_item_dialog.component';
import { ApiService } from '../services/api.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-str-category',
  templateUrl: './STR_item.component.html',
  styleUrls: ['./STR_item.component.css']
})
export class StrItemComponent implements OnInit {
  commodity: any = {
    id: 0,
    name: ''
  }
  platoon: any = {
    id: 0,
    name: ''

  }

  commoditylist: any;
  platoonlist: any;

  // gradelist: any;
  // grade: any = {
  //   id: 0,
  //   name: ''

  // }

  title = 'Category';

  displayedColumns: string[] = ['name', 'commodityName', 'gradeName', 'platoonName', 'groupName', 'unitName'
    , 'isActive', 'type', 'action'];


  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private api: ApiService) {

  }
  ngOnInit(): void {
    this.getAllItems();
    this.api.getAllcommodity().subscribe((data: any) => {
      this.commoditylist = data;
      console.log(this.commoditylist)
    })
    this.api.getAllplatoon().subscribe((data: any) => {
      this.platoonlist = data;
      console.log(this.platoonlist)
    })
  }
  openDialog() {
    this.dialog.open(StrItemDialogComponent, {
      width: '55%'
    }).afterClosed().subscribe(val => {
      if (val === 'حفظ') {
        this.getAllItems();
      }
    });
  }

  getAllItems() {
    this.api.getItems()
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

  //   if (commidityID != '' && name == '' ){
  //     this.dataSource = res.filter((res: any)=> res.commodity==commidityID!) 
  //     this.dataSource.paginator = this.paginator;
  //     this.dataSource.sort = this.sort;
  //   }
  //   else if (commidityID != '' && name != ''){
  //     // this.dataSource = res.filter((res: any)=> res.name==name!)
  //     this.dataSource = res.filter((res: any)=> res.commodity==commidityID! && res.name==name!)
  //     this.dataSource.paginator = this.paginator;
  //     this.dataSource.sort = this.sort;
  //   }
  //   else{
  //     // this.dataSource = res.filter((res: any)=> res.commodity==commidityID! && res.name==name!)
  //     this.dataSource = res.filter((res: any)=> res.name==name!)
  //     this.dataSource.paginator = this.paginator;
  //     this.dataSource.sort = this.sort;
  //   }


  // },
  // error: (err) => {
  //   alert("Error")
  // }
  // })
  getSearchProducts(commodityId: any, platoonId: any) {

    console.log("commodityId",commodityId)
    this.api.getItems()
      .subscribe({
        next: (res) => {
          // this.dataSource = res.filter((res: any) => res.name == commodityId!)

          // this.dataSource.paginator = this.paginator;
          // this.dataSource.sort = this.sort;
          // 1-
          console.log("commodityId",res.commodityName)
          if (commodityId != '' && platoonId == '' ){

                    this.dataSource = res.filter((res: any)=> res.commodityName==commodityId! ) 

                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort = this.sort;
          }     else if (commodityId != '' && platoonId != ''){
                // this.dataSource = res.filter((res: any)=> res.name==name!)
                this.dataSource = res.filter((res: any)=> res.name==commodityId! && res.name==platoonId!)
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
              }
                else{
            this.dataSource = res.filter((res: any)=> res.name==platoonId!)
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }
        },
        error: (err) => {
          alert("Error")
        }
      })
    // this.getAllItems()
  }


  editItem(row: any) {
    console.log("edit product:",row)
    // this.productForm.removeControl('id')
    this.dialog.open(StrItemDialogComponent, {
      width: '55%',
      data: row,
      
    }).afterClosed().subscribe(val => {
      if (val === 'تحديث') {
        this.getAllItems();
      }
    })
  }

  deleteItem(id: number) {
    if (confirm("هل انت متأكد من الحذف؟")) {
      this.api.deleteItem(id)
        .subscribe({
          next: (res) => {
            alert("تم الحذف");
            this.getAllItems();
          },
          error: () => {
            alert("خطأ في الحذف")
          }
        })
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}


