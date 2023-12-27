import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HrRoutingModule } from './hr-routing.module';
import { AddressDetailsWizardComponent } from './address-details-wizard/address-details-wizard.component';
import { SharedModuleModule } from 'src/app/Shared/shared-module/shared-module.module';
import { FormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { StaffdashboardComponent } from './staffdashboard/staffdashboard.component';
import { LicenceDetailsComponent } from './licence-details/licence-details.component';
import { InactivestaffDetailsComponent } from './inactivestaff-details/inactivestaff-details.component';
import { PayrollTrigggerComponent } from './Payroll/payroll-triggger/payroll-triggger.component';
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

@NgModule({
  declarations: [
    AddressDetailsWizardComponent,
    StaffdashboardComponent,
    LicenceDetailsComponent,
    InactivestaffDetailsComponent,
    PayrollTrigggerComponent,
    GeneratePreliminaryReportComponent,
    GenerateCsvfilesComponent,
    LeaveConfigurationdashComponent,
    LeaveConfigurationComponent,
    LoanConfigurationDashComponent,
    LoanConfigurationMasterComponent,
    StaffBulkUploadExceptionsComponent,
    LoadattedanceComponent,
    LeaveUploadComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HrRoutingModule,
    Ng2SearchPipeModule,
    SharedModuleModule,
    NgMultiSelectDropDownModule,
    NgxPaginationModule
  ]
})
export class HrModule { }
