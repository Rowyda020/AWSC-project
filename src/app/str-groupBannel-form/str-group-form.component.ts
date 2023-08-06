import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-str-group-form',
  templateUrl: './str-group-form.component.html',
  styleUrls: ['./str-group-form.component.css']
})
export class StrGroupFormComponent implements OnInit {
  groupDetailsForm !: FormGroup;
  groupMasterForm !: FormGroup;
  actionBtn: string = "Save";
  actionBtnDetails: string = "Save";
  restGroupInfoDone = false;
  dataSource!: MatTableDataSource<any>;
  matchedIds: any;
  getDetailedRowData: any;
  sumOfTotals = 0;
  getHeaderRowId: any;
  storeList: any;
  storeName: any;

  displayedColumns: string[] = ['ItemId', 'Price', 'Qty', 'Total', 'action'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private formBuilder: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    @Inject(MAT_DIALOG_DATA) public editDataDetails: any,
    private http: HttpClient) { }

  ngOnInit(): void {
    this.getStore();
    console.log("next btn: ", this.editDataDetails, "edit data: ", this.editData);

    this.getHeaderRowId = this.editData;
    // console.log("ID header from row: ", this.getHeaderRowId)
    this.groupMasterForm = this.formBuilder.group({
      No: ['', Validators.required],
      StoreId: ['', Validators.required],
      Store: ['', Validators.required],
      Date: ['', Validators.required],

    });

    this.groupDetailsForm = this.formBuilder.group({
      HeaderId: ['', Validators.required],
      Qty: ['', Validators.required],
      Price: ['', Validators.required],
      Total: ['', Validators.required],
      ItemId: ['', Validators.required],
    });



    if (this.editData) {
      // console.log("edit header data", this.editData);
      this.actionBtn = "Update";
      this.groupMasterForm.controls['No'].setValue(this.editData.No);
      this.groupMasterForm.controls['StoreId'].setValue(this.editData.StoreId);
      this.groupMasterForm.controls['Date'].setValue(this.editData.Date);
    }

    this.getAllGroups();
  }

  async testInputsValidating() {
    this.storeName = await this.getStoreByID(this.groupMasterForm.getRawValue().StoreId);
    alert(this.groupMasterForm.getRawValue().StoreId)
    alert("dataName: " + this.storeName)

    this.groupMasterForm.controls['Store'].setValue(this.storeName);
    console.log("dataName: ", this.groupMasterForm.value)

    if (this.groupMasterForm.getRawValue().Store && this.groupMasterForm.getRawValue().Date && this.groupMasterForm.getRawValue().StoreId && this.groupMasterForm.getRawValue().No) {
      // console.log("test id input not empty");
      this.restGroupInfoDone = true;

      console.log("form : ", this.groupMasterForm.value)
      this.api.postStrOpen(this.groupMasterForm.value)
        .subscribe({
          next: (res) => {
            // console.log("ID header after post req: ", res);
            this.getHeaderRowId = res;
            alert("تمت إضافة المجموعة بنجاح");
            this.getAllGroups();

          },
          error: (err) => {
            // console.log("header post err: ", err);
            alert("حدث خطأ أثناء إضافة مجموعة")
          }
        })
    }
    else if(this.groupMasterForm.getRawValue().Store){
      this.getStoreByID(this.groupMasterForm.getRawValue().StoreId);
    }
    else {
      // console.log("inputs are empty")
      alert("تاكد من ادخال البيانات صحيحة")
    }
  }

  getAllGroups() {

    if (this.getHeaderRowId) {
      this.http.get<any>("http://localhost:3000/StrOpenDetails/")
        .subscribe(res => {
          // console.log("res: ", res);

          this.matchedIds = res.filter((a: any) => {
            // console.log("matched Id & HeaderId : ", a.HeaderId === this.getHeaderRowId.id)

            return a.HeaderId === this.getHeaderRowId.id
          })

          if (this.matchedIds) {
            // console.log("response of get all getGroup from api: ", this.matchedIds);
            this.dataSource = new MatTableDataSource(this.matchedIds);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;

            this.sumOfTotals = 0;
            for (let i = 0; i < this.matchedIds.length; i++) {
              this.sumOfTotals = this.sumOfTotals + parseFloat(this.matchedIds[i].Total);
              // console.log("sum of totals: ", this.matchedIds[i].Total)
            }
            // alert("sum of totals: " + this.sumOfTotals);

          }
        }, err => {
          alert("Something went wrong")
        })
    }


  }
  addGroup() {
    // console.log("check id for insert: ", this.getDetailedRowData, "edit data form: ", this.editData, "main id: ", this.getHeaderRowId.id);

    if (this.getHeaderRowId.id) {
      if (this.getHeaderRowId.id) {
        // console.log("foooorm  headerId: ", this.getHeaderRowId.id)
        this.groupDetailsForm.controls['HeaderId'].setValue(this.getHeaderRowId.id);
        this.groupDetailsForm.controls['Total'].setValue((parseFloat(this.groupDetailsForm.getRawValue().Price) * parseFloat(this.groupDetailsForm.getRawValue().Qty)));
        // console.log("form validation: ", this.groupDetailsForm)
        // console.log("not select row for ediiiiiit: ", this.getDetailedRowData)
        if (this.groupDetailsForm.valid && !this.getDetailedRowData) {

          this.api.postStrOpenDetails(this.groupDetailsForm.value)
            .subscribe({
              next: (res) => {
                alert("تمت إضافة المجموعة بنجاح");
                this.groupDetailsForm.reset();
                this.getAllGroups();
                // this.dialogRef.close('save');
              },
              error: () => {
                alert("حدث خطأ أثناء إضافة مجموعة")
              }
            })
        } else {
          this.updateGroup();
        }

      }

    }
    else {
      this.updateStrOpenHeader();
    }
  }

