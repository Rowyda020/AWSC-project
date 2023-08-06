import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators, FormControl } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-str-units-dialog',
  templateUrl: './str-units-dialog.component.html',
  styleUrls: ['./str-units-dialog.component.css']
})
export class STRUnitsDialogComponent {
  formcontrol = new FormControl('');  
  unitsForm !:FormGroup;
  actionBtn : string = "حفظ"
  constructor(private formBuilder : FormBuilder,
     private api : ApiService,
     private readonly route:ActivatedRoute,
     @Inject(MAT_DIALOG_DATA) public editData : any,
     private dialogRef : MatDialogRef<STRUnitsDialogComponent>){
     }
  ngOnInit(): void {
    this.unitsForm = this.formBuilder.group({
      transactionUserId : ['',Validators.required],
      name : ['',Validators.required],
    });

    if(this.editData){
      this.actionBtn = "تعديل";
      this.unitsForm.controls['transactionUserId'].setValue(this.editData.transactionUserId);
      this.unitsForm.controls['name'].setValue(this.editData.name);
    }
  }

  addProduct(){
    if(!this.editData){
      if(this.unitsForm.valid){
        this.api.postunit(this.unitsForm.value)
        .subscribe({
          next:(res)=>{
            alert("تمت الاضافة بنجاح");
            this.unitsForm.reset();
            this.dialogRef.close('save');
          },
          error:(err)=>{ 
            alert("خطأ عند اضافة البيانات") 
            console.log(err)
          }
        })
      }
    }else{
      this.updateunit()
    }
  }
    updateunit(){
      this.api.putunit(this.unitsForm.value)
      .subscribe({
        next:(res)=>{
          alert("تم التحديث بنجاح");
          this.unitsForm.reset();
          this.dialogRef.close('update');
        },
        error:()=>{
          alert("خطأ عند تحديث البيانات");
        }
      })
    }

}
