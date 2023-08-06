






import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SelectorListContext, publishFacade } from '@angular/compiler';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-str-category-dialog',
  templateUrl: './str-category-dialog.component.html',
  styleUrls: ['./str-category-dialog.component.css']
})
export class StrCategoryDialogComponent implements OnInit {

  select=0;
 

  Id: string | undefined | null;
  commodity: any = {
    id: 0,
    name: ''

  }
  grade: any = {
    id: 0,
    name: ''

  }
  platon: any = {
    id: 0,
    name: ''

  }
  group: any = {
    id: 0,
    name: ''

  }
  unit: any = {
    id: 0,
    name: ''

  }
  grouplist: any ;
  commoditylist: any;
  gradelist: any;
  platonlist: any;
  unitlist: any;
  commodityChoose: any;
  
  productForm !: FormGroup;
  actionBtn: string = "حفظ"

  constructor(private formBuilder: FormBuilder,
    private api: ApiService,private readonly route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<StrCategoryDialogComponent>) { }
  
  
  ngOnInit(): void {
   

 this.showAll();


 
 

    
    
    // this.api.getAllcommodity().subscribe((commoditydata) => {
    //   this.commoditylist = commoditydata;
    // });
    // this.api.getAllgroup().subscribe((tododata) => {
    //   this.grouplist = tododata;
    // });
    // // this.api.getAllgrade().subscribe((gradedata) => {
    // //   this.gradelist = gradedata;
    // // });
    // this.api.getAllplaton().subscribe((platondata) => {
    //   this.platonlist = platondata;
    // });
    this.api.getAllunit().subscribe((unitdata) => {
      this.unitlist = unitdata;
    });
    this.productForm = this.formBuilder.group({
      productName: ['', Validators.required],
   
      Num: ['', Validators.required],
      commodity: ['', Validators.required],
      grade: ['', Validators.required],
      platon: ['', Validators.required],
      group: ['', Validators.required]
      ,
      unit: ['', Validators.required],
      type: ['', Validators.required],
      relation: ['', Validators.required]

    });

    if (this.editData) {
      this.actionBtn = "تحديث";
      this.productForm.controls['productName'].setValue(this.editData.productName);
      this.productForm.controls['Num'].setValue(this.editData.Num);
      this.productForm.controls['commodity'].setValue(this.editData.commodity);
      this.productForm.controls['grade'].setValue(this.editData.grade);
      this.productForm.controls['platon'].setValue(this.editData.platon);
      this.productForm.controls['group'].setValue(this.editData.group);
      this.productForm.controls['unit'].setValue(this.editData.unit);
      this.productForm.controls['type'].setValue(this.editData.type);
      this.productForm.controls['relation'].setValue(this.editData.relation)
  }}

 


  showAll() {
  
    this.api.getAllcommodity().subscribe((data:any)=>{
        this.commoditylist=data;
        console.log(this.commoditylist)})
        // this.api.getAllgrade().subscribe((res:any)=>{
        //     this.gradelist=res;
        //     console.log(this.gradelist)
    }
    
    onCommodityChange(commodityId : any) {
       

        this.api.getAllgrade().subscribe((res: any)=>{
            this.gradelist=res.filter((res: any)=> res.commodityId==commodityId!),
        console.log(this.gradelist)
        })}
       
 onGradeChange(gradeId : any) {
       console.log(gradeId)

            this.api.getAllplaton().subscribe((res: any)=>{
                this.platonlist=res.filter((res: any)=> res.gradeId==gradeId!),
            console.log(this.platonlist)
            })}

           
            onplatonChange(platonId : any) {
       

                this.api.getAllgroup().subscribe((res: any)=>{
                    this.grouplist=res.filter((res: any)=> res.platonId==platonId!),
                console.log(this.grouplist)
                })}
                // onGradeChange(gradeId : any) {
       

                //     this.api.getAllplaton().subscribe((res: any)=>{
                //         this.platonlist=res.filter((res: any)=> res.gradeId==gradeId!),
                //     console.log(this.platonlist)
                //     })}
                       
 
addProduct() {
  if (!this.editData) {
    if (this.productForm.valid) {
      this.api.postProduct(this.productForm.value)
        .subscribe({
          next: (res) => {
            alert("تم اضافة الصنف");
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
}}