  async updateStrOpenHeader() {

    this.storeName = await this.getStoreByID(this.groupMasterForm.getRawValue().StoreId);
    alert(this.groupMasterForm.getRawValue().StoreId)
    alert("dataName in edit: " + this.storeName)

    this.groupMasterForm.controls['Store'].setValue(this.storeName);
    console.log("dataName in edit: ", this.groupMasterForm.value)

    // console.log("fooooooorm  Header edit: ", this.getHeaderRowId.id)
    // console.log("groupMasterForm value : ", this.groupMasterForm.value)
    this.api.putStrOpen(this.groupMasterForm.value, this.getHeaderRowId.id)
      .subscribe({
        next: (res) => {
          alert("تم تحديث الصنف بنجاح");
          // console.log("update res: ", res, "details form values: ", this.groupDetailsForm.value, "details id: ", this.getDetailedRowData);
          if (this.groupDetailsForm.value && this.getDetailedRowData) {
            this.api.putStrOpenDetails(this.groupDetailsForm.value, this.getDetailedRowData.id)
              .subscribe({
                next: (res) => {
                  alert("تم تحديث المجموعة بنجاح");

                  // console.log("update res: ", res);
                  this.groupDetailsForm.reset();
                  this.getAllGroups();
                  this.getDetailedRowData = '';


                  // this.dialogRef.close('update');
                },
                error: (err) => {
                  // console.log("update errrr: ", err)
                  alert("خطأ أثناء تحديث سجل المجموعة !!")
                }
              })
          }

          // this.dialogRef.close('update');
        },
        error: () => {
          alert("خطأ أثناء تحديث سجل الصنف !!")
        }
      })
  }

  updateGroup() {
    // console.log("pass id: ", this.getHeaderRowId.id, "pass No: ", this.groupMasterForm.getRawValue().No, "pass StoreId: ", this.groupMasterForm.getRawValue().StoreId, "pass Date: ", this.groupMasterForm.getRawValue().Date)
    if (this.groupMasterForm.getRawValue().No != '' && this.groupMasterForm.getRawValue().StoreId != '' && this.groupMasterForm.getRawValue().Date != '') {
      // alert("check validation: " + this.groupDetailsForm.getRawValue().Price)
      // console.log("foooorm  headerId edit: ", this.getHeaderRowId.id)
      this.groupDetailsForm.controls['HeaderId'].setValue(this.getHeaderRowId.id);
      this.groupDetailsForm.controls['Total'].setValue(parseFloat(this.groupDetailsForm.getRawValue().Price) * parseFloat(this.groupDetailsForm.getRawValue().Qty));
      // console.log("groupDetailsForm.value : ", this.groupDetailsForm.value, "editDataDetails: ", this.getHeaderRowId.id)

      this.updateStrOpenHeader();
    }
    else {
      alert("تاكد من ادخال البيانات صحيحة")
    }

  }

  editGroup(row: any) {

    // console.log("test pass row: ", row)
    if (this.editDataDetails || row) {
      this.getDetailedRowData = row;
      // console.log("edit all data: ", this.getDetailedRowData)

      // console.log("edit details data", this.editDataDetails);
      this.actionBtnDetails = "Update";
      this.groupDetailsForm.controls['HeaderId'].setValue(this.getDetailedRowData.HeaderId);

      this.groupDetailsForm.controls['Qty'].setValue(this.getDetailedRowData.Qty);
      this.groupDetailsForm.controls['Price'].setValue(this.getDetailedRowData.Price);
      this.groupDetailsForm.controls['Total'].setValue(parseFloat(this.groupDetailsForm.getRawValue().Price) * parseFloat(this.groupDetailsForm.getRawValue().Qty));

      // console.log("totaaaaaaaaaal: ", this.groupDetailsForm.value)
      // console.log("totalllllllll after change: ", this.groupDetailsForm.getRawValue().Total)

      this.groupDetailsForm.controls['ItemId'].setValue(this.getDetailedRowData.ItemId);

    }


  }

  deleteGroup(id: number) {
    this.api.deleteStrOpenDetails(id)
      .subscribe({
        next: (res) => {
          alert("تم حذف المجموعة بنجاح");
          this.getAllGroups()
        },
        error: () => {
          alert("خطأ أثناء حذف المجموعة !!");
        }
      })
  }

  getAllStrOpen() {
    this.api.getStrOpen()
      .subscribe({
        next: (res) => {
          // console.log("response of get all getGroup from api: ", res);
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: () => {
          alert("خطأ أثناء جلب سجلات المجموعة !!");
        }
      })
  }

  getStore() {
    this.api.getStore()
      .subscribe({
        next: (res) => {
          this.storeList = res;
          console.log("store res: ", this.storeList);
        },
        error: (err) => {
          console.log("fetch store data err: ", err);
          alert("خطا اثناء جلب المخازن !");
        }
      })
  }

  getStoreByID(store: any) {
    console.log("row store id: ", store);
    return fetch(`http://localhost:3000/StoreList/?id=${store}`)
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
}
