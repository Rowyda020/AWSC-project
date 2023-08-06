
import { Component,OnInit,ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { StrGroupDialogComponent } from '../str-group-dialog/str-group-dialog.component';
import { GlobalService } from '../services/global.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';


@Component({
  selector: 'app-str-group',
  templateUrl: './str-group.component.html',
  styleUrls: ['./str-group.component.css']

  
})

export class StrGroupComponent {
  displayedColumns: string[] = ['name', 'description','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private dialog: MatDialog,private api :GlobalService){

  }
  ngOnInit(): void {
    this.getAllGroup();
  }

 openDialog() {
  this.dialog.open(StrGroupDialogComponent, {
    width:'30%'
}).afterClosed().subscribe(val=>{
  if(val==='save'){
    this.getAllGroup();
  }
})
}
getAllGroup(){
    this.api.getGroup()
    .subscribe({
      
      next:(res)=>{
        console.log(res)
       this.dataSource = new MatTableDataSource(res);
       this.dataSource.paginator = this.paginator;
       this.dataSource.sort = this.sort
      },
      error:(err)=>{
        alert("Error")
      }
    })
 
}
editRole(row: any){
  this.dialog.open(StrGroupDialogComponent,{
    width:'30%',
    data:row
  }).afterClosed().subscribe(val=>{
    if(val==='updata'){
      this.getAllGroup();
    }
  })
    
}
deleteRole(id:number){
  this.api.deleteGroup(id)
  .subscribe({
    next:(res)=>{
      alert("Role Delete");
      this.getAllGroup();
    },
    error:()=>{
      alert("Error ")
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
