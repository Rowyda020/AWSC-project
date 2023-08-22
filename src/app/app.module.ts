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
// import { StrGroupNavBarComponent } from './shared/sidebar/str-group-nav-bar.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { CommonModule } from '@angular/common';

import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { STRGradeComponent } from './str-grade/str-grade.component';
import { STRGradeDialogComponent } from './str-grade-dialog/str-grade-dialog.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { StrCostcenterComponent } from '../app/str-costcenter/str-costcenter.component';
import { StrCostcenterDialogComponent } from './str-costcenter-dialog/str-costcenter-dialog.component';
// import { StrItemComponent } from './STR_item/STR_item..component';
// import { StrItemDialogComponent } from './STR_item_dialog/STR_item_dialog.component';
import { MatRadioModule } from '@angular/material/radio';
import { StrGroupComponent } from './str-group/str-group.component';
import { StrGroupDialogComponent } from './str-group-dialog/str-group-dialog.component';
import { StrStoreComponent } from './str-store/str-store.component';
import { StrStoreDialogComponent } from './str-store-dialog/str-store-dialog.component';
import { STRUnitsComponent } from './str-units/str-units.component';
import { STRUnitsDialogComponent } from './str-units-dialog/str-units-dialog.component';
import { STRPlatoonComponent } from './str-platoon/str-platoon.component';
import { STRPlatoonDialogComponent } from './str-platoon-dialog/str-platoon-dialog.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { STRHomeComponent } from './str-home/str-home.component';
import { StrCommodityComponent } from './STR_Commodity/STR_Commodity.component';
import { StrCommodityDialogComponent } from './STR_Commodity_dialog/str-commodity-dialog.component';
import { StrOpeningStockDialogComponent } from './str-opening-stock-dialog/str-opening-stock-dialog.component';
import { StrOpeningStockTableComponent } from './str-opening-stock-table/str-opening-stock-table.component';
import { StrOpeningStockContainerComponent } from './str-opening-stock-container/str-opening-stock-container.component';
import { ToastrModule } from 'ngx-toastr';
import { StrReportComponent } from './str-report/str-report.component';
import { MatStepperModule } from '@angular/material/stepper';
import { STRPlatoon1Component } from './str-platoon1/str-platoon1.component';
import { STRPlatoon1DialogComponent } from './str-platoon1-dialog/str-platoon1-dialog.component';
import { StrEmployeeExchangeContainerComponent } from './str-employee-exchange-container/str-employee-exchange-container.component';
import { StrEmployeeExchangeDialogComponent } from './str-employee-exchange-dialog/str-employee-exchange-dialog.component';
import { StrEmployeeExchangeTableComponent } from './str-employee-exchange-table/str-employee-exchange-table.component';
import { STREmployeeOpeningCustodyComponent } from './str-employee-opening-custody/str-employee-opening-custody.component';
import { STREmployeeOpeningCustodyTableComponent } from './str-employee-opening-custody-table/str-employee-opening-custody-table.component';
import { STREmployeeOpeningCustodyDialogComponent } from './str-employee-opening-custody-dialog/str-employee-opening-custody-dialog.component';
import { STRGroup1Component } from './str-group1/str-group1.component';
import { STRGroup1DialogComponent } from './str-group1-dialog/str-group1-dialog.component';
import { StrWithdrawContainerComponent } from './str-withdraw-container/str-withdraw-container.component';
import { StrWithdrawDialogComponent } from './str-withdraw-dialog2/str-withdraw-dialog2.component';
import { StrWithdrawTableComponent } from './str-withdraw-table2/str-withdraw-table2.component';
import { StrProductComponent } from './str-product/str-product.component';
import { StrProductDialogComponent } from './str-product-dialog/str-product-dialog.component';
import { STRItem1Component } from './str-item1/str-item1.component';
import { STRItem1DialogComponent } from './str-item1-dialog/str-item1-dialog.component';
import { FIAccountComponent } from './fi-account/fi-account.component';
import { FIAccountDialogComponent } from './fi-account-dialog/fi-account-dialog.component';
import { FiEntryContainerComponent } from './fi-entry-container/fi-entry-container.component';
import { FiEntryTableComponent } from './fi-entry-table/fi-entry-table.component';
import { FiEntryDialogComponent } from './fi-entry-dialog/fi-entry-dialog.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { FileUploadDialogComponent } from './file-upload-dialog/file-upload-dialog.component';
import { FIAccountHierarchyComponent } from './fi-account-hierarchy/fi-account-hierarchy.component';
import { FIAccountHierarchyDialogComponent } from './fi-account-hierarchy-dialog/fi-account-hierarchy-dialog.component';

import { StrReportAddItemComponent } from './str-report-add-item/str-report-add-item.component';

import { FiAccountItemComponent } from './fi-account-item/fi-account-item.component';
import { FiAccountItemdDialogComponent } from './fi-account-itemd-dialog/fi-account-itemd-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    StrWithdrawContainerComponent,
    StrWithdrawDialogComponent,
    StrWithdrawTableComponent,
    FileUploadComponent,
    StrCommodityComponent,
    StrCommodityDialogComponent,
    LoginComponent,
    StrGroupHomeComponent,

    STRGradeComponent,
    STRGradeDialogComponent,

    StrCostcenterComponent,
    StrCostcenterDialogComponent,
    // StrItemDialogComponent,
    // StrItemComponent,
    StrGroupComponent,
    StrGroupDialogComponent,
    StrStoreComponent,
    StrStoreDialogComponent,
    STRUnitsComponent,
    STRUnitsDialogComponent,
    STRPlatoonComponent,
    STRPlatoonDialogComponent,
    STRHomeComponent,
    StrOpeningStockDialogComponent,
    StrOpeningStockTableComponent,
    StrOpeningStockContainerComponent,
    StrReportComponent,
    STRPlatoon1Component,
    STRPlatoon1DialogComponent,
    StrEmployeeExchangeContainerComponent,
    StrEmployeeExchangeDialogComponent,
    StrEmployeeExchangeTableComponent,
    STREmployeeOpeningCustodyComponent,
    STREmployeeOpeningCustodyTableComponent,
    STREmployeeOpeningCustodyDialogComponent,
    STRGroup1Component,
    STRGroup1DialogComponent,
    StrProductComponent,
    StrProductDialogComponent,
    STRItem1Component,
    STRItem1DialogComponent,
    FIAccountComponent,
    FIAccountDialogComponent,
    FiEntryContainerComponent,
    FiEntryTableComponent,
    FiEntryDialogComponent,
    FIAccountHierarchyComponent,
    FIAccountHierarchyDialogComponent,

    StrReportAddItemComponent,

    FiAccountItemComponent,
    FiAccountItemdDialogComponent,
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
    MatAutocompleteModule,
    MatStepperModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
