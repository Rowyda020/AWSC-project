import { Component, Inject, LOCALE_ID, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '../services/api.service';
import { StrGroupFormComponent } from '../str-groupBannel-form/str-group-form.component';
import { HttpClient } from '@angular/common/http';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-str-group-table-header',
  templateUrl: './str-group-table-header.component.html',
  styleUrls: ['./str-group-table-header.component.css']
})
export class StrGroupTableHeaderComponent implements OnInit {
  displayedColumns: string[] = ['no', 'storeName', 'date', 'Action'];
  matchedIds: any;
  storeList: any;
  storeName: any;

  dataSource2!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private api: ApiService, private dialog: MatDialog, private http: HttpClient, @Inject(LOCALE_ID) private locale: string) {

  }

  ngOnInit(): void {
    this.getAllMasterForms();
    this.getStores();
  }

  getAllMasterForms() {
    this.api.getStrOpen()
      .subscribe({
        next: (res) => {
          console.log("response of get all getGroup from api: ", res);
          this.dataSource2 = new MatTableDataSource(res);
          this.dataSource2.paginator = this.paginator;
          this.dataSource2.sort = this.sort;
        },
        error: () => {
          alert("خطأ أثناء جلب سجلات المجموعة !!");
        }
      })


  }

  editMasterForm(row: any) {
    this.dialog.open(StrGroupFormComponent, {
      width: '70%',
      data: row
    }).afterClosed().subscribe(val => {
      if (val === 'update') {
        this.getAllMasterForms();
      }
    })
  }

  deleteBothForms(id: number) {
    var result = confirm("تاكيد الحذف ؟ ");

    if (result) {
      this.api.deleteStrOpen(id)
        .subscribe({
          next: (res) => {
            // alert("تم حذف المجموعة بنجاح");

            this.http.get<any>("https://ims.aswan.gov.eg/api/STR_Opening_Stock/get-all-Opening_Stock_Details")
              .subscribe(res => {
                this.matchedIds = res.filter((a: any) => {
                  // console.log("matched Id & HeaderId : ", a.HeaderId === id)
                  return a.HeaderId === id
                })

                for (let i = 0; i < this.matchedIds.length; i++) {

                  this.deleteFormDetails(this.matchedIds[i].id)
                }

              }, err => {
                alert("خطا اثناء تحديد المجموعة !!")
              })

            this.getAllMasterForms()
          },
          error: () => {
            alert("خطأ أثناء حذف المجموعة !!");
          }
        })
    }

  }

  deleteFormDetails(id: number) {
    this.api.deleteStrOpenDetails(id)
      .subscribe({
        next: (res) => {
          alert("تم حذف الصنف بنجاح");
          this.getAllMasterForms()
        },
        error: (err) => {
          // console.log("delete details err: ", err)
          alert("خطأ أثناء حذف الصنف !!");
        }
      })
  }

  getStores() {
    this.api.getStore()
      .subscribe({
        next: (res) => {
          this.storeList = res;
          // console.log("store res: ", this.storeList);
        },
        error: (err) => {
          // console.log("fetch store data err: ", err);
          alert("خطا اثناء جلب المخازن !");
        }
      })
  }

  getSearchStrOpen(no: any, store: any, date: any) {

    // console.log("no. : ", no, "store : ", store, "date: ", date);
    this.api.getStrOpen()
      .subscribe({
        next: (res) => {

          //enter no.
          if (no != '' && !store && !date) {
            // console.log("enter no. ")
            // console.log("no. : ", no, "store: ", store, "date: ", date)
            this.dataSource2 = res.filter((res: any) => res.no == no!)
            this.dataSource2.paginator = this.paginator;
            this.dataSource2.sort = this.sort;
          }

          //enter store
          else if (!no && store && !date) {
            // console.log("enter store. ")
            // console.log("enter no. & store & date ", "res : ", res, "input no. : ", no, "input store: ", store, "input date: ", date)
            this.dataSource2 = res.filter((res: any) => res.storeId == store)
            this.dataSource2.paginator = this.paginator;
            this.dataSource2.sort = this.sort;
          }

          //enter date
          else if (!no && !store && date) {
            // console.log("enter date. ")
            // console.log("enter no. & store & date ", "res : ", res, "input no. : ", no, "input store: ", store, "input date: ", date)
            this.dataSource2 = res.filter((res: any) => formatDate(res.date, 'M/d/yyyy', this.locale) == date)
            this.dataSource2.paginator = this.paginator;
            this.dataSource2.sort = this.sort;
          }

          //enter no. & store
          else if (no && store && !date) {
            // console.log("enter no & store ")
            // console.log("enter no. & store & date ", "res : ", res, "input no. : ", no, "input store: ", store, "input date: ", date)
            this.dataSource2 = res.filter((res: any) => res.no == no! && res.storeId == store)
            this.dataSource2.paginator = this.paginator;
            this.dataSource2.sort = this.sort;
          }

          //enter no. & date
          else if (no && !store && date) {
            // console.log("enter no & date ")
            // console.log("enter no. & store & date ", "res : ", res, "input no. : ", no, "input store: ", store, "input date: ", date)
            this.dataSource2 = res.filter((res: any) => res.no == no! && formatDate(res.date, 'M/d/yyyy', this.locale) == date)
            this.dataSource2.paginator = this.paginator;
            this.dataSource2.sort = this.sort;
          }

          //enter store & date
          else if (!no && store && date) {
            // console.log("enter store & date ")
            // console.log("enter no. & store & date ", "res : ", res, "input no. : ", no, "input store: ", store, "input date: ", date)
            this.dataSource2 = res.filter((res: any) => res.storeId == store && formatDate(res.date, 'M/d/yyyy', this.locale) == date)
            this.dataSource2.paginator = this.paginator;
            this.dataSource2.sort = this.sort;
          }

          //enter all data
          else if (no != '' && store != '' && date != '') {
            // console.log("enter all data. ")
            // console.log("enter no. & store & date ", "res : ", res, "input no. : ", no, "input store: ", store, "input date: ", date)
            this.dataSource2 = res.filter((res: any) => res.no == no! && res.storeId == store && formatDate(res.date, 'M/d/yyyy', this.locale) == date)
            this.dataSource2.paginator = this.paginator;
            this.dataSource2.sort = this.sort;
          }

          //didn't enter any data
          else {
            // console.log("enter no data ")
            this.dataSource2 = res;
            this.dataSource2.paginator = this.paginator;
            this.dataSource2.sort = this.sort;
          }


        },
        error: (err) => {
          alert("Error")
        }
      })
  }
}
