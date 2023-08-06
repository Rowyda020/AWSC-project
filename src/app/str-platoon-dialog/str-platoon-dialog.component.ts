import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators, FormControl } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import {MatAccordion, MatExpansionModule} from '@angular/material/expansion';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatOptionSelectionChange } from '@angular/material/core';
export class Grads {
  constructor(public name: string, public code: string) {}
}



@Component({
  selector: 'app-str-platoon-dialog',
  templateUrl: './str-platoon-dialog.component.html',
  styleUrls: ['./str-platoon-dialog.component.css']
})
export class STRPlatoonDialogComponent implements OnInit{
  gradeCtrl: FormControl;
  filteredgrades: Observable<any[]>;
  grade_list: Grads[] = [];
  formcontrol = new FormControl('');  
  platoonForm !:FormGroup;
  actionBtn : string = "حفظ"
  Id:string  | undefined | null;
   commidityDt:any={
  id:0,
}
dataSource!: MatTableDataSource<any>;

@ViewChild(MatPaginator) paginator!: MatPaginator;
@ViewChild(MatSort) sort!: MatSort;
@ViewChild(MatAccordion)
accordion!: MatAccordion;
gradeName: any;
  constructor(private formBuilder : FormBuilder,
     private api : ApiService,
     private readonly route:ActivatedRoute,
     @Inject(MAT_DIALOG_DATA) public editData : any,
     private dialogRef : MatDialogRef<STRPlatoonDialogComponent>){
      this.gradeCtrl = new FormControl();
    this.filteredgrades = this.gradeCtrl.valueChanges.pipe(
      startWith(''),
      map((grade) =>
      grade ? this.filtergradd(grade) : this.grade_list.slice()
      )
    );
     }
  ngOnInit(): void {
    this.platoonForm = this.formBuilder.group({
      transactionUserId : ['',Validators.required],
      code : ['',Validators.required],
      name : ['',Validators.required],
      gradeName : ['',Validators.required],
      gradeId : ['',Validators.required]
    });

    this.api.getAllGrades().subscribe((tododata)=>{
      this.grade_list = tododata;
    });
    

    if(this.editData){
      this.actionBtn = "تعديل";
      this.platoonForm.controls['transactionUserId'].setValue(this.editData.transactionUserId);
      this.platoonForm.controls['code'].setValue(this.editData.code);
      this.platoonForm.controls['name'].setValue(this.editData.name);
      this.platoonForm.controls['gradeName'].setValue(this.editData.gradeName);
      this.platoonForm.controls['gradeId'].setValue(this.editData.gradeId);
    }
  }
  async getSearchPlatoons(gradeID:any,name:any) {
    console.log("this",gradeID + name)
      this.gradeName =  await this.getgradeByID(gradeID)
      alert(this.gradeName)
        this.api.getPlatoon()
          .subscribe({
            next: (res) => {
              // 1-
              if (gradeID != '' && name == '' ){
                this.dataSource = res.filter((res: any)=> res.commodity==gradeID!) 
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
              }
              else if (gradeID != '' && name != ''){
                // this.dataSource = res.filter((res: any)=> res.name==name!)
                this.dataSource = res.filter((res: any)=> res.commodity==gradeID! && res.name.toLowerCase().includes(name.toLowerCase()))
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
              }
              else{
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
          // this.getAllProducts()
        }

        
getgradeByID(id: any) {
  console.log("row store id: ", id);
  return fetch(`http://ims.aswan.gov.eg/api/STR_Grade/get-grade-by-id/{id}`)
    .then(response => response.json())
    .then(json => {
      console.log("fetch name by id res: ", json[0].name);
      // this.storeName = res.name;
      // this.groupMasterForm.controls['Store'] = json[0].name;
      return json[0].name;
    })
    .catch((err) => {
      console.log("error in fetch name by id: ", err);
      alert("خطا اثناء جلب رقم المخزن !");
    });
}

  optionSelected(event: MatAutocompleteSelectedEvent) {
    const selectedOption = event.option.value;
    this.platoonForm.patchValue({ gradeName: selectedOption });
  }

  filtergradd(value: string) {
    const searchvalue = value.toLocaleLowerCase();
    let arr = this.grade_list.filter(option => option.name.toLocaleLowerCase().includes(searchvalue) || 
    option.code.toLocaleLowerCase().includes(searchvalue));
if (arr.length ){
    return arr;
}else{
  alert('error');
  // this.platoonForm.controls['grad'].setValue('')
  return  [{ name: 'No Item found', code: 'null' }];
}
  }
  // addProduct(){
  //   if(!this.editData){
  //     if(this.platoonForm.valid){
  //       this.api.postPlatoon(this.platoonForm.value)
  //       .subscribe({
  //         next:(res)=>{
  //           alert("تمت الاضافة بنجاح");
  //           this.platoonForm.reset();
  //           this.dialogRef.close('save');
  //         },
  //         error:(err)=>{ 
  //           alert("خطأ عند تحديث البيانات") 
  //         }
  //       })
  //     }
  //   }else{
  //     this.updatePlatoon()
  //   }
  // }
  async addPlatoon() {
    if (!this.editData) {
      this.gradeName =  await this.getgradeByID(this.platoonForm.getRawValue().gradeId)
      console.log("form add: ", this.platoonForm.value, "comm name: ", this.gradeName)
      this.platoonForm.controls['gradeName'].setValue(this.gradeName);
      console.log("form add after select: ", this.platoonForm.value)
      if (this.platoonForm.valid) {
        this.api.postPlatoon(this.platoonForm.value)
          .subscribe({
            next: (res) => {

              alert("تمت الاضافة بنجاح");
              this.platoonForm.reset();
              this.dialogRef.close('save');
            },
            error: (err) => {
              alert("Error")
              // console.log("add product err:", err);
            }
          })
      }
    }else{
      this.updatePlatoon()
    }
  }
    updatePlatoon(){
      this.api.putPlatoon(this.platoonForm.value)
      .subscribe({
        next:(res)=>{
          alert("تم التحديث بنجاح");
          this.platoonForm.reset();
          this.dialogRef.close('update');
        },
        error:()=>{
          alert("خطأ عند تحديث البيانات");
        }
      })
    }

}
