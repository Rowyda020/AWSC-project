
import { Component,OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {GlobalService } from '../services/global.service';
import{MatDialogRef,MAT_DIALOG_DATA}from'@angular/material/dialog'
import { Router } from '@angular/router';


@Component({
  selector: 'app-str-group-dialog',
  templateUrl: './str-group-dialog.component.html',
  styleUrls: ['./str-group-dialog.component.css']
})
export class StrGroupDialogComponent {

  
  transactionUserId=localStorage.getItem('transactionUserId')
  productForm !: FormGroup;
  actionBtn : string ="إضافة"
  constructor(private router : Router,private formBuilder: FormBuilder,private api : GlobalService,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef : MatDialogRef<StrGroupDialogComponent>){}
  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      //define the components of the form
      name:['', Validators.required],
      description:['', Validators.required],
      transactionUserId:['', Validators.required],
      });


     if(this.editData){
      this.actionBtn = "تعديل";
      this.productForm.controls['name'].setValue(this.editData.name);
      this.productForm.controls['description'].setValue(this.editData.description);
      // this.productForm.controls['transactionUserId'].setValue(this.editData.transactionUserId);
      
  }
}
  
addRole() {
  
  
  if (!this.editData) {
    console.log("jjjjjjjj");
    this.productForm.controls['transactionUserId'].setValue(this.transactionUserId);
    console.log(this.transactionUserId);

    if (this.productForm.valid) {
      console.log(this.productForm.value);
      this.api.postGroup(this.productForm.value)
        .subscribe({ 
          next: (res) => {
            console.log(res)
            alert("تم اضافة المحموعة بنجاح ");
            // this.router.navigateByUrl('/roles')
            this.productForm.reset();
            this.dialogRef.close('حفظ');
        
      
          },
          error: (err) => {
            alert("خطأ في حفظ الصلاحية")
            
          }
        })
    }
  }else{
    this.updateGroup()
  }
}

updateGroup(){
  this.api.putGroup(this.productForm.value,this.editData.id)
  .subscribe({
    next:(res)=>{
      alert("Updated successfully");
      this.productForm.reset();
      this.dialogRef.close('updata');
    },
    error:()=>{
      alert("update error");
    }
  })
}

}


  





