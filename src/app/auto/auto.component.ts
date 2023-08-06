import { Component, OnInit, ViewChild } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { AutoDialogComponent } from '../auto-dialog/auto-dialog.component';
import { ApiService } from '../services/api.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-auto',
  templateUrl: './auto.component.html',
  styleUrls: ['./auto.component.css']
})
export class AutoComponent {
  // title = 'angular13crud';
  // displayedColumns: string[] = ['platoonId', 'platoonName', 'grad', 'subGrad', 'action'];
  // dataSource!: MatTableDataSource<any>;

  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  // @ViewChild(MatSort) sort!: MatSort;
  // constructor(private dialog : MatDialog, private api : ApiService){}
  // ngOnInit(): void {
  //   this.getAllProducts();
  // }
  // openDialog() {
  //   this.dialog.open(AutoDialogComponent, {
  //     width: '30%'
  //   }).afterClosed().subscribe(val=>{
  //     if(val === 'save'){
  //       this.getAllProducts();
  //     }
  //   })
  // }
  // getAllProducts(){
  //   this.api.getProduct()
  //   .subscribe({
  //     next:(res)=>{
  //       this.dataSource = new MatTableDataSource(res);
  //       this.dataSource.paginator = this.paginator;
  //       this.dataSource.sort = this.sort;
  //     },
  //     error:(err)=>{
  //       alert("error while fetching the records!!");
  //     }
      
  //   })
  // }
  // editProduct(row : any){
  //   this.dialog.open(AutoDialogComponent,{
  //     width:'30%',
  //     data:row
  //   }).afterClosed().subscribe(val=>{
  //     if(val === 'update'){
  //       this.getAllProducts();
  //     }
  //   })
  // }
  // daleteProduct(id:number){
  //   this.api.deleteProduct(id)
  //   .subscribe({
  //     next:(res)=>{
  //       alert("Product deleted successfully");
  //       this.getAllProducts();
  //     },
  //     error:()=>{
  //       alert("error while deleting the product!!")
  //     }
  //   })
  // }
  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();

  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }
}


