import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StrGroupHomeComponent } from './str-group-home/str-group-home.component';
import { LoginComponent } from './pages/login/login.component';
import { ErrorComponent } from './pages/error/error.component';
import { authGuard } from './shared/auth.guard';
import { STRUnitsComponent } from './str-units/str-units.component';
import { STRGradeComponent } from './str-grade/str-grade.component';

import { StrCostcenterComponent } from './str-costcenter/str-costcenter.component';
import { StrItemComponent } from './STR_item/STR_item..component';
import { StrGroupComponent } from './str-group/str-group.component';
import { StrStoreComponent } from './str-store/str-store.component';
import { STRPlatoonComponent } from './str-platoon/str-platoon.component';
import { STRHomeComponent } from './str-home/str-home.component';
import { StrCommodityComponent } from './STR_Commodity/STR_Commodity.component';
import { STRPlatoon1Component } from './str-platoon1/str-platoon1.component';
import { StrOpeningStockContainerComponent } from './str-opening-stock-container/str-opening-stock-container.component';
import { StrReportComponent } from './str-report/str-report.component';
import { StrEmployeeExchangeContainerComponent } from './str-employee-exchange-container/str-employee-exchange-container.component';
import { STRGroup1Component } from './str-group1/str-group1.component';
import { STRItem1Component } from './str-item1/str-item1.component';

import { STREmployeeOpeningCustodyComponent } from './str-employee-opening-custody/str-employee-opening-custody.component';
import { StrProductComponent } from './str-product/str-product.component';
import { FiEntryContainerComponent } from './fi-entry-container/fi-entry-container.component';

const routes: Routes = [
  //  {path: 'products',
  //  children: [
  //    {
  //      path: ':productID',
  //      component: ProductComponent,
  //    },
  //  ],} ,

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'commodity', component: StrCommodityComponent },
  { path: 'home', component: StrGroupHomeComponent },
  { path: 'groupOpening', component: StrOpeningStockContainerComponent },
  { path: 'employeeOpening', component: StrEmployeeExchangeContainerComponent },
  { path: 'groupBannel', component: StrGroupComponent },
  { path: 'unit', component: STRUnitsComponent },
  { path: 'grade', component: STRGradeComponent },
  { path: 'costCenter', component: StrCostcenterComponent },
  { path: 'items', component: StrItemComponent },
  { path: 'products', component: StrProductComponent },
  { path: 'group', component: StrGroupComponent },
  { path: 'store', component: StrStoreComponent },
  { path: 'str-grade', component: STRGradeComponent },
  { path: 'str-platoon', component: STRPlatoonComponent },
  { path: 'str-platoon1', component: STRPlatoon1Component },
  { path: 'str-home', component: STRHomeComponent },
  { path: 'report', component: StrReportComponent },

//  {path: 'products',
//  children: [
//    {
//      path: ':productID',
//      component: ProductComponent,
//    },
//  ],} ,
  { path: "", redirectTo: "login", pathMatch: "full" },
   {path:'login' , component:LoginComponent},
   {path:'commodity' , component:StrCommodityComponent},
  
  { path: "home", component: StrGroupHomeComponent},
  { path: "groupOpening", component: StrOpeningStockContainerComponent },
  { path: "employeeOpening", component: StrEmployeeExchangeContainerComponent },
  { path: "groupBannel", component: StrGroupComponent },
  { path: "unit", component:STRUnitsComponent},
  { path: "grade", component:STRGradeComponent },

  { path: "costCenter", component:StrCostcenterComponent},
  { path: "items", component:StrItemComponent},
  {path: 'items1', component:STRItem1Component},
  { path: "group", component:StrGroupComponent},
  { path: "group1", component:STRGroup1Component},
  { path: "store", component:StrStoreComponent},
  {path: 'str-grade', component: STRGradeComponent},
  {path: 'str-platoon', component: STRPlatoonComponent},
  {path: 'str-platoon1', component: STRPlatoon1Component},
  {path: 'str-home', component:STRHomeComponent},
  

  { path: 'str-employee', component: STREmployeeOpeningCustodyComponent },

  { path: 'fi-entry', component: FiEntryContainerComponent },

  // {path:'dashboard' , canActivateChild:[CanActivateChildGuard],children:[
  //   {path:''  , component:DashboardComponent  },
  //   {path:'profile'  , component:ProfileComponent},
  //   {path:'edit-profile'  , component:EditProfileComponent},
  // ]},
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
