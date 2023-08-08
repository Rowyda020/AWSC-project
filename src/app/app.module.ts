import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LoginComponent } from './pages/login/login.component';
import { StrGroupHomeComponent } from './str-group-home/str-group-home.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatTreeModule } from '@angular/material/tree';
import { MatExpansionModule } from '@angular/material/expansion';
import { StrGroupContainerComponent } from './str-groupBannel-container/str-group-container.component';
// import { StrGroupNavBarComponent } from './shared/sidebar/str-group-nav-bar.component';
import { MatDialogModule } from '@angular/material/dialog';
import { StrGroupFormComponent } from './str-groupBannel-form/str-group-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { CommonModule } from '@angular/common';
import { AddUserComponent } from './pages/add-user/add-user.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { STRGradeComponent } from './str-grade/str-grade.component'
import { STRGradeDialogComponent } from './str-grade-dialog/str-grade-dialog.component'
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { RoleComponent } from './pages/role/role.component';
import { StrRoleDialogComponent } from './pages/str-role-dialog/str-role-dialog.component';
import { StrGroupTableHeaderComponent } from './str-groupBannel-table-header/str-group-table-header.component';
import { StrCostcenterComponent } from '../app/str-costcenter/str-costcenter.component';
import { StrCostcenterDialogComponent } from './str-costcenter-dialog/str-costcenter-dialog.component';
import { StrItemComponent } from './STR_item/STR_item..component';
import { StrItemDialogComponent } from './STR_item_dialog/STR_item_dialog.component';
import { MatRadioModule } from '@angular/material/radio';
import { StrGroupComponent } from './str-group/str-group.component';
import { StrGroupDialogComponent } from './str-group-dialog/str-group-dialog.component';
import { StrStoreComponent } from './str-store/str-store.component';
import { StrStoreDialogComponent } from './str-store-dialog/str-store-dialog.component';
import { AutoComponent } from './auto/auto.component';
import { AutoDialogComponent } from './auto-dialog/auto-dialog.component';
import { STRUnitsComponent } from './str-units/str-units.component';
import { STRUnitsDialogComponent } from './str-units-dialog/str-units-dialog.component';
import { STRPlatoonComponent } from './str-platoon/str-platoon.component';
import { STRPlatoonDialogComponent } from './str-platoon-dialog/str-platoon-dialog.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { STRHomeComponent } from './str-home/str-home.component';
import { StrCommodityComponent } from './STR_Commodity/STR_Commodity.component';
import { StrCommodityDialogComponent } from './STR_Commodity_dialog/str-commodity-dialog.component';











@NgModule({
  declarations: [
    AppComponent, 
    StrCommodityComponent, 
    StrCommodityDialogComponent,
    LoginComponent,
    StrGroupHomeComponent,
    StrGroupContainerComponent,
    StrGroupFormComponent,
    AddUserComponent,

    STRGradeComponent,
    STRGradeDialogComponent,
    RoleComponent,
    StrRoleDialogComponent,
    StrGroupTableHeaderComponent,
    StrCostcenterComponent,
    StrCostcenterDialogComponent, StrItemDialogComponent,
    StrItemComponent,
    StrGroupComponent,
    StrGroupDialogComponent,
    StrStoreComponent,
    StrStoreDialogComponent,
    STRUnitsComponent,
    STRUnitsDialogComponent,
    STRPlatoonComponent,
    STRPlatoonDialogComponent,
    STRHomeComponent




  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatTreeModule,
    MatExpansionModule,
    MatDialogModule,
    HttpClientModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    CommonModule,
    // NavbarComponent,
    MatMenuModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatCardModule,
    MatAutocompleteModule




  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
