import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressDetailsWizardComponent } from './address-details-wizard/address-details-wizard.component';
import { AuthguardGuard } from '../../Services/authguard.guard';
import { StaffdashboardComponent } from './staffdashboard/staffdashboard.component';
import { LicenceDetailsComponent } from './licence-details/licence-details.component';
import { InactivestaffDetailsComponent } from './inactivestaff-details/inactivestaff-details.component';
import { PayrollTriggerDashComponent } from './Payroll/payroll-trigger-dash/payroll-trigger-dash.component';
import { GeneratePreliminaryReportComponent } from './Payroll/generate-preliminary-report/generate-preliminary-report.component';
import { GenerateCsvfilesComponent } from './Payroll/generate-csvfiles/generate-csvfiles.component';
import { LeaveTypeDashboardComponent } from './Master/leave-type-dashboard/leave-type-dashboard.component';
import { StaffBulkUploadExceptionsComponent } from './Configuration/staff-bulk-upload-exceptions/staff-bulk-upload-exceptions.component';
import { LeaveConfigurationComponent } from './Configuration/leave-configuration/leave-configuration.component';
import { LeaveConfigurationdashComponent } from './Configuration/leave-configurationdash/leave-configurationdash.component';
import { LoanConfigurationDashComponent } from './Configuration/loan-configuration-dash/loan-configuration-dash.component';
import { LoanMasterDashComponent } from './Master/loan-master-dash/loan-master-dash.component';
import { ShiftMasterDashComponent } from './Master/shift-master-dash/shift-master-dash.component';
import { CountryMasterDashComponent } from './Master/country-master-dash/country-master-dash.component';
import { StateMasterDashComponent } from './Master/state-master-dash/state-master-dash.component';
import { CityMasterDashComponent } from './Master/city-master-dash/city-master-dash.component';
import { BarangaymasterComponent } from './Master/barangaymaster/barangaymaster.component';
import { DepartmentmasterdashComponent } from './Master/departmentmasterdash/departmentmasterdash.component';
import { OtratesdashComponent } from './Master/otratesdash/otratesdash.component';
import { RoleMasterDashComponent } from './Master/role-master-dash/role-master-dash.component';

const routes: Routes = [
  { path: 'AddressDetailsWizard', component: AddressDetailsWizardComponent  ,canActivate: [AuthguardGuard]},
  { path: 'AddressDetailsWizard/:id', component: AddressDetailsWizardComponent  ,canActivate: [AuthguardGuard]},
  { path: 'Staffdashboard', component: StaffdashboardComponent  ,canActivate: [AuthguardGuard]},
  { path: 'LicenceDetails', component: LicenceDetailsComponent  ,canActivate: [AuthguardGuard]},
  { path: 'InactiveStaffDetails', component: InactivestaffDetailsComponent  ,canActivate: [AuthguardGuard]},
  { path: 'PayrollTriggerDash', component: PayrollTriggerDashComponent  ,canActivate: [AuthguardGuard]},
  { path: 'GeneratePreliminaryReport', component: GeneratePreliminaryReportComponent  ,canActivate: [AuthguardGuard]},
  { path: 'GenerateCsvfiles', component:   GenerateCsvfilesComponent,canActivate: [AuthguardGuard]},
  { path: 'LeaveTypeDashboard', component:   LeaveTypeDashboardComponent,canActivate: [AuthguardGuard]},
  { path: 'StaffBulkUploadExceptions', component: StaffBulkUploadExceptionsComponent  ,canActivate: [AuthguardGuard]},
  { path: 'LeaveConfigurationDash', component: LeaveConfigurationdashComponent  ,canActivate: [AuthguardGuard]},
  { path: 'LoanConfigurationDash', component: LoanConfigurationDashComponent  ,canActivate: [AuthguardGuard]},
  { path: 'LoanMasterDash', component: LoanMasterDashComponent  ,canActivate: [AuthguardGuard]},
  { path: 'ShiftMasterDash', component: ShiftMasterDashComponent  ,canActivate: [AuthguardGuard]},
  { path: 'CountryMasterDash', component: CountryMasterDashComponent  ,canActivate: [AuthguardGuard]},
  { path: 'StateMasterDash', component: StateMasterDashComponent  ,canActivate: [AuthguardGuard]},
  { path: 'CityMasterDash', component: CityMasterDashComponent  ,canActivate: [AuthguardGuard]},
  { path: 'Barangaymaster', component: BarangaymasterComponent  ,canActivate: [AuthguardGuard]},
  { path: 'Departmentmasterdash', component: DepartmentmasterdashComponent  ,canActivate: [AuthguardGuard]},
  { path: 'Otratesdash', component: OtratesdashComponent  ,canActivate: [AuthguardGuard]},
  { path: 'RoleMasterDash', component: RoleMasterDashComponent  ,canActivate: [AuthguardGuard]},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HrRoutingModule { }
