import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-hr-incentive-allowance-dialog',
  templateUrl: './hr-incentive-allowance-dialog.component.html',
  styleUrls: ['./hr-incentive-allowance-dialog.component.css']
})
export class HrIncentiveAllowanceDialogComponent implements OnInit {

  groupForm !: FormGroup;
  actionBtn: string = "Save";
  groupSelectedSearch: any;
  basketballPlayers: any;
  employeesList: any;
  fiscalYearsList: any;
  platoonName: any;
  IncentiveAllowanceIdToEdit: any;
  userIdFromStorage: any;

  constructor(private formBuilder: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<HrIncentiveAllowanceDialogComponent>,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getHrEmployees();
    this.getFiscalYears();
    
    this.groupForm = this.formBuilder.group({
      no: ['', Validators.required],
      date: ['', Validators.required],
      employeeId: ['', Validators.required],
      fiscalYearId: ['', Validators.required],
      transactionUserId: ['', Validators.required],
      id: [''],

    });

    if (this.editData) {
      this.actionBtn = "Update";
      this.groupForm.controls['no'].setValue(this.editData.no);
      this.groupForm.controls['date'].setValue(this.editData.date);
      this.groupForm.controls['employeeId'].setValue(this.editData.employeeId);
      this.groupForm.controls['fiscalYearId'].setValue(this.editData.fiscalYearId);
      this.userIdFromStorage = localStorage.getItem('transactionUserId');

      this.groupForm.controls['transactionUserId'].setValue(this.userIdFromStorage);

      this.groupForm.addControl('id', new FormControl('', Validators.required));
      this.groupForm.controls['id'].setValue(this.editData.id);

    }
  }


   addIncentiveAllowance() {
    // console.log("form entered values", this.productForm.value);
    if (!this.editData) {
      this.groupForm.removeControl('id')

      // if (this.groupForm.getRawValue().platoonId) {
        // this.platoonName = await this.getPlatoonByID(this.groupForm.getRawValue().platoonId);
        // this.groupForm.controls['platoonName'].setValue(this.platoonName);
        this.userIdFromStorage = localStorage.getItem('transactionUserId');
        this.groupForm.controls['transactionUserId'].setValue(this.userIdFromStorage);
        // this.groupForm.controls['createUserName'].setValue("211 static name");

        // alert(this.groupForm.getRawValue().platoonName)
        // console.log("form add group value: ", this.groupForm.value)

        if (this.groupForm.valid) {

          this.api.postHrIncentiveAllowance(this.groupForm.value)
            .subscribe({
              next: (res) => {
                console.log("add IncentiveAllowance res: ", res);
                this.IncentiveAllowanceIdToEdit = res.id;

                this.toastrSuccess();
                this.groupForm.reset();
                this.dialogRef.close('save');
              },
              error: (err) => {
                alert("حدث خطأ أثناء إضافة الحافز");
                console.log("post IncentiveAllowance with api err: ", err)
              }
            })
        }

    }
    else {
      this.updateIncentiveAllowance()
    }
  }

  updateIncentiveAllowance() {
    console.log("update IncentiveAllowance last values, id: ", this.groupForm.value)
    this.api.putHrIncentiveAllowance(this.groupForm.value)
      .subscribe({
        next: (res) => {
          alert("تم تحديث الحوافز بنجاح");
          this.toastrSuccess();
          this.groupForm.reset();
          this.dialogRef.close('update');
        },
        error: () => {
          alert("خطأ أثناء تحديث سجل الحوافز !!")
        }
      })
  }

  getHrEmployees() {
    this.api.getHrEmployees()
      .subscribe({
        next: (res) => {
          this.employeesList = res;
          console.log("employeesList res: ", this.employeesList);
        },
        error: (err) => {
          console.log("fetch employeesList data err: ", err);
          alert("خطا اثناء جلب الموظفين !");
        }
      })
  }

  getFiscalYears() {
    this.api.getFiscalYears()
      .subscribe({
        next: (res) => {
          this.fiscalYearsList = res;
          console.log("fiscalYearsList res: ", this.fiscalYearsList);
        },
        error: (err) => {
          console.log("fetch fiscalYearsList data err: ", err);
          alert("خطا اثناء جلب السنة المالية !");
        }
      })
  }

  toastrSuccess(): void {
    this.toastr.success("تم الحفظ بنجاح");
  }
}
