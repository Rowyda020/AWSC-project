import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { GlobalService } from '../services/global.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-str-product-dialog',
  templateUrl: './str-product-dialog.component.html',
  styleUrls: ['./str-product-dialog.component.css']
})
export class StrProductDialogComponent implements OnInit {
  freshnessList = ["Brand new", "Second Hand", "Refurbished"];
  groupForm !: FormGroup;
  actionBtn: string = "Save";
  groupSelectedSearch: any;
  basketballPlayers: any;
  itemsList: any;
  vendorsList: any;
  modelsList: any;
 itemName: any;
  productIdToEdit: any;
  userIdFromStorage: any;

  constructor(private formBuilder: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<StrProductDialogComponent>,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getItems();
    this.getVendors();
    this.getModels();

    this.groupForm = this.formBuilder.group({
      // code: ['', Validators.required],
      name: ['', Validators.required],
      itemId: ['', Validators.required],
      vendorId: ['', Validators.required],
      modelId: ['', Validators.required],
      // platoonName: [''],
      transactionUserId: [''],
      // createUserName: [''],
      // id: [''],

    });

    console.log("edit data", this.editData);
    if (this.editData) {
      this.actionBtn = "Update";
      // this.groupForm.controls['code'].setValue(this.editData.code);
      this.groupForm.controls['name'].setValue(this.editData.name);
      this.groupForm.controls['itemId'].setValue(this.editData.itemId);
      this.groupForm.controls['vendorId'].setValue(this.editData.vendorId);
      this.groupForm.controls['modelId'].setValue(this.editData.modelId);
      // this.groupForm.controls['platoonId'].setValue(this.editData.platoonId);
      this.userIdFromStorage = localStorage.getItem('transactionUserId');

      this.groupForm.controls['transactionUserId'].setValue(this.userIdFromStorage);
      // this.groupForm.controls['id'].setValue(this.editData.id);
      this.groupForm.addControl('id', new FormControl('', Validators.required));
      this.groupForm.controls['id'].setValue(this.editData.id);

    }

  }


  async addProduct() {
    console.log("form entered values", this.groupForm.value);
    if (!this.editData) {
      this.groupForm.removeControl('id')

      // if (this.groupForm.getRawValue().platoonId) {
        // this.itemName = await this.getItemByID(this.groupForm.getRawValue().platoonId);
        // this.groupForm.controls['platoonName'].setValue(this.platoonName);
        this.userIdFromStorage = localStorage.getItem('transactionUserId');
        this.groupForm.controls['transactionUserId'].setValue(this.userIdFromStorage);
        // this.groupForm.controls['createUserName'].setValue("211 static name");

        // alert(this.groupForm.getRawValue().platoonName)
        console.log("form add product value: ", this.groupForm.value)

        if (this.groupForm.valid) {

          this.api.postStrProduct(this.groupForm.value)
            .subscribe({
              next: (res) => {
                console.log("add product res: ", res);
                this.productIdToEdit = res.id;

                this.toastrSuccess();
                alert("تمت إضافة المنتج بنجاح");
                this.groupForm.reset();

                this.dialogRef.close('save');
              },
              error: (err) => {
                alert("حدث خطأ أثناء إضافة منتج");
                console.log("post product with api err: ", err)
              }
            })
        }
      // }

    }
    else {
      this.updateProduct()
    }
  }

  updateProduct() {
    console.log("update product last values, id: ", this.groupForm.value)
    this.api.putStrProduct(this.groupForm.value)
      .subscribe({
        next: (res) => {
          alert("تم تحديث المنتج بنجاح");
          this.toastrSuccess();
          this.groupForm.reset();
          this.dialogRef.close('update');
        },
        error: () => {
          alert("خطأ أثناء تحديث سجل المنتج !!")
        }
      })
  }

  getItems() {
    this.api.getItems()
      .subscribe({
        next: (res) => {
          this.itemsList = res;
          console.log("itemsList res: ", this.itemsList);
        },
        error: (err) => {
          console.log("fetch items data err: ", err);
          alert("خطا اثناء جلب العناصر !");
        }
      })
  }

  getVendors() {
    this.api.getVendors()
      .subscribe({
        next: (res) => {
          this.vendorsList = res;
          console.log("vendorsList res: ", this.vendorsList);
        },
        error: (err) => {
          console.log("fetch vendors data err: ", err);
          alert("خطا اثناء جلب البائعين !");
        }
      })
  }

  getModels() {
    this.api.getModels()
      .subscribe({
        next: (res) => {
          this.modelsList = res;
          console.log("modelsList res: ", this.modelsList);
        },
        error: (err) => {
          console.log("fetch models data err: ", err);
          alert("خطا اثناء جلب النماذج !");
        }
      })
  }

  toastrSuccess(): void {
    this.toastr.success("تم الحفظ بنجاح");
  }

}
