import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {  BsDatepickerModule  } from 'ngx-bootstrap/datepicker';

import { HrRoutingModule } from './hr-routing.module';
import { AddressDetailsWizardComponent } from './address-details-wizard/address-details-wizard.component';
import { SharedModuleModule } from 'src/app/Shared/shared-module/shared-module.module';
import { FormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { StaffdashboardComponent } from './staffdashboard/staffdashboard.component';
import { LicenceDetailsComponent } from './licence-details/licence-details.component';
import { InactivestaffDetailsComponent } from './inactivestaff-details/inactivestaff-details.component';
import { GeneratePreliminaryReportComponent } from './Payroll/generate-preliminary-report/generate-preliminary-report.component';
import { GenerateCsvfilesComponent } from './Payroll/generate-csvfiles/generate-csvfiles.component';
import { LeaveConfigurationdashComponent } from './Configuration/leave-configurationdash/leave-configurationdash.component';
import { LeaveConfigurationComponent } from './Configuration/leave-configuration/leave-configuration.component';
import { LoanConfigurationDashComponent } from './Configuration/loan-configuration-dash/loan-configuration-dash.component';
import { LoanConfigurationMasterComponent } from './Configuration/loan-configuration-master/loan-configuration-master.component';
import { StaffBulkUploadExceptionsComponent } from './Configuration/staff-bulk-upload-exceptions/staff-bulk-upload-exceptions.component';
import { LoadattedanceComponent } from './Configuration/loadattedance/loadattedance.component';
import { LeaveUploadComponent } from './Configuration/leave-upload/leave-upload.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { PayrollTriggerDashComponent } from './Payroll/payroll-trigger-dash/payroll-trigger-dash.component';
import { LeaveTypeDashboardComponent } from './Master/leave-type-dashboard/leave-type-dashboard.component';
import { LeaveTypeFormComponent } from './Master/leave-type-form/leave-type-form.component';
import { LoanMasterDashComponent } from './Master/loan-master-dash/loan-master-dash.component';
import { LoanMasterComponent } from './Master/loan-master/loan-master.component';
import { ShiftMasterDashComponent } from './Master/shift-master-dash/shift-master-dash.component';
import { ShiftMasterFormComponent } from './Master/shift-master-form/shift-master-form.component';
import { CountryMasterDashComponent } from './Master/country-master-dash/country-master-dash.component';
import { CountryMasterFormComponent } from './Master/country-master-form/country-master-form.component';
import { StateMasterDashComponent } from './Master/state-master-dash/state-master-dash.component';
import { StateMasterFormComponent } from './Master/state-master-form/state-master-form.component';
import { CityMasterDashComponent } from './Master/city-master-dash/city-master-dash.component';
import { CityMasterFormComponent } from './Master/city-master-form/city-master-form.component';
import { BarangaymasterComponent } from './Master/barangaymaster/barangaymaster.component';
import { AddbarangaymasterComponent } from './Master/addbarangaymaster/addbarangaymaster.component';
import { DepartmentmasterdashComponent } from './Master/departmentmasterdash/departmentmasterdash.component';
import { DepartmentmasteraddComponent } from './Master/departmentmasteradd/departmentmasteradd.component';
import { OtratesdashComponent } from './Master/otratesdash/otratesdash.component';
import { OtratesnewComponent } from './Master/otratesnew/otratesnew.component';
import { DeniminisdashComponent } from './Master/deniminisdash/deniminisdash.component';
import { DeniminisaddComponent } from './Master/deniminisadd/deniminisadd.component';
import { RoleMasterDashComponent } from './Master/role-master-dash/role-master-dash.component';
import { RoleMasterFormComponent } from './Master/role-master-form/role-master-form.component';
import { LevelTypeDashComponent } from './Master/level-type-dash/level-type-dash.component';
import { LevelTypeFormComponent } from './Master/level-type-form/level-type-form.component';
import { GrivelnecemasterdashComponent } from './Master/grivelnecemasterdash/grivelnecemasterdash.component';
import { GrivelnecemasterComponent } from './Master/grivelnecemaster/grivelnecemaster.component';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { HRLeaveRequestDashComponent } from './Requests/hrleave-request-dash/hrleave-request-dash.component';
import { HrdashboardComponent } from './hrdashboard/hrdashboard.component';
import { HrGraphDashComponent } from './hr-graph-dash/hr-graph-dash.component';
import { HranalyticsgraphComponent } from './hranalyticsgraph/hranalyticsgraph.component';

@NgModule({
  declarations: [
    AddressDetailsWizardComponent,
    StaffdashboardComponent,
    LicenceDetailsComponent,
    InactivestaffDetailsComponent,
    GeneratePreliminaryReportComponent,
    GenerateCsvfilesComponent,
    LeaveConfigurationdashComponent,
    LeaveConfigurationComponent,
    LoanConfigurationDashComponent,
    LoanConfigurationMasterComponent,
    StaffBulkUploadExceptionsComponent,
    LoadattedanceComponent,
    LeaveUploadComponent,
    PayrollTriggerDashComponent,
    LeaveTypeDashboardComponent,
    LeaveTypeFormComponent,
    LoanMasterDashComponent,
    LoanMasterComponent,
    ShiftMasterDashComponent,
    ShiftMasterFormComponent,
    CountryMasterDashComponent,
    CountryMasterFormComponent,
    StateMasterDashComponent,
    StateMasterFormComponent,
    CityMasterDashComponent,
    CityMasterFormComponent,
    BarangaymasterComponent,
    AddbarangaymasterComponent,
    DepartmentmasterdashComponent,
    DepartmentmasteraddComponent,
    OtratesdashComponent,
    OtratesnewComponent,
    DeniminisdashComponent,
    DeniminisaddComponent,
    RoleMasterDashComponent,
    RoleMasterFormComponent,
    LevelTypeDashComponent,
    LevelTypeFormComponent,
    GrivelnecemasterdashComponent,
    GrivelnecemasterComponent,
    HRLeaveRequestDashComponent,
    HrdashboardComponent,
    HrGraphDashComponent,
    HranalyticsgraphComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HrRoutingModule,
    Ng2SearchPipeModule,
    SharedModuleModule,
    NgMultiSelectDropDownModule,
    NgxPaginationModule,
    NgbModule,
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot()
  ]
})
export class HrModule { }
