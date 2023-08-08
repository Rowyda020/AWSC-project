import { Component, OnInit, ViewChild } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { STRPlatoonDialogComponent } from '../str-platoon-dialog/str-platoon-dialog.component';
import { ApiService } from '../services/api.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { FormGroup, FormBuilder, Validator, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

// export class Grades {
//   constructor(public name: string, public code: string) {}
// }

@Component({
  selector: 'app-str-platoon',
  templateUrl: './str-platoon.component.html',
  styleUrls: ['./str-platoon.component.css']
})
export class STRPlatoonComponent implements OnInit{
  // gradeCtrl: FormControl;
  // filteredgrades: Observable<any[]>;
  // grade_list: Grades[] = [];
  formcontrol = new FormControl('');  
  platoonForm !:FormGroup;
  title = 'angular13crud';
  displayedColumns: string[] = ['code', 'name', 'gradeName', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private dialog : MatDialog, private api : ApiService){
    // this.gradeCtrl = new FormControl();
    // this.filteredgrades = this.gradeCtrl.valueChanges.pipe(
    //   startWith(''),
    //   map((grade) =>
    //     grade ? this.filtergrade(grade) : this.grade_list.slice()
    //   )
    // );
  }
  ngOnInit(): void {
    this.getAllPlatoons();
    // this.api.getAllGrades().subscribe((tododata)=>{
    //   this.grade_list = tododata;
    // });
  }
  openDialog() {
    this.dialog.open(STRPlatoonDialogComponent, {
      width: '30%'
    }).afterClosed().subscribe(val=>{
      if(val === 'save'){
        this.getAllPlatoons();
      }
    })
  }

  // optionSelected(event: MatAutocompleteSelectedEvent) {
  //   const selectedOption = event.option.value;
  //   this.platoonForm.patchValue({ gradeName: selectedOption });
  // }


  // filtergrade(value: string) {
  //   const searchvalue = value.toLocaleLowerCase();
  //   let arr = this.grade_list.filter(option => option.name.toLocaleLowerCase().includes(searchvalue) || 
  //   option.code.toLocaleLowerCase().includes(searchvalue));
  //   return arr.length ? arr : [{ name: 'No Item found', code: 'null' }];
  // }


  getAllPlatoons(){
    this.api.getPlatoon()
    .subscribe({
      next:(res)=>{
        console.log("res table: ", res);
        
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error:(err)=>{
        alert("error while fetching the records!!");
      }
      
    })
  }
  editPlatoon(row : any){
    console.log("data : " , row)
    this.dialog.open(STRPlatoonDialogComponent,{
      width:'30%',
      data:row
    }).afterClosed().subscribe(val=>{
      if(val === 'update'){
        this.getAllPlatoons();
      }
    })
  }
  daletePlatoon(id:number){
    if(confirm("Are you sure to delete ")) {
      console.log("Implement delete functionality here");
    }
    this.api.deletePlatoon(id)
    .subscribe({
      next:(res)=>{
        alert("Product deleted successfully");
        this.getAllPlatoons();
      },
      error:()=>{
        alert("error while deleting the product!!")
      }
    })
  }
  // getSearchPlatoons(commidityID:any,name:any) {
  //   if(commidityID != ''){
  //     if(commidityID.id == 0){
  //       commidityID = '';
  
  //     }
  //   }
  // console.log("com id: ", commidityID, "name: ", name );
  
  //   this.api.getPlatoon()
  //     .subscribe({
  //       next: (res) => {
  //         // 1-
  //         console.log(res )
  //         if (commidityID != '' && name == '' ){
  //           console.log("enter id only: ", "res : ", res, "input id: ", commidityID)
  //           this.dataSource = res.filter((res: any)=> res.commodityId==commidityID!) 
  //           this.dataSource.paginator = this.paginator;
  //           this.dataSource.sort = this.sort;
  //         }
  //         else if (commidityID != '' && name != ''){
  //           console.log("enter name & id: ", "res : ", res, "input name: ", name, "id: ", commidityID)
  //           // this.dataSource = res.filter((res: any)=> res.name==name!)
  //           this.dataSource = res.filter((res: any)=> res.commodityId==commidityID! && res.name.toLowerCase().includes(name.toLowerCase()))
  //           this.dataSource.paginator = this.paginator;
  //           this.dataSource.sort = this.sort;
  //         }
  //         else{
  //           console.log("enter name only: ", "res name: ", res, "input name: ", name)
  //           // this.dataSource = res.filter((res: any)=> res.commodity==commidityID! && res.name==name!)
  //           this.dataSource = res.filter((res: any)=> res.name.toLowerCase().includes(name.toLowerCase()))
  //           this.dataSource.paginator = this.paginator;
  //           this.dataSource.sort = this.sort;
  //         }
        
          
  //       },
  //       error: (err) => {
  //         alert("Error")
  //       }
  //     })
  //     // this.getAllGrades()
  //   }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
