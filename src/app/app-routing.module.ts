import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StrGroupHomeComponent } from './str-group-home/str-group-home.component';
import { StrGroupContainerComponent } from './str-groupBannel-container/str-group-container.component';
import { LoginComponent } from './pages/login/login.component';
import { ErrorComponent } from './pages/error/error.component';
import { UsersInfoComponent } from './pages/users-info/users-info.component';
import { RegisterComponent } from './pages/register/register.component';
import { AddUserComponent } from './pages/add-user/add-user.component';
import { authGuard } from './shared/auth.guard';
import {STRUnitsComponent} from './str-units/str-units.component';
import { STRGradeComponent } from './str-grade/str-grade.component';
import { RoleComponent } from './pages/role/role.component';
import { StrCostcenterComponent } from './str-costcenter/str-costcenter.component';
import { StrCategoryComponent } from './str-category/str-category.component';
import { StrGroupComponent } from './str-group/str-group.component';
import { StrStoreComponent } from './str-store/str-store.component';
import { STRPlatoonComponent } from './str-platoon/str-platoon.component';
import { STRHomeComponent } from './str-home/str-home.component';


const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
   {path:'login' , component:LoginComponent},
   {path:'showUsers' , component:UsersInfoComponent},
   {path:'register' , component:RegisterComponent},
   {path:'addUser' , component:AddUserComponent},
  { path: "home", component: StrGroupHomeComponent },
  { path: "groupBannel", component: StrGroupContainerComponent },
  { path: "unit", component:STRUnitsComponent},
  { path: "grade", component:STRGradeComponent },
   { path: "roles", component:RoleComponent},
  { path: "costCenter", component:StrCostcenterComponent},
  { path: "category", component:StrCategoryComponent},
  { path: "group", component:StrGroupComponent},
  { path: "store", component:StrStoreComponent},
  {path: 'str-grade', component: STRGradeComponent},
  {path: 'str-platoon', component: STRPlatoonComponent},
  {path: 'str-home', component:STRHomeComponent},
  




  // {path:'dashboard' , canActivateChild:[CanActivateChildGuard],children:[
  //   {path:''  , component:DashboardComponent  },
  //   {path:'profile'  , component:ProfileComponent},
  //   {path:'edit-profile'  , component:EditProfileComponent},
  // ]},
   {path:'**' , component:ErrorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
