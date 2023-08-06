

import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { publishFacade } from '@angular/compiler';

@Component({
  selector: 'app-str-costcenter-dialog',
  templateUrl: './str-costcenter-dialog.component.html',
  styleUrls: ['./str-costcenter-dialog.component.css']
})
export class StrCostcenterDialogComponent  implements OnInit {
  transactionUserId=localStorage.getItem('transactionUserId')
  createUserName="Admin"

  productForm !: FormGroup;
  actionBtn: string = "حفظ"

  constructor(private formBuilder: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<StrCostcenterDialogComponent>) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      transactionUserId:['', Validators.required],
      createUserName:['', Validators.required]
      
    });

    if (this.editData) {
      this.actionBtn = "تحديث";
      this.productForm.controls['code'].setValue(this.editData.code);
      this.productForm.controls['name'].setValue(this.editData.name);
     
    }
  }

  addCostCenter() {
    if (!this.editData) {
      this.productForm.controls['transactionUserId'].setValue(this.transactionUserId);
      this.productForm.controls['createUserName'].setValue(this.createUserName);
      if (this.productForm.valid) {
        console.log(this.productForm.value);
        this.api.postCostCenter(this.productForm.value)
       
          .subscribe({
            
            next: (res) => {
              alert("تم اضافة المركز");
              this.productForm.reset();
              this.dialogRef.close('حفظ');
            },
            error: (err) => {
             alert("!خطأ في العملية")
              
            }
          })
      }
    }else{
      this.updateCostCenter()
    }
  }

  updateCostCenter(){
    this.api.putCostCenter(this.productForm.value,this.editData.id)
    .subscribe({
      next:(res)=>{
        alert("تم التحديث بنجاح");
        this.productForm.reset();
        this.dialogRef.close('تحديث');
      },
      error:()=>{
        alert("خطأ في التحديث");
      }
    })
  }

}