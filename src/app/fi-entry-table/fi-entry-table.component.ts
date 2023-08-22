import { Component, Inject, LOCALE_ID, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { StrEmployeeExchangeDialogComponent } from '../str-employee-exchange-dialog/str-employee-exchange-dialog.component';
import { formatDate } from '@angular/common';
import { FiEntryDialogComponent } from '../fi-entry-dialog/fi-entry-dialog.component';

@Component({
  selector: 'app-fi-entry-table',
  templateUrl: './fi-entry-table.component.html',
  styleUrls: ['./fi-entry-table.component.css']
})
export class FiEntryTableComponent implements OnInit {
  displayedColumns: string[] = ['no', 'balance', 'creditTotal', 'debitTotal', 'journalName', 'type', 'date', 'Action'];
  matchedIds: any;
  storeList: any;
  storeName: any;
  fiscalYearsList: any;
  employeesList: any;
  costCentersList: any;

  dataSource2!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private api: ApiService,
    private dialog: MatDialog,
    private http: HttpClient,
    @Inject(LOCALE_ID) private locale: string,
    private toastr: ToastrService) {

  }

  ngOnInit(): void {
    this.getAllMasterForms();
    // this.getStores();
    // this.getFiscalYears();
    // this.getEmployees();
    // this.getCostCenters();
  }

  getAllMasterForms() {
    this.api.getFiEntry()
      .subscribe({
        next: (res) => {
          console.log("fiEntry from api: ", res);
          this.dataSource2 = new MatTableDataSource(res);
          this.dataSource2.paginator = this.paginator;
          this.dataSource2.sort = this.sort;
        },
        error: () => {
          alert("خطأ أثناء جلب سجلات المدخلات !!");
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

  editMasterForm(row: any) {
    this.dialog.open(FiEntryDialogComponent, {
      width: '100%',
      data: row
    }).afterClosed().subscribe(val => {
      if (val === 'update') {
        this.getAllMasterForms();
      }
    })
  }

  deleteBothForms(id: number) {

    this.http.get<any>("http://ims.aswan.gov.eg/api/FIEntryDetails/get/all")
      .subscribe(res => {
        this.matchedIds = res.filter((a: any) => {
          console.log("matched Id & entryId : ", a.entryId === id)
          return a.entryId === id
        })
        var result = confirm("هل ترغب بتاكيد حذف التفاصيل و الرئيسي؟");

        if (this.matchedIds.length) {
          for (let i = 0; i < this.matchedIds.length; i++) {

            console.log("matchedIds details in loop: ", this.matchedIds[i].id)

            if (result) {
              this.api.deleteFiEntryDetails(this.matchedIds[i].id)
                .subscribe({
                  next: (res) => {
                    // alert("تم الحذف التفاصيل بنجاح");

                    // var resultMaster = confirm("هل ترغب بتاكيد حذف الرئيسي؟");
                    // if (resultMaster) {
                    console.log("master id to be deleted: ", id)

                    this.api.deleteFiEntry(id)
                      .subscribe({
                        next: (res) => {
                          alert("تم حذف الرئيسي بنجاح");
                          this.toastrDeleteSuccess();
                          this.getAllMasterForms();
                        },
                        error: () => {
                          alert("خطأ أثناء حذف الرئيسي !!");
                        }
                      })
                    // }

                  },
                  error: () => {
                    alert("خطأ أثناء حذف التفاصيل !!");
                  }
                })
            }

          }
        }
        else {
          if (result) {
            console.log("master id to be deleted: ", id)

            this.api.deleteFiEntry(id)
              .subscribe({
                next: (res) => {
                  alert("تم حذف الرئيسي بنجاح");
                  this.toastrDeleteSuccess();
                  this.getAllMasterForms();
                },
                error: () => {
                  alert("خطأ أثناء حذف الرئيسي !!");
                }
              })
          }
        }

      }, err => {
        alert("خطا اثناء تحديد المجموعة !!")
      })

  }

  getFiscalYears() {
    this.api.getFiscalYears()
      .subscribe({
        next: (res) => {
          this.fiscalYearsList = res;
          console.log("fiscalYears res in search: ", this.fiscalYearsList);
        },
        error: (err) => {
          // console.log("fetch fiscalYears data err: ", err);
          // alert("خطا اثناء جلب العناصر !");
        }
      })
  }

  getEmployees() {
    this.api.getHrEmployees()
      .subscribe({
        next: (res) => {
          this.employeesList = res;
          console.log("employees res: ", this.employeesList);
        },
        error: (err) => {
          console.log("fetch employees data err: ", err);
          alert("خطا اثناء جلب الموظفين !");
        }
      })
  }

  getCostCenters() {
    this.api.getFiCostCenter()
      .subscribe({
        next: (res) => {
          this.costCentersList = res;
          console.log("costCenter res: ", this.costCentersList);
        },
        error: (err) => {
          console.log("fetch costCenter data err: ", err);
          alert("خطا اثناء جلب مراكز التكلفة !");
        }
      })
  }

  // getSearchStrOpen(no: any, costCenterId: any, employeeId: any, date: any, distEmployee: any) {

  //   console.log("no. : ", no, "costCenterId: ", costCenterId, "employeeId : ", employeeId, "date: ", date, "distEmployee: ", distEmployee);
  //   this.api.getStrEmployeeExchangeSearach(no, costCenterId, employeeId, date, distEmployee)
  //     .subscribe({
  //       next: (res) => {
  //         console.log("search employeeExchange res: ", res);

  //         //enter no.
  //         if (no != '' && !costCenterId && !employeeId && !date && !distEmployee) {
  //           // console.log("enter no. ")
  //           // console.log("no. : ", no, "store: ", store, "date: ", date)
  //           this.dataSource2 = res.filter((res: any) => res.no == no!)
  //           this.dataSource2.paginator = this.paginator;
  //           this.dataSource2.sort = this.sort;
  //         }

  //         //enter costCenterId.
  //         if (!no && costCenterId != '' && !employeeId && !date && !distEmployee) {
  //           // console.log("enter no. ")
  //           // console.log("no. : ", no, "store: ", store, "date: ", date)
  //           this.dataSource2 = res.filter((res: any) => res.costCenterId == costCenterId)
  //           this.dataSource2.paginator = this.paginator;
  //           this.dataSource2.sort = this.sort;
  //         }

  //         //enter employeeId
  //         else if (!no && !costCenterId && employeeId && !date && !distEmployee) {
  //           // console.log("enter store. ")
  //           // console.log("enter no. & store & date ", "res : ", res, "input no. : ", no, "input store: ", store, "input date: ", date)
  //           this.dataSource2 = res.filter((res: any) => res.employeeId == employeeId)
  //           this.dataSource2.paginator = this.paginator;
  //           this.dataSource2.sort = this.sort;
  //         }

  //         //enter date
  //         else if (!no && !costCenterId && !employeeId && date && !distEmployee) {
  //           // console.log("enter date. ")
  //           // console.log("enter no. & store & date ", "res : ", res, "input no. : ", no, "input store: ", store, "input date: ", date)
  //           this.dataSource2 = res.filter((res: any) => formatDate(res.date, 'M/d/yyyy', this.locale) == date)
  //           this.dataSource2.paginator = this.paginator;
  //           this.dataSource2.sort = this.sort;
  //         }

  //         //enter distEmployee
  //         else if (!no && !costCenterId && !employeeId && !date && distEmployee) {
  //           // console.log("enter date. ")
  //           // console.log("enter no. & store & date ", "res : ", res, "input no. : ", no, "input store: ", store, "input date: ", date)
  //           this.dataSource2 = res.filter((res: any) => res.destEmployeeId == distEmployee)
  //           this.dataSource2.paginator = this.paginator;
  //           this.dataSource2.sort = this.sort;
  //         }

  //         //enter no. & costCenter
  //         else if (no && costCenterId && !employeeId && !date && !distEmployee) {
  //           // console.log("enter no & store ")
  //           // console.log("enter no. & store & date ", "res : ", res, "input no. : ", no, "input store: ", store, "input date: ", date)
  //           this.dataSource2 = res.filter((res: any) => res.no == no! && res.costCenterId == costCenterId)
  //           this.dataSource2.paginator = this.paginator;
  //           this.dataSource2.sort = this.sort;
  //         }

  //         //enter no. & employeeId
  //         else if (no && !costCenterId && employeeId && !date && !distEmployee) {
  //           // console.log("enter no & store ")
  //           // console.log("enter no. & store & date ", "res : ", res, "input no. : ", no, "input store: ", store, "input date: ", date)
  //           this.dataSource2 = res.filter((res: any) => res.no == no! && res.employeeId == employeeId)
  //           this.dataSource2.paginator = this.paginator;
  //           this.dataSource2.sort = this.sort;
  //         }

  //         //enter no. & date
  //         else if (no && !costCenterId && !employeeId && date && !distEmployee) {
  //           // console.log("enter no & date ")
  //           // console.log("enter no. & store & date ", "res : ", res, "input no. : ", no, "input store: ", store, "input date: ", date)
  //           this.dataSource2 = res.filter((res: any) => res.no == no! && formatDate(res.date, 'M/d/yyyy', this.locale) == date)
  //           this.dataSource2.paginator = this.paginator;
  //           this.dataSource2.sort = this.sort;
  //         }

  //         //enter no. & disEmployee
  //         else if (no && !costCenterId && !employeeId && !date && distEmployee) {
  //           // console.log("enter no & store ")
  //           // console.log("enter no. & store & date ", "res : ", res, "input no. : ", no, "input store: ", store, "input date: ", date)
  //           this.dataSource2 = res.filter((res: any) => res.no == no! && res.destEmployeeId == distEmployee)
  //           this.dataSource2.paginator = this.paginator;
  //           this.dataSource2.sort = this.sort;
  //         }

  //         //enter costCenter & employee
  //         else if (!no && costCenterId && employeeId && !date && !distEmployee) {
  //           // console.log("enter no & store ")
  //           // console.log("enter no. & store & date ", "res : ", res, "input no. : ", no, "input store: ", store, "input date: ", date)
  //           this.dataSource2 = res.filter((res: any) => res.costCenterId == costCenterId && res.employeeId == employeeId)
  //           this.dataSource2.paginator = this.paginator;
  //           this.dataSource2.sort = this.sort;
  //         }

  //         //enter costCenter & date
  //         else if (!no && costCenterId && !employeeId && date && !distEmployee) {
  //           // console.log("enter no & store ")
  //           // console.log("enter no. & store & date ", "res : ", res, "input no. : ", no, "input store: ", store, "input date: ", date)
  //           this.dataSource2 = res.filter((res: any) => res.costCenterId == costCenterId && formatDate(res.date, 'M/d/yyyy', this.locale) == date)
  //           this.dataSource2.paginator = this.paginator;
  //           this.dataSource2.sort = this.sort;
  //         }

  //         //enter costCenter & distEmployee
  //         else if (!no && costCenterId && !employeeId && !date && distEmployee) {
  //           // console.log("enter no & store ")
  //           // console.log("enter no. & store & date ", "res : ", res, "input no. : ", no, "input store: ", store, "input date: ", date)
  //           this.dataSource2 = res.filter((res: any) => res.costCenterId == costCenterId && res.destEmployeeId == distEmployee)
  //           this.dataSource2.paginator = this.paginator;
  //           this.dataSource2.sort = this.sort;
  //         }

  //         //enter employeeId & date
  //         else if (!no && !costCenterId && employeeId && date && !distEmployee) {
  //           // console.log("enter store & date ")
  //           // console.log("enter no. & store & date ", "res : ", res, "input no. : ", no, "input store: ", store, "input date: ", date)
  //           this.dataSource2 = res.filter((res: any) => res.employeeId == employeeId && formatDate(res.date, 'M/d/yyyy', this.locale) == date)
  //           this.dataSource2.paginator = this.paginator;
  //           this.dataSource2.sort = this.sort;
  //         }

  //         //enter employeeId & distEmployee
  //         else if (!no && !costCenterId && employeeId && !date && distEmployee) {
  //           // console.log("enter store & date ")
  //           // console.log("enter no. & store & date ", "res : ", res, "input no. : ", no, "input store: ", store, "input date: ", date)
  //           this.dataSource2 = res.filter((res: any) => res.employeeId == employeeId && res.destEmployeeId == distEmployee)
  //           this.dataSource2.paginator = this.paginator;
  //           this.dataSource2.sort = this.sort;
  //         }

  //         //enter distEmployee & date
  //         else if (!no && !costCenterId && !employeeId && date && distEmployee) {
  //           // console.log("enter store & date ")
  //           // console.log("enter no. & store & date ", "res : ", res, "input no. : ", no, "input store: ", store, "input date: ", date)
  //           this.dataSource2 = res.filter((res: any) => res.destEmployeeId == distEmployee && formatDate(res.date, 'M/d/yyyy', this.locale) == date)
  //           this.dataSource2.paginator = this.paginator;
  //           this.dataSource2.sort = this.sort;
  //         }

  //         //enter all data
  //         else if (no != '' && costCenterId != '' && employeeId != '' && date != '' && distEmployee != '') {
  //           // console.log("enter all data. ")
  //           // console.log("enter no. & store & date ", "res : ", res, "input no. : ", no, "input store: ", store, "input date: ", date)
  //           this.dataSource2 = res.filter((res: any) => res.no == no! && res.costCenterId == costCenterId && res.employeeId == employeeId && formatDate(res.date, 'M/d/yyyy', this.locale) == date && res.destEmployeeId == distEmployee)
  //           this.dataSource2.paginator = this.paginator;
  //           this.dataSource2.sort = this.sort;
  //         }

  //         //didn't enter any data
  //         else {
  //           // console.log("enter no data ")
  //           this.dataSource2 = res;
  //           this.dataSource2.paginator = this.paginator;
  //           this.dataSource2.sort = this.sort;
  //         }


  //       },
  //       error: (err) => {
  //         alert("Error")
  //       }
  //     })
  // }

  toastrDeleteSuccess(): void {
    this.toastr.success("تم الحذف بنجاح");
  }
}
