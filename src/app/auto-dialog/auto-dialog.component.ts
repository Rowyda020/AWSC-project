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
import { Observable, from } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
// import { colorentity } from 'src/colorentity';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
export class Country {
  constructor(public name: string, public id: number, public gid: number) {}
}


@Component({
  selector: 'app-auto-dialog',
  templateUrl: './auto-dialog.component.html',
  styleUrls: ['./auto-dialog.component.css']
})
export class AutoDialogComponent {
  // countryCtrl: FormControl;
  // filteredCountry: Observable<any[]>;
  // country_lis: Country[] = [];
  // subGradCtrl: FormControl;
  // filteredSubGrad: Observable<any[]>;
  // subGrad_lis: Country[] = [];
  // formcontrol = new FormControl('');
  // productForm!: FormGroup;
  // actionBtn: string = 'حفظ';
  // constructor(
  //   private formBuilder: FormBuilder,
  //   private api: ApiService,
  //   private readonly route: ActivatedRoute,
  //   @Inject(MAT_DIALOG_DATA) public editData: any,
  //   private dialogRef: MatDialogRef<AutoDialogComponent>
  // ) {
    
  //   this.countryCtrl = new FormControl();
  //   this.filteredCountry = this.countryCtrl.valueChanges.pipe(
  //     startWith(''),
  //     map((country) =>
  //       country ? this.filtercountry(country) : this.country_lis.slice()
  //     )
  //   );
  //     this.subGradCtrl = new FormControl();
  //     this.filteredSubGrad = this.subGradCtrl.valueChanges.pipe(
  //       startWith(''),
  //       map((subGrad) =>
  //         subGrad ? this.filterSubGrad(subGrad) : this.subGrad_lis.slice()
  //       )
  //     );
  // }
  // ngOnInit(): void {
  //   this.productForm = this.formBuilder.group({
  //     platoonId: ['', Validators.required],
  //     platoonName: ['', Validators.required],
  //     grad: ['', Validators.required],
  //     subGrad: ['', Validators.required],
  //   });

  //   this.api.getAllGrad().subscribe((tododata) => {
  //     this.country_lis = tododata;
  //   });

  //   this.api.getAllsubGrad().subscribe((tododata) => {
  //     this.subGrad_lis = tododata;
  //   });

  //   if (this.editData) {
  //     this.actionBtn = 'تعديل';
  //     this.productForm.controls['platoonId'].setValue(this.editData.platoonId);
  //     this.productForm.controls['platoonName'].setValue(
  //       this.editData.platoonName
  //     );
  //     this.productForm.controls['grad'].setValue(this.editData.grad);
  //     this.productForm.controls['subGrad'].setValue(this.editData.subGrad);
  //   }
  // }

  // optionSelected(event: MatAutocompleteSelectedEvent) {
  //   const selectedOption = event.option.value;
  //   this.productForm.patchValue({ grad: selectedOption });
  // }

  // subOptionSelected(event: MatAutocompleteSelectedEvent) {
  //   const selectedOption = event.option.value;
  //   this.productForm.patchValue({ subGrad: selectedOption });
  // }

  // filtercountry(value: string) {
  //   const searchvalue = value.toLocaleLowerCase();
  //   let arr = this.country_lis.filter(option => option.name.toLocaleLowerCase().includes(searchvalue) || 
  //   option.id);
  //   let subArr = this.subGrad_lis.filter(option => option.name.toLocaleLowerCase().includes(searchvalue) || 
  //   option.id);
  
  //   return arr.concat(subArr).length ? arr.concat(subArr) : [{ name: 'No Item found', gid: 'null' }];
  // }

  // filterSubGrad(value: string) {
  //   const searchvalue = value.toLocaleLowerCase();
  //   let arr = this.subGrad_lis.filter(option => option.name.toLocaleLowerCase().includes(searchvalue) || 
  //   option.gid);
  
  //   return arr.length ? arr : [{ name: 'No Item found', code: 'null' }];
  // }

  // addProduct() {
  //   if (!this.editData) {
  //     if (this.productForm.valid) {
  //       this.api.postProduct(this.productForm.value).subscribe({
  //         next: (res) => {
  //           alert('تمت الاضافة بنجاح');
  //           this.productForm.reset();
  //           this.dialogRef.close('save');
  //         },
  //         error: (err) => {
  //           alert('خطأ عند تحديث البيانات');
  //         },
  //       });
  //     }
  //   } else {
  //     this.updateProduct();
  //   }
  // }
  // updateProduct() {
  //   this.api.putProduct(this.productForm.value, this.editData.id).subscribe({
  //     next: (res) => {
  //       alert('تم التحديث بنجاح');
  //       this.productForm.reset();
  //       this.dialogRef.close('update');
  //     },
  //     error: () => {
  //       alert('خطأ عند تحديث البيانات');
  //     },
  //   });
  // }
}