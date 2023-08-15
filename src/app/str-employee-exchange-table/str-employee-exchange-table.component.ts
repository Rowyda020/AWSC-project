import { Component, Inject, LOCALE_ID, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { StrEmployeeExchangeDialogComponent } from '../str-employee-exchange-dialog/str-employee-exchange-dialog.component';

@Component({
  selector: 'app-str-employee-exchange-table',
  templateUrl: './str-employee-exchange-table.component.html',
  styleUrls: ['./str-employee-exchange-table.component.css']
})
export class StrEmployeeExchangeTableComponent implements OnInit {
  displayedColumns: string[] = ['no', 'fiscalyear','employeeName', 'destEmployeeName', 'costCenterName', 'date', 'Action'];
  matchedIds: any;
  storeList: any;
  storeName: any;
  fiscalYearsList: any;

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
    this.getStores();
    // this.getFiscalYears();
  }

  getAllMasterForms() {
    this.api.getStrEmployeeExchange()
      .subscribe({
        next: (res) => {
          console.log("response of get all EmployeeExchange from api: ", res);
          this.dataSource2 = new MatTableDataSource(res);
          // this.dataSource2.paginator = this.paginator;
          // this.dataSource2.sort = this.sort;
        },
        error: () => {
          alert("خطأ أثناء جلب سجلات المجموعة !!");
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
    this.dialog.open(StrEmployeeExchangeDialogComponent, {
      width: '100%',
      data: row
    }).afterClosed().subscribe(val => {
      if (val === 'update') {
        this.getAllMasterForms();
      }
    })
  }

  deleteBothForms(id: number) {
    console.log("master employee id: ", id)
    var result = confirm("تاكيد الحذف ؟ ");

    if (result) {
      this.api.deleteStrEmployeeExchange(id)
        .subscribe({
          next: (res) => {
            alert("تم حذف المجموعة بنجاح");

            // this.http.get<any>("https://ims.aswan.gov.eg/api/STR_Opening_Stock/get-all-Opening_Stock_Details")
            //   .subscribe(res => {
            //     this.matchedIds = res.filter((a: any) => {
            //       // console.log("matched Id & employee_ExchangeId : ", a.employee_ExchangeId === id)
            //       return a.employee_ExchangeId === id
            //     })

            //     for (let i = 0; i < this.matchedIds.length; i++) {

            //       this.deleteFormDetails(this.matchedIds[i].id)
            //     }

            //   }, err => {
            //     alert("خطا اثناء تحديد المجموعة !!")
            //   })

            this.toastrDeleteSuccess();
            this.getAllMasterForms()
          },
          error: () => {
            alert("خطأ أثناء حذف الموظف !!");
          }
        })
    }

  }

  deleteFormDetails(id: number) {
    // this.groupDetailsForm.addControl('id', new FormControl('', Validators.required));
    // this.groupDetailsForm.controls['id'].setValue(this.editData.id);
    console.log("details id: ", id)

    var result = confirm("هل ترغب بتاكيد الحذف ؟");
    if (result) {
      this.api.deleteStrEmployeeExchangeDetails(id)
        .subscribe({
          next: (res) => {
            // alert("تم الحذف بنجاح");
            this.toastrDeleteSuccess();
          },
          error: () => {
            // alert("خطأ أثناء حذف التفاصيل !!");
          }
        })
    }

  }
  
  toastrDeleteSuccess(): void {
    this.toastr.success("تم الحذف بنجاح");
  }
}
