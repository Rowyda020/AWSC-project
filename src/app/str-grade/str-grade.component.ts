import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { STRGradeDialogComponent } from '../str-grade-dialog/str-grade-dialog.component';
import { ApiService } from '../services/api.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
@Component({
  selector: 'app-str-grade',
  templateUrl: './str-grade.component.html',
  styleUrls: ['./str-grade.component.css']
})
export class STRGradeComponent {
title = 'Angular13Crud';
  //define table fields which has to be same to api fields
  displayedColumns: string[] = [ 'code','name', 'commodityName','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  commidityDt:any={
    id:0,
  
  }
  commidityList:any=[];
  constructor(private dialog: MatDialog, private api: ApiService) {

  }
  ngOnInit(): void {

    // console.log(productForm)

    this.getAllGrades();

    this.api.getAllCommodity().subscribe((tododata) =>{
      this.commidityList = tododata;
    });

  }
  openDialog() {
    this.dialog.open(STRGradeDialogComponent, {
      width: '30%'
    }).afterClosed().subscribe(val => {
      if (val === 'save') {
        this.getAllGrades();
      }
    });
  }

  getAllGrades() {
    this.api.getGrade()
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

  editGrade(row: any) {
    this.dialog.open(STRGradeDialogComponent, {
      width: '30%',
      data: row
    }).afterClosed().subscribe(val => {
      if (val === 'update') {
        this.getAllGrades();
      }
    })
  }

deleteGrade(id:number){
  if(confirm("Are you sure to delete ")) {
    console.log("Implement delete functionality here");
  }
this.api.deleteGrade(id)
.subscribe({
next:(res)=>{
alert("تم الحذف بنجاح");
this.getAllGrades();
},
error:()=>{
  alert("خطأ فى حذف العنصر")
}
})
}


getSearchGrades(commidityID:any,name:any) {
  if(commidityID != ''){
    if(commidityID.id == 0){
      commidityID = '';

    }
  }
console.log("com id: ", commidityID, "name: ", name );

  this.api.getGrade()
    .subscribe({
      next: (res) => {
        // 1-
        console.log(res )
        if (commidityID != '' && name == '' ){
          console.log("enter id only: ", "res : ", res, "input id: ", commidityID)
          this.dataSource = res.filter((res: any)=> res.commodityId==commidityID!) 
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
        else if (commidityID != '' && name != ''){
          console.log("enter name & id: ", "res : ", res, "input name: ", name, "id: ", commidityID)
          // this.dataSource = res.filter((res: any)=> res.name==name!)
          this.dataSource = res.filter((res: any)=> res.commodityId==commidityID! && res.name.toLowerCase().includes(name.toLowerCase()))
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
        else{
          console.log("enter name only: ", "res name: ", res, "input name: ", name)
          // this.dataSource = res.filter((res: any)=> res.commodity==commidityID! && res.name==name!)
          this.dataSource = res.filter((res: any)=> res.name.toLowerCase().includes(name.toLowerCase()))
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      
        
      },
      error: (err) => {
        alert("Error")
      }
    })
    // this.getAllGrades()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }}

  }
