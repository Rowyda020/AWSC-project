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

export class Commodity {
  constructor(public id: number, public name: string, public code: string) {}
}

export class Grade {
  constructor(public id: number, public name: string, public code: string,public commodityId: number) {}
}

export class Platoon {
  constructor(public id: number, public name: string, public code: string,public commodityId: number, public gradeId: number) {}
}

export class Group {
  constructor(public id: number, public name: string, public code: string,public commodityId: number, public gradeId: number, public platoonId: number) {}
}

export class Unit {
  constructor(public id: number, public name: string) {}
}

@Component({
  selector: 'app-str-item1-dialog',
  templateUrl: './str-item1-dialog.component.html',
  styleUrls: ['./str-item1-dialog.component.css']
})
export class STRItem1DialogComponent implements OnInit{
  transactionUserId=localStorage.getItem('transactionUserId')
  commodityCtrl: FormControl;
  filteredCommodities: Observable<Commodity[]>;
  commodities: Commodity[] = [];
  gradeCtrl: FormControl;
  filteredGrades: Observable<Grade[]>;
  grades: Grade[] = [];
  platoonCtrl: FormControl;
  filteredPlatoons: Observable<Platoon[]>;
  platoons: Platoon[] = [];
  groupCtrl: FormControl;
  filteredGroups: Observable<Group[]>;
  groups: Group[] = [];
  unitCtrl: FormControl;
  filteredUnits: Observable<Unit[]>;
  units: Unit[] = [];
  selectedCommodity!: Commodity;
  selectedGrade!: Grade;
  selectedPlatoon!: Platoon;
  selectedGroup!: Group;
  selectedUnit!: Unit;
  formcontrol = new FormControl('');  
  itemForm !:FormGroup;
  selectedOption: any;
  getItemData: any;
  fullCode: any;
  actionBtn : string = "حفظ"
  Id:string  | undefined | null;
   commidityDt:any={
  id:0,
}
dataSource!: MatTableDataSource<any>;

@ViewChild(MatPaginator) paginator!: MatPaginator;
@ViewChild(MatSort) sort!: MatSort;
@ViewChild(MatAccordion)
accordion!: MatAccordion;
gradeName: any;
  constructor(private formBuilder : FormBuilder,
     private api : ApiService,
     private readonly route:ActivatedRoute,
     @Inject(MAT_DIALOG_DATA) public editData : any,
     private dialogRef : MatDialogRef<STRItem1DialogComponent>){

      this.commodityCtrl = new FormControl();
    this.filteredCommodities = this.commodityCtrl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterCommodities(value))
    );

    this.gradeCtrl = new FormControl();
    this.filteredGrades = this.gradeCtrl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterGrades(value))
    );

    this.platoonCtrl = new FormControl();
    this.filteredPlatoons = this.platoonCtrl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterPlatoons(value))
    );

    this.groupCtrl = new FormControl();
    this.filteredGroups = this.groupCtrl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterGroups(value))
    );    

    this.unitCtrl = new FormControl();
    this.filteredUnits = this.unitCtrl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterUnits(value))
    );
     }

     
  ngOnInit(): void {
    this.itemForm = this.formBuilder.group({
      transactionUserId : ['',Validators.required],
      fullCode : [''],
      // no:[''],
      name : ['',Validators.required],
      commodityId : ['',Validators.required],
      type : ['',Validators.required],
      isActive : ['',Validators.required],
      commodityName : [''],
      commodityCode : [''],
      gradeId : ['',Validators.required],
      gradeName : [''],
      gradeCode : [''],
      platoonId : ['',Validators.required],
      platoonName : [''],
      platoonCode : [''],
      groupId : ['',Validators.required],
      groupName : [''],
      groupCode : [''],
      unitId : ['',Validators.required],
      unitName : [''],
       id : [''],
    });
    

    this.api.getAllCommoditiesi().subscribe((commodities)=>{
      this.commodities = commodities;
    });

    this.api.getAllGradesi().subscribe((grades)=>{
      this.grades = grades;
    });

    this.api.getAllPlatoonsi().subscribe((platoons)=>{
      this.platoons = platoons;
    });

    this.api.getAllGroupsi().subscribe((groups)=>{
      this.groups = groups;
    });

    this.api.getAllUnitsi().subscribe((units)=>{
      this.units = units;
    });

    this.fullCode= Commodity+"gradeCode"+"platoonCode"+"groupCode"+"no"
    
    if(this.editData){
      this.actionBtn = "تعديل";
      this.getItemData = this.editData;

      console.log("comm code: ", this.editData)
alert("full: "+ this.fullCode);
      this.itemForm.controls['transactionUserId'].setValue(this.editData.transactionUserId);
      this.itemForm.controls['name'].setValue(this.editData.name);
      this.itemForm.controls['fullCode'].setValue(this.editData.fullCode);
      this.itemForm.controls['type'].setValue(this.editData.type);
      this.itemForm.controls['isActive'].setValue(this.editData.isActive);
      // this.itemForm.controls['no'].setValue(this.editData.no);
      this.itemForm.controls['commodityId'].setValue(this.editData.commodityId);
      this.itemForm.controls['commodityName'].setValue(this.editData.commodityName);
      this.itemForm.controls['commodityCode'].setValue(this.editData.commodityCode);
      this.itemForm.controls['gradeId'].setValue(this.editData.gradeId);
      this.itemForm.controls['gradeName'].setValue(this.editData.gradeName);
      this.itemForm.controls['gradeCode'].setValue(this.editData.gradeCode);
      this.itemForm.controls['platoonId'].setValue(this.editData.platoonId);
      this.itemForm.controls['platoonName'].setValue(this.editData.platoonName);
      this.itemForm.controls['platoonCode'].setValue(this.editData.platoonCode);
      this.itemForm.controls['groupId'].setValue(this.editData.groupId);
      this.itemForm.controls['groupName'].setValue(this.editData.groupName);
      this.itemForm.controls['groupCode'].setValue(this.editData.groupCode);
      this.itemForm.controls['unitId'].setValue(this.editData.unitId);
      this.itemForm.controls['unitName'].setValue(this.editData.unitName);
      this.itemForm.addControl('id', new FormControl('', Validators.required));
     this.itemForm.controls['id'].setValue(this.editData.id);
    }
  }


  displayCommodityName(commodity: any): string {
    return commodity && commodity.name ? commodity.name : '';
  }
  
  displayGradeName(grade: any): string {
    return grade && grade.name ? grade.name : '';
  }
  
  displayPlatoonName(platoon: any): string {
    return platoon && platoon.name ? platoon.name : '';
  }

  displayGroupName(group: any): string {
    return group && group.name ? group.name : '';
  }

  displayUnitName(unit: any): string {
    return unit && unit.name ? unit.name : '';
  }
  
  commoditySelected(event: MatAutocompleteSelectedEvent): void {
    const commodity = event.option.value as Commodity;
    this.selectedCommodity = commodity;
    this.itemForm.patchValue({ commodityId: commodity.id });
    this.itemForm.patchValue({ commodityName: commodity.name });
    this.itemForm.patchValue({ commodityCode: commodity.code });
    this.gradeCtrl.setValue('');
  }
  
  gradeSelected(event: MatAutocompleteSelectedEvent): void {
    const grade = event.option.value as Grade;
    this.selectedGrade = grade;
    this.itemForm.patchValue({ gradeId: grade.id });
    this.itemForm.patchValue({ gradeName: grade.name });
    this.itemForm.patchValue({ gradeCode: grade.code });
    this.platoonCtrl.setValue('');
  }
  
  platoonSelected(event: MatAutocompleteSelectedEvent): void {
    const platoon = event.option.value as Platoon;
    this.selectedPlatoon = platoon;
    this.itemForm.patchValue({ platoonId: platoon.id });
    this.itemForm.patchValue({ platoonName: platoon.name });
    this.itemForm.patchValue({ platoonCode: platoon.code });
    this.groupCtrl.setValue('');
  }

  groupSelected(event: MatAutocompleteSelectedEvent): void {
    const group = event.option.value as Group;
    this.selectedGroup = group;
    this.itemForm.patchValue({ groupId: group.id });
    this.itemForm.patchValue({ groupName: group.name });
    this.itemForm.patchValue({ groupCode: group.code });
  }

  unitSelected(event: MatAutocompleteSelectedEvent): void {
    const unit = event.option.value as Unit;
    this.selectedUnit = unit;
    this.itemForm.patchValue({ unitId: unit.id });
    this.itemForm.patchValue({ unitName: unit.name });
    this.commodityCtrl.setValue('');
  }
  
  private _filterCommodities(value: string): Commodity[] {
    const filterValue = value.toLowerCase();
    return this.commodities.filter(commodity =>
      commodity.name.toLowerCase().includes(filterValue) || commodity.code.toLowerCase().includes(filterValue)
    );
  }
  
  private _filterGrades(value: string): Grade[] {
    const filterValue = value.toLowerCase();
    return this.grades.filter(
      grade =>
        (grade.name.toLowerCase().includes(filterValue) || grade.code.toLowerCase().includes(filterValue)) &&
        grade.commodityId === this.selectedCommodity?.id
    );
  }
  
  private _filterPlatoons(value: string): Platoon[] {
    const filterValue = value.toLowerCase();
    return this.platoons.filter(
      platoon =>
        (platoon.name.toLowerCase().includes(filterValue) || platoon.code.toLowerCase().includes(filterValue)) &&
        platoon.gradeId === this.selectedGrade?.id
    );
  }

  private _filterGroups(value: string): Group[] {
    const filterValue = value.toLowerCase();
    return this.groups.filter(
      group =>
        (group.name.toLowerCase().includes(filterValue) || group.code.toLowerCase().includes(filterValue)) &&
        group.platoonId === this.selectedPlatoon?.id
    );
  }

  private _filterUnits(value: string): Unit[] {
    const filterValue = value.toLowerCase();
    return this.units.filter(unit =>
      unit.name.toLowerCase().includes(filterValue)
    );
  }
  

  addItem(){
    if(!this.editData){
      
      this.itemForm.removeControl('id')
      // this.itemForm.controls['commodityId'].setValue(this.selectedOption.id);
      // this.itemForm.controls['gradeId'].setValue(this.selectedOption.id);
      console.log("add: ", this.itemForm.value);
      this.itemForm.controls['transactionUserId'].setValue(this.transactionUserId);
      if(this.itemForm.valid){
        this.api.postItems(this.itemForm.value)
        .subscribe({
          next:(res)=>{
            alert("تمت الاضافة بنجاح");
            this.itemForm.reset();
            this.dialogRef.close('save');
          },
          error:(err)=>{ 
            alert("خطأ عند حفظ البيانات") 
          }
        })
      }
    }else{
      this.updateItem()
    }
  }
  
  updateItem(){
      this.api.putItem(this.itemForm.value)
      .subscribe({
        next:(res)=>{
          alert("تم التحديث بنجاح");
          this.itemForm.reset();
          this.dialogRef.close('update');
        },
        error:()=>{
          alert("خطأ عند تحديث البيانات");
        }
      })
    }

}

