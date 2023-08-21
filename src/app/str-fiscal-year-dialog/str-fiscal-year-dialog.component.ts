import { Component, OnInit, Inject } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validator,
  Validators,
  FormControl,
} from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
@Component({
  selector: 'app-str-fiscal-year-dialog',
  templateUrl: './str-fiscal-year-dialog.component.html',
  styleUrls: ['./str-fiscal-year-dialog.component.css'],
})
export class StrFiscalYearDialogComponent {
  formcontrol = new FormControl('');
  fiscalForm!: FormGroup;
  actionBtn: string = 'حفظ';

  // groupEditId: any;

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private readonly route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<StrFiscalYearDialogComponent>
  ) {}
  ngOnInit(): void {
    this.fiscalForm = this.formBuilder.group({
      transactionUserId: ['', Validators.required],
      fiscalyear: ['', Validators.required],
      id: ['', Validators.required],
    });

    if (this.editData) {
      console.log('edit data: ', this.editData);
      this.actionBtn = 'تعديل';
      this.fiscalForm.controls['transactionUserId'].setValue(
        this.editData.transactionUserId
      );
      this.fiscalForm.controls['fiscalyear'].setValue(this.editData.fiscalyear);
      // this.fiscalForm.controls['id'].setValue(this.editData.id);
      this.fiscalForm.addControl(
        'id',
        new FormControl('', Validators.required)
      );
      this.fiscalForm.controls['id'].setValue(this.editData.id);
    }
  }

  addFiscal() {
    if (!this.editData) {
      this.fiscalForm.removeControl('id');
      if (this.fiscalForm.valid) {
        this.api.postFiscal(this.fiscalForm.value).subscribe({
          next: (res) => {
            alert('تمت الاضافة بنجاح');
            this.fiscalForm.reset();
            this.dialogRef.close('save');
          },
          error: (err) => {
            alert('خطأ عند اضافة البيانات');
            console.log(err);
          },
        });
      }
    } else {
      this.updateFiscal();
    }
  }
  updateFiscal() {
    this.api.putFiscal(this.fiscalForm.value).subscribe({
      next: (res) => {
        alert('تم التحديث بنجاح');
        this.fiscalForm.reset();
        this.dialogRef.close('update');
      },
      error: () => {
        alert('خطأ عند تحديث البيانات');
      },
    });
  }
}
