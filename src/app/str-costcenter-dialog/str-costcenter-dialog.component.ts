

import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { publishFacade } from '@angular/compiler';

@Component({
  selector: 'app-str-costcenter-dialog',
  templateUrl: './str-costcenter-dialog.component.html',
  styleUrls: ['./str-costcenter-dialog.component.css']
})
export class StrCostcenterDialogComponent  implements OnInit {

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
      transactionUserId: [1],

      
    });

    if (this.editData) {
      this.actionBtn = "تحديث";
      this.productForm.controls['code'].setValue(this.editData.code);
      this.productForm.controls['name'].setValue(this.editData.name);
      this.productForm.controls['transactionUserId'].setValue(this.editData.transactionUserId);
      this.productForm.addControl('id', new FormControl('', Validators.required));
      this.productForm.controls['id'].setValue(this.editData.id);
    }
  }

  addCostCenter() {
    if (!this.editData) {
      this.productForm.removeControl('id')

      if (this.productForm.valid) {
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
    this.api.putCostCenter(this.productForm.value)
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