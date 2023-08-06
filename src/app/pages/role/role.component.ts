
import { Component,OnInit,ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { StrRoleDialogComponent } from '../../pages/str-role-dialog/str-role-dialog.component';
import { ApiService } from '../../services/api.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {
  title = 'Angular13Crud';
  displayedColumns: string[] = ['name', 'description','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private dialog: MatDialog,private api : ApiService){

  }
  ngOnInit(): void {
    this.getAllRole();
  }

 openDialog() {
  this.dialog.open(StrRoleDialogComponent, {
    width:'30%'
}).afterClosed().subscribe(val=>{
  if(val==='save'){
    this.getAllRole();
  }
})
}
getAllRole(){
    this.api.getAllRole()
    .subscribe({
      next:(res)=>{
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
  this.dialog.open(StrRoleDialogComponent,{
    width:'30%',
    data:row
  }).afterClosed().subscribe(val=>{
    if(val==='updata'){
      this.getAllRole();
    }
  })
    
}
deleteRole(id:number){
  this.api.deleteRole(id)
  .subscribe({
    next:(res)=>{
      alert("Role Delete");
      this.getAllRole();
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





