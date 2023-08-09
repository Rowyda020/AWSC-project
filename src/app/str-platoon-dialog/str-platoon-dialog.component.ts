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

export class Commodities {
  constructor(public name: string, public code: string) {}
}

export class Grades {
  constructor(public name: string, public code: string) {}
}


@Component({
  selector: 'app-str-platoon-dialog',
  templateUrl: './str-platoon-dialog.component.html',
  styleUrls: ['./str-platoon-dialog.component.css']
})
export class STRPlatoonDialogComponent implements OnInit{
  transactionUserId=localStorage.getItem('transactionUserId')
  commodityCtrl: FormControl;
  filteredcommodities: Observable<any[]>;
  commodity_list: Commodities[] = [];
  gradeCtrl: FormControl;
  filteredgrades: Observable<any[]>;
  grade_list: Grades[] = [];
  formcontrol = new FormControl('');  
  platoonForm !:FormGroup;
  selectedOption: any;
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
      this.commodityCtrl = new FormControl();
    this.filteredcommodities = this.commodityCtrl.valueChanges.pipe(
      startWith(''),
      map((commodity) =>
      commodity ? this._filtercommodity(commodity) : this.commodity_list.slice()
      )
    );
      this.gradeCtrl = new FormControl();
    this.filteredgrades = this.gradeCtrl.valueChanges.pipe(
      startWith(''),
      map((grade) =>
      grade ? this._filtergrade(grade) : this.grade_list.slice()
      )
    );
     }

     
  ngOnInit(): void {
    this.platoonForm = this.formBuilder.group({
      transactionUserId : ['',Validators.required],
      code : ['',Validators.required],
      name : ['',Validators.required],
      commodityId : ['',Validators.required],
      gradeId : ['',Validators.required],
      id : ['',Validators.required],
    });
    

    this.api.getAllCommodities().subscribe((commodityData)=>{
      this.commodity_list = commodityData;
    });

    this.api.getAllGrades().subscribe((gradeData)=>{
      this.grade_list = gradeData;
    });
    

    if(this.editData){
      this.actionBtn = "تعديل";
      this.platoonForm.controls['transactionUserId'].setValue(this.editData.transactionUserId);
      this.platoonForm.controls['code'].setValue(this.editData.code);
      this.platoonForm.controls['name'].setValue(this.editData.name);
      console.log("editData commodityId: ", this.editData.commodityId)
      this.platoonForm.controls['commodityId'].setValue(this.editData.commodityId);
      console.log("editData gradeId: ", this.editData.gradeId)
      this.platoonForm.controls['gradeId'].setValue(this.editData.gradeId);
      // console.log("editData gradeId: ", this.editData.gradeName)
      // this.platoonForm.controls['gradeId'].setValue(this.editData.gradeName);
      this.platoonForm.addControl('id', new FormControl('', Validators.required));
      this.platoonForm.controls['id'].setValue(this.editData.id);
    }
  }


displayCommodityName(commodity: any): string {
  return commodity && commodity.name ? commodity.name : '';
}

commoditySelected($event: MatAutocompleteSelectedEvent) {
  this.selectedOption = $event.option.value;
 this.platoonForm.patchValue({ commodityId: this.selectedOption.id });
}

displayGradeName(grade: any): string {
  return grade && grade.name ? grade.name : '';
}

gradeSelected(event: MatAutocompleteSelectedEvent) {
     this.selectedOption = event.option.value;
    this.platoonForm.patchValue({ gradeId: this.selectedOption.id });
  }

  _filtercommodity(value: string) {
    const searchvalue = value.toLocaleLowerCase();
    let arr = this.commodity_list.filter(option => option.name.toLocaleLowerCase().includes(searchvalue) || 
    option.code.toLocaleLowerCase().includes(searchvalue));
    return arr.length ? arr : [{ name: 'No Item found', code: 'null' }];
  }

  _filtergrade(value: string) {
    const searchvalue = value.toLocaleLowerCase();
    let arr = this.grade_list.filter(option => option.name.toLocaleLowerCase().includes(searchvalue) || 
    option.code.toLocaleLowerCase().includes(searchvalue));
    return arr.length ? arr : [{ name: 'No Item found', code: 'null' }];
  }

  addPlatoon(){
    if(!this.editData){
      
      this.platoonForm.removeControl('id')
      this.platoonForm.controls['commodityId'].setValue(this.selectedOption.id);
      this.platoonForm.controls['gradeId'].setValue(this.selectedOption.id);
      console.log("add: ", this.platoonForm.value);
      this.platoonForm.controls['transactionUserId'].setValue(this.transactionUserId);
      if(this.platoonForm.valid){
        this.api.postPlatoon(this.platoonForm.value)
        .subscribe({
          next:(res)=>{
            alert("تمت الاضافة بنجاح");
            this.platoonForm.reset();
            this.dialogRef.close('save');
          },
          error:(err)=>{ 
            alert("خطأ عند تحديث البيانات") 
          }
        })
      }
    }else{
      this.updatePlatoon()
    }
  }
  // async addPlatoon() {
  //   if (!this.editData) {
  //     this.gradeName =  await this.getgradeByID(this.platoonForm.getRawValue().gradeId)
  //     console.log("form add: ", this.platoonForm.value, "comm name: ", this.gradeName)
  //     this.platoonForm.controls['gradeName'].setValue(this.gradeName);
  //     console.log("form add after select: ", this.platoonForm.value)
  //     if (this.platoonForm.valid) {
  //       this.api.postPlatoon(this.platoonForm.value)
  //         .subscribe({
  //           next: (res) => {

  //             alert("تمت الاضافة بنجاح");
  //             this.platoonForm.reset();
  //             this.dialogRef.close('save');
  //           },
  //           error: (err) => {
  //             alert("Error")
  //             // console.log("add product err:", err);
  //           }
  //         })
  //     }
  //   }else{
  //     this.updatePlatoon()
  //   }
  // }
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
