





import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { publishFacade } from '@angular/compiler';

@Component({
  selector: 'app-str-store-dialog',
  templateUrl: './str-store-dialog.component.html',
  styleUrls: ['./str-store-dialog.component.css']
})
export class StrStoreDialogComponent implements OnInit {

  productForm !: FormGroup;
  actionBtn: string = "حفظ"

  constructor(private formBuilder: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<StrStoreDialogComponent>) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      STRcode: ['', Validators.required],
      STRstore: ['', Validators.required],
      
    });

    if (this.editData) {
      this.actionBtn = "تحديث";
      this.productForm.controls['STRcode'].setValue(this.editData.STRcode);
      this.productForm.controls['STRstore'].setValue(this.editData.STRstore);
     
    }
  }

  addProduct() {
    if (!this.editData) {
      if (this.productForm.valid) {
        this.api.postProduct(this.productForm.value)
          .subscribe({
            next: (res) => {
              alert("تم اضافة المخزن");
              this.productForm.reset();
              this.dialogRef.close('حفظ');
            },
            error: (err) => {
             alert("!خطأ في العملية")
              
            }
          })
      }
    }else{
      this.updateProduct()
    }
  }

  updateProduct(){
    this.api.putProduct(this.productForm.value,this.editData.id)
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