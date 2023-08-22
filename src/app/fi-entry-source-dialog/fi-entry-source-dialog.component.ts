import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators, FormControl } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import {MatAccordion, MatExpansionModule} from '@angular/material/expansion';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatOptionSelectionChange } from '@angular/material/core';

@Component({
  selector: 'app-fi-entry-source-dialog',
  templateUrl: './fi-entry-source-dialog.component.html',
  styleUrls: ['./fi-entry-source-dialog.component.css']
})
export class FIEntrySourceDialogComponent {

  transactionUserId=localStorage.getItem('transactionUserId')
  formcontrol = new FormControl('');  
  EntrySourceForm !:FormGroup;
  actionBtn : string = "حفظ"
dataSource!: MatTableDataSource<any>;

@ViewChild(MatPaginator) paginator!: MatPaginator;
@ViewChild(MatSort) sort!: MatSort;
@ViewChild(MatAccordion)
accordion!: MatAccordion;
commoditylist:any;
storeList: any;
commodityName: any;
  constructor(private formBuilder : FormBuilder,
    private api : ApiService,
    private readonly route:ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef : MatDialogRef<FIEntrySourceDialogComponent>){ }
    ngOnInit(): void {
      this.EntrySourceForm = this.formBuilder.group({
        //define the components of the form
      transactionUserId : ['',Validators.required],
      name : ['',Validators.required],
      id : ['',Validators.required],
      // matautocompleteFieldName : [''],
      });
  
      if(this.editData){
        this.actionBtn = "تعديل";
      this.EntrySourceForm.controls['transactionUserId'].setValue(this.editData.transactionUserId);
      this.EntrySourceForm.controls['name'].setValue(this.editData.name);;
      this.EntrySourceForm.addControl('id', new FormControl('', Validators.required));
      this.EntrySourceForm.controls['id'].setValue(this.editData.id);
      }
    }

    addEntrySource(){
    if(!this.editData){
      
      this.EntrySourceForm.removeControl('id')
      // this.EntrySourceForm.controls['commodityId'].setValue(this.selectedOption.id);
      console.log("add: ", this.EntrySourceForm.value);
      this.EntrySourceForm.controls['transactionUserId'].setValue(this.transactionUserId);
      if(this.EntrySourceForm.valid){
        this.api.postEntrySource(this.EntrySourceForm.value)
        .subscribe({
          next:(res)=>{
            alert("تمت الاضافة بنجاح");
            this.EntrySourceForm.reset();
            this.dialogRef.close('save');
          },
          error:(err)=>{ 
            alert("خطأ عند اضافة البيانات") 
          }
        })
      }
    }else{
      this.updateAccount()
    }
  }
      updateAccount(){
        this.api.putEntrySource(this.EntrySourceForm.value)
        .subscribe({
          next:(res)=>{
            alert("تم التحديث بنجاح");
            this.EntrySourceForm.reset();
            this.dialogRef.close('update');
          },
          error:()=>{
            alert("خطأ عند تحديث البيانات");
          }
        })
      }
  
  }
  

