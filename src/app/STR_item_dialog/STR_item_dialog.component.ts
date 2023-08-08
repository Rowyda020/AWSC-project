






import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SelectorListContext, publishFacade } from '@angular/compiler';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { debounceTime } from 'rxjs';



@Component({
  selector: 'app-str-category-dialog',
  templateUrl: './STR_item_dialog.component.html',
  styleUrls: ['./STR_item_dialog.component.css']
})
export class StrItemDialogComponent implements OnInit {

  select = 0;
  Id: string | undefined | null;
  commodity: any = {
    id: 0,
    name: ''
  }
  platoon: any = {
    id: 0,
    name: ''

  }
  grade: any = {
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
  grouplist: any;
  commoditylist: any;
  platoonlist: any;
  gradelist: any;
  unitlist: any;
  getHeaderRowId: any;
  commodityChoose: any;
  platoonName: any;
  gradeName: any;
  groupName: any;
  commodityName: any;
  // isActive=true;

  restGroupInfoDone = false;
  productForm !: FormGroup;
  actionBtn: string = "حفظ"

  constructor(private formBuilder: FormBuilder,
    private api: ApiService, private readonly route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<StrItemDialogComponent>) { }

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {


    this.showAll();

    this.productForm = this.formBuilder.group({
      transactionUserId:[1],
      // fullCode:['',Validators.required],
      name: ['', Validators.required],
      no: ['', Validators.required],
      commodityName: ['', Validators.required],
      commodityId: ['', Validators.required],
      gradeName: ['', Validators.required],
      gradeId: ['', Validators.required],
      platoonName: ['', Validators.required],
      platoonId: ['', Validators.required],
      groupName: ['', Validators.required],
      // createUserName:[''],
      groupId: ['', Validators.required],
      unitName: ['', Validators.required],
      unitId: [1, Validators.required],
      type: ['', Validators.required],
      // isActive: [Boolean, Validators.required]
      // isActive:Boolean,

    });

    // if (this.editData) {
      this.actionBtn = "تحديث";
console.log("edit data before:",this.editData)
      this.productForm.controls['name'].setValue(this.editData.name);
      // this.productForm.controls['transactionUserId'].setValue(this.editData.transactionUserId);

      this.productForm.controls['no'].setValue(this.editData.no);
      this.productForm.controls['commodityName'].setValue(this.editData.commodityName);
      // this.productForm.controls['commodityId'].setValue(this.editData.commodityId);
      this.productForm.controls['gradeName'].setValue(this.editData.gradeName);
      // this.productForm.controls['gradeId'].setValue(this.editData.gradeId);
      this.productForm.controls['platoonName'].setValue(this.editData.platoonName);
      // this.productForm.controls['platoonId'].setValue(this.editData.platoonId);
      this.productForm.controls['groupName'].setValue(this.editData.groupName);
      // this.productForm.controls['groupId'].setValue(this.editData.groupId);
      // this.productForm.controls['unitId'].setValue(this.editData.unitId);
      this.productForm.controls['unitName'].setValue(this.editData.unitName);
      this.productForm.controls['type'].setValue(this.editData.type);
      // this.productForm.controls['isActive'].setValue(this.editData.isActive)
      this.productForm.addControl('id', new FormControl('', Validators.required));
      this.productForm.controls['id'].setValue(this.editData.id)


      console.log(" after set: ", this.productForm.value)
      // console.log(this.editData.commodityName)
// }
  }

  async testInputsValidating() {
    this.platoonName = await this.getStoreByID(this.productForm.getRawValue().platoonId);
    this.gradeName = await this.getGradeByID(this.productForm.getRawValue().gradeId);
    this.groupName = await this.getGroupByID(this.productForm.getRawValue().groupId);
    this.commodityName = await this.getGroupByID(this.productForm.getRawValue().commodityId);




    this.productForm.controls['gradeName'].setValue(this.gradeName);
    // console.log("dataName: ", this.productForm.value)

    this.productForm.controls['platoonName'].setValue(this.platoonName);
    // console.log("dataName: ", this.productForm.value)
    this.productForm.controls['groupName'].setValue(this.groupName);
    // console.log("dataName: ", this.productForm.value)
    this.productForm.controls['commodityName'].setValue(this.commodityName);



    if (this.productForm.getRawValue().platoonName && this.productForm.getRawValue().gradeName
     && this.productForm.getRawValue().groupName && this.productForm.getRawValue().commodityName) {
      console.log("test id input not empty");
      this.restGroupInfoDone = true;

      console.log("form : ", this.productForm.value)
      this.api.postItem(this.productForm.value)
        .subscribe({
          next: (res) => {
            console.log("ID header after post req: ", res);
            this.getHeaderRowId = res;
            alert("تمت إضافة الصنف بنجاح");
            this.productForm.reset();
            this.dialogRef.close('حفظ');
           

          },
          error: (err) => {
            // console.log("test input validating", err);
            alert("حدث خطأ أثناء إضافة مجموعة")
          }
        })
    }
    else if (this.productForm.getRawValue().platoonName 
    && this.productForm.getRawValue().commodityName && this.productForm.getRawValue().gradeName
     && this.productForm.getRawValue().groupName) {
      this.getStoreByID(this.productForm.getRawValue().platoonId);
      this.getGradeByID(this.productForm.getRawValue().gradeId);
      this.getGroupByID(this.productForm.getRawValue().groupId);
      this.getcommodityByID(this.productForm.getRawValue().commodityId);



    }
    else {
      // console.log("inputs are empty")
      alert("تاكد من ادخال البيانات صحيحة")
    }
  }
  getAllItems() {
    this.api.getItems()
      .subscribe({
        next: (res) => {
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: (err) => {
          alert("Error")
        }
      })
  }

  showAll() {

    this.api.getAllcommodity().subscribe((data: any) => {
      this.commoditylist = data;
      // console.log("cmmodityList",this.commoditylist)
    })
    this.api.getAllunit().subscribe((unitdata) => {
      this.unitlist = unitdata;
    });
  
  
  }

  onCommodityChange(commodityId: any) {
    // alert(commodityId)

    this.api.getAllgrade().subscribe((res: any) => {
      this.gradelist = res.filter((res: any) => res.commodityId == commodityId!),
        console.log(this.gradelist)
    })
  }
  onGradeChange(gradeId: any) {

// alert(gradeId)
    this.api.getAllplatoon().subscribe((res: any) => {
      this.platoonlist = res.filter((res: any) => res.gradeId == gradeId!),
        console.log(this.platoonlist)
    })
  }
  onplatoonChange(platoonId: any) {


    this.api.getAllgroup().subscribe((res: any) => {
      this.grouplist = res.filter((res: any) => res.platoonId == platoonId!),
        console.log(this.grouplist)
    })
  }






  // addProduct() {
  //   if (!this.editData) {
  //     this.productForm.removeControl('id');

  //     console.log("coomidty: ", this.productForm.value)
  //     if (this.productForm.valid) {
  //       this.api.postProduct(this.productForm.value)
  //         .subscribe({
  //           next: (res) => {
  //             alert("تم اضافة الصنف");
  //             this.productForm.reset();
  //             this.dialogRef.close('حفظ');
  //           },
  //           error: (err) => {
  //             console.log("error add product:",err)

  //           }
  //         })
  //     }
  //   } else {
  //     this.updateProduct()
  //   }
  // }
  getcommodityByID(id: any) {
    // console.log("row store id: ", id);
    return fetch(`http://ims.aswan.gov.eg/api/STR_Commodity/get-all-commodity/?id=${id}`)

      .then(response => response.json())
      .then(json => {
        // console.log("fetch name by id res: ", json[0].name);
        // this.platoonName = res.name;
        // this.productForm.controls['Store'] = json[0].name;
        return json[0].name;
      })
      .catch((err) => {
        // console.log("error in fetch name by id: ", err);
        alert("خطا اثناء جلب رقم المخزن !");
      });
  }

  getGroupByID(id: any) {
    // console.log("row store id: ", id);
    return fetch(`http://ims.aswan.gov.eg/api/STR_Group/get-all-Groups/?id=${id}`)

      .then(response => response.json())
      .then(json => {
        // console.log("fetch name by id res: ", json[0].name);
        // this.platoonName = res.name;
        // this.productForm.controls['Store'] = json[0].name;
        return json[0].name;
      })
      .catch((err) => {
        // console.log("error in fetch name by id: ", err);
        alert("خطا اثناء جلب رقم المخزن !");
      });
  }
  getGradeByID(id: any) {
    // console.log("row store id: ", id);
    return fetch(`http://ims.aswan.gov.eg/api/STR_Grade/get-all-grades/?id=${id}`)

      .then(response => response.json())
      .then(json => {
        // console.log("fetch name by id res: ", json[0].name);
        // this.platoonName = res.name;
        // this.productForm.controls['Store'] = json[0].name;
        return json[0].name;
      })
      .catch((err) => {
        // console.log("error in fetch name by id: ", err);
        alert("خطا اثناء جلب رقم المخزن !");
      });
  }
  getStoreByID(id: any) {
    // console.log("row store id: ", id);
    return fetch(`http://ims.aswan.gov.eg/api/STR_Platoon/get-all-Platoons/?id=${id}`)
      // return fetch(`http://localhost:3000/grade/?id=${id}`)

      .then(response => response.json())
      .then(json => {
        // console.log("fetch name by id res: ", json[0].name);
        // this.platoonName = res.name;
        // this.productForm.controls['Store'] = json[0].name;
        return json[0].name;
      })
      .catch((err) => {
        // console.log("error in fetch name by id: ", err);
        alert("خطا اثناء جلب رقم المخزن !");
      });
  }


  updateItems() {
    console.log("update product data:",this.productForm.value)
    this.api.putItems(this.productForm.value)
      .subscribe({
        next: (res) => {
          alert("  تم التحديث بنجاح");
          this.productForm.reset();
          this.dialogRef.close('تحديث');
        },
        error: () => {
          alert("خطأ في التحديث");
        }
      })
  }
}